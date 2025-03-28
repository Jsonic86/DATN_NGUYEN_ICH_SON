package com.example.identity_service.configuration;

import com.example.identity_service.entity.Role;
import com.example.identity_service.entity.User;
import com.example.identity_service.repository.RoleRepository;
import com.example.identity_service.repository.UserRepositoy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Slf4j
@Configuration
public class ApplicationInitConfig {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Bean
    ApplicationRunner initApplication(UserRepositoy userRepository , RoleRepository roleRepository) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                Role role = new Role();
                role.setName("ADMIN");
                role.setDescription("Admin role");
                roleRepository.save(role); // Lưu role trước

                HashSet<Role> roles = new HashSet<>();
                roles.add(role);
                User user = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .roles(roles)
                        .build();
                userRepository.save(user);
                log.warn("admin user has been created with a default password : admin , please change it");
            }
        };
    }
}
