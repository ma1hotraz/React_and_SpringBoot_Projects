package com.notes.keep.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


import java.util.List;

import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
public enum Roles {
    ADMIN(),
    USER();


    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
