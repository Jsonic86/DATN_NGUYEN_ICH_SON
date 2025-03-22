package com.example.identity_service.service;

import com.example.identity_service.dto.request.AuthenticationRequest;
import com.example.identity_service.dto.request.IntrospectRequest;
import com.example.identity_service.dto.request.LogoutRequest;
import com.example.identity_service.dto.request.RefreshRequest;
import com.example.identity_service.dto.response.AuthenticationResponse;
import com.example.identity_service.dto.response.IntrospectResponse;
import com.example.identity_service.entity.InvalidatedToken;
import com.example.identity_service.entity.User;
import com.example.identity_service.exception.AppException;
import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.repository.InvalidatedTokenRepository;
import com.example.identity_service.repository.UserRepositoy;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    @Autowired
    UserRepositoy userRepositoy;

    @Autowired
    InvalidatedTokenRepository tokenRepository;
    @NonFinal
    protected  static  final String SIGNER_KEY = "ZXnsEaEdMNDRf99dZgtVlunYXdccWrmYY092McArj6I2ul0mcuGyk5coOapzwSO1\n";

    @NonFinal
    @Value("${spring.jwt.valid-duration}")
    protected long VALID_DURATION;
    @NonFinal
    @Value("${spring.jwt.refreshable-duration}")
    protected long REFRESHABLE_DURATION;
    public IntrospectResponse introspectResponse(IntrospectRequest introspectRequest) throws JOSEException, ParseException {
        var token = introspectRequest.getToken();
        boolean isValid=false;
        try{
            verifyToken(token,false);
        }
        catch (Exception e){
            isValid=false;
            return IntrospectResponse.builder().introspectValid(false).build();
        }
        isValid=true;
        return IntrospectResponse.builder().introspectValid(true).build();
    }

    public AuthenticationResponse authenticate(@NonNull AuthenticationRequest request) {
        var user = userRepositoy.findByUsername(request.getUsername()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean authenticated= passwordEncoder.matches(request.getPassword(), user.getPassword());
        if(!authenticated) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        }

        var token = generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }
    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try{
            var signToken = verifyToken(request.getToken(),true);
            String jit = signToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();
            InvalidatedToken invalidatedToken= InvalidatedToken.builder()
                    .id(jit)
                    .expiryTime(expiryTime)
                    .build();
            tokenRepository.save(invalidatedToken);
        } catch (Exception e) {
            log.info("token was expired");
        }

    }
    public AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException {
        var signedJWT = verifyToken(request.getToken(),true);

        var jit = signedJWT.getJWTClaimsSet().getJWTID();
        var expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        InvalidatedToken invalidatedToken= InvalidatedToken.builder()
                .id(jit)
                .expiryTime(expiryTime)
                .build();
        tokenRepository.save(invalidatedToken);
        var username = signedJWT.getJWTClaimsSet().getSubject();
        User user = userRepositoy.findByUsername(username).orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHENTICATED)
        );
        var token = generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }
    private SignedJWT verifyToken(String token,boolean isRefresh) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());
        SignedJWT signedJWT =SignedJWT.parse(token);
        Date expityTime =(isRefresh)
                ? new Date(signedJWT.getJWTClaimsSet().getIssueTime().toInstant().plus(REFRESHABLE_DURATION,ChronoUnit.SECONDS).toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();
        boolean verified = signedJWT.verify(verifier);
        if(!(verified && expityTime.after(new Date()))){
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        if(tokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new  AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        return signedJWT;
    }
    private String generateToken(User user){
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSet=new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("devteria.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()
                ))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope",buildScope(user))
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("cannot create token");
            throw new RuntimeException(e);
        }
    }
    private String buildScope(User user){
        StringJoiner scopeJoiner = new StringJoiner(" ");
        if(!CollectionUtils.isEmpty(user.getRoles())){
            user.getRoles().forEach(role -> {
                scopeJoiner.add("ROLE_" + role.getName());
                role.getPermissions().forEach(permission -> {
                    scopeJoiner.add(permission.getName());
                });
            });
        }
        return scopeJoiner.toString();
    }
}
