package com.vkr.tms.security;

import com.vkr.tms.model.Role;
import com.vkr.tms.model.Usr;
import com.vkr.tms.repositories.UserRepository;
import com.vkr.tms.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class CustomAuthProvider implements AuthenticationProvider {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String userName = authentication.getName();
        String password = authentication.getCredentials().toString();
        //получаем пользователя
        Usr myUser = userRepository.getUserByUsername(userName);
        //смотрим, найден ли пользователь в базе
        if (myUser == null) {
            throw new BadCredentialsException("Пользователь не найден");
        }
        if (!encoder.matches(password, myUser.getPassword())) {
            throw new BadCredentialsException("Неверный пароль");
        }
        System.out.println("Удачно!");
        UserDetailsImpl principal = UserDetailsImpl.build(myUser);
        return new UsernamePasswordAuthenticationToken(
                principal, password, principal.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
