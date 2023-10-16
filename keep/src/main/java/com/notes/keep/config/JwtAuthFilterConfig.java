package com.notes.keep.config;

import com.notes.keep.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;

@Configuration
@RequiredArgsConstructor
public class JwtAuthFilterConfig {

    private final JwtUtils jwtUtils;
    private final UserDetailsService userDetailsService;
    private final TokenRepository tokenRepository;

    @Bean
    public JwtAuthFilter jwtAuthFilter() {
        return new JwtAuthFilter(jwtUtils, userDetailsService, tokenRepository);
    }
}

