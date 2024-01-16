package com.notes.keep.service.impl;

import com.mysql.cj.exceptions.PasswordExpiredException;
import com.notes.keep.config.jwt.JwtService;
import com.notes.keep.dto.EmailDTO;
import com.notes.keep.dto.LoginInfoDTO;
import com.notes.keep.dto.UserDTO;
import com.notes.keep.model.AuthRequest;
import com.notes.keep.model.AuthResponse;
import com.notes.keep.model.User;
import com.notes.keep.repository.UserRepository;
import com.notes.keep.service.CustomUserService;
import com.notes.keep.utils.EncryptionUtil;
import com.notes.keep.utils.ImageUtils;
import com.notes.keep.utils.Loggers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.security.auth.login.CredentialExpiredException;
import java.text.SimpleDateFormat;
import java.util.UUID;
import java.util.List;
import java.util.Date;
import java.util.Optional;
import java.util.Random;

@Service
public class CustomUserServiceImpl implements CustomUserService {

    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EncryptionUtil encryptionUtil;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager manager;
    @Autowired
    private EmailServiceImpl emailService;


    @Override
    public UserDTO createUser(User user) {
        user.setRoles("USER");
        user.setPassword(encoder.encode(user.getPassword()));
        Date utilDate = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        String formattedDate = dateFormat.format(utilDate);
        try {
            Date date = dateFormat.parse(formattedDate);
            java.sql.Date sqlDate = new java.sql.Date(date.getTime());
            user.setDate(sqlDate);
            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
        var jwtToken = jwtService.generateToken(user);
        AuthResponse token = AuthResponse.builder().token(jwtToken).build();
        sendVerificationMail(user.getEmail());
        return UserDTO.builder().name(user.getFirstName() + " " + user.getLastName()).email(user.getEmail()).image(user.getImage()).response(token).build();
    }

    @Override
    public User findByUserId(UUID userId) {
        return userRepository.findById(userId).get();
    }


    @Override
    public UserDTO loginUser(AuthRequest user) {
        Optional<User> user1 = userRepository.findByEmail(user.getEmail());
        manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        user.getPassword()
                )
        );
        var userTemp = user1.get();
        var jwtToken = jwtService.generateToken(userTemp);
        AuthResponse token = AuthResponse.builder().token(jwtToken).build();
        return UserDTO.builder().name(userTemp.getFirstName() + " " + userTemp.getLastName()).email(userTemp.getEmail()).image(userTemp.getImage()).response(token).build();
    }

    public UserDTO updateUser(User user) {
        Optional<User> temp = userRepository.findByEmail(user.getEmail());
        User userOld = temp.get();
        byte[] upload = null;
        upload = ImageUtils.compressImage(user.getImage());
        userOld.setImage(upload);
        userOld.setFileSize(user.getFile().getSize() / 1024);
        User newUser = userRepository.save(userOld);
        byte[] download = null;
        download = ImageUtils.decompressImage(newUser.getImage());
        return UserDTO.builder().email(newUser.getEmail()).name(newUser.getFirstName() + " " + newUser.getLastName()).image(download).build();
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if(!checkEmail(email)){
            return null;
        }
        return userRepository.findByEmail(email).get();
    }

    @Override
    public void resetPassword(String email) {
        String zeros = "000000";
        Random rnd = new Random();
        String s = Integer.toString(rnd.nextInt(0X1000000), 16);
        s = zeros.substring(s.length()) + s;
        s = s.toUpperCase();
        User user = userRepository.findByEmail(email).get();
        try{
            EmailDTO emailDTO = new EmailDTO();
            emailDTO.setTo(email);
            emailDTO.setSubject("VERIFICATION CODE");
            emailDTO.setMessage("VERIFICATION CODE TO RESET PASSWORD IS : " + s);
            emailService.sendEmail(emailDTO);
            Loggers.info("Email with Verification Code Send Successfully to " + email);
        }catch (Exception e){
            e.printStackTrace();
        }
        user.setResetPasswordToken(s);
        userRepository.save(user);
    }

    @Override
    public void updatePassword(String email, String password,  String token) throws CredentialExpiredException {
        if(!userRepository.existsByEmail(email)){
           throw new UsernameNotFoundException("Email not found");
        }
        User user = userRepository.findByEmail(email).get();
        if(user.getPassword().equals(encoder.encode(password))){
            throw new PasswordExpiredException("Cannot Use Old Password");
        }
        if(user.getResetPasswordToken() == null){
            throw new CredentialExpiredException("Token Expired, Request new Token");
        }
        if(!user.getResetPasswordToken().equals(token)){
            throw new PasswordExpiredException("Invalid Token");
        }
        user.setPassword(encoder.encode(password));
        user.setResetPasswordToken(null);
        userRepository.save(user);
    }

    @Override
    public void sendVerificationMail(String email) {
        try{
            EmailDTO emailDTO = new EmailDTO();
            emailDTO.setTo(email);
            emailDTO.setSubject("Verify Email");
            emailDTO.setMessage("Please follow this link to verify your account.");
            emailService.sendEmail(emailDTO);
            Loggers.info("Verification Mail send to email :" + email);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void sendLoginInfo(String email, LoginInfoDTO infoDTO) {
        System.out.println(email + " " +infoDTO);
        try{
            EmailDTO emailDTO = new EmailDTO();
            emailDTO.setTo(email);
            emailDTO.setSubject("Login Detected");
            emailDTO.setMessage("A login attempted with this info.");
            emailDTO.setMessage(infoDTO.getCity());
            emailDTO.setMessage(infoDTO.getCountry());
            emailDTO.setMessage(infoDTO.getRegion());
            emailDTO.setMessage(infoDTO.getTimeZone());
            emailDTO.setMessage(infoDTO.getIpAddress());
            emailDTO.setMessage(infoDTO.getIpAddress());
            emailDTO.setMessage(infoDTO.getOrg());
//            emailService.sendEmail(emailDTO);
            Loggers.info("Login Info Mail send to email :" + email);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    //METHODS NEEDS TO IMPLEMENT



}
