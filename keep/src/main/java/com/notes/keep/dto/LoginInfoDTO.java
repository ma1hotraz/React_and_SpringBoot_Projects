package com.notes.keep.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Data
public class LoginInfoDTO {
    private String city;
    private String country;
    private String ipAddress;
    private String zipCode;
    private String region;
    private String timeZone;
    private String org;


}
