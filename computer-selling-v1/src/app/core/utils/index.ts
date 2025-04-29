import { jwtDecode } from "jwt-decode";

export function setCookie(name: string, value: string, exp?: any) {
    try {
        const expires = new Date(exp * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    } catch (e) {
        console.error('Invalid token passed to setCookie', e);
    }
}
export function getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
export function deleteCookie(name: string) {
    setCookie(name, ''); // Set expiration date to a past date
}
