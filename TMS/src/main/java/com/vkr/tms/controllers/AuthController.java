package com.vkr.tms.controllers;

import com.vkr.tms.payload.JwtResponse;
import com.vkr.tms.payload.LoginRequest;
import com.vkr.tms.repositories.RoleRepository;
import com.vkr.tms.repositories.UserRepository;
import com.vkr.tms.security.CustomAuthProvider;
import com.vkr.tms.security.WebSecurityConfig;
import com.vkr.tms.security.jwt.JwtUtils;
import com.vkr.tms.security.services.UserDetailsImpl;
import org.springframework.context.annotation.Import;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Import(WebSecurityConfig.class)
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    final AuthenticationManager authenticationManager;
    final UserRepository userRepository;
    final RoleRepository roleRepository;
    final JwtUtils jwtUtils;
    final CustomAuthProvider customAuthProvider;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, JwtUtils jwtUtils, CustomAuthProvider customAuthProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtUtils = jwtUtils;
        this.customAuthProvider = customAuthProvider;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        System.out.println(loginRequest.getPassword() + loginRequest.getUsername());
        //Authentication authentication = authenticationManager.authenticate(
          //      new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        Authentication authentication = customAuthProvider.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        System.out.println(userDetails.getDisplayName());
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles,
                userDetails.getDisplayName()));
    }
}
