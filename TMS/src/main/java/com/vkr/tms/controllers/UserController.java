package com.vkr.tms.controllers;

import com.vkr.tms.model.ERole;
import com.vkr.tms.model.Usr;
import com.vkr.tms.payload.MessageResponse;
import com.vkr.tms.payload.UserBean;
import com.vkr.tms.repositories.RoleMemberRepository;
import com.vkr.tms.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("api/users")
@CrossOrigin
public class UserController {
    private final UserRepository userRepository;
    private final RoleMemberRepository roleMemberRepository;
    private final PasswordEncoder encoder;

    public UserController(UserRepository userRepository, RoleMemberRepository roleMemberRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.roleMemberRepository = roleMemberRepository;
        this.encoder = encoder;
    }

    @GetMapping(value="/all")
    public ResponseEntity<List<Usr>> getAllUsers(){
        List<Usr> users = userRepository.findAll();
        if (users == null) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(users, HttpStatus.OK);
        }
    }

    @PostMapping(value = "/save", consumes = "application/json", produces = "application/json")
    public ResponseEntity<MessageResponse> saveUser(@RequestBody UserBean usrBean, @RequestParam boolean isSendEmail){
        if (userRepository.existsByUsername(usrBean.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }
        if (userRepository.existsByEmail(usrBean.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }
        // Create new user's account
        Usr user = new Usr();
        user.setUsername(usrBean.getUsername());
        user.setEmail(usrBean.getEmail());
        user.setDisplayName(usrBean.getDisplayName());
        user.setPassword(encoder.encode(usrBean.getPassword()));
        String strRole = usrBean.getRole();
        Set<ERole> roles = new HashSet<>();
        switch (strRole) {
            case "sys":
                roles.add(ERole.ADMIN);
                roles.add(ERole.USER);
                break;
            case "usr":
                roles.add(ERole.USER);
                break;
        }
        user.setRoles(roles);
        userRepository.save(user);

        if (isSendEmail) {
            String to = user.getEmail();         // sender email
            String from = "sender@abc.com";       // receiver email
            String host = "smtp.mail.ru";

            Properties properties = System.getProperties();
            properties.setProperty("mail.smtp.host", host);
            properties.setProperty("mail.smtp.port", "465");

            Session session = Session.getDefaultInstance(properties); // default session

            try {
                MimeMessage message = new MimeMessage(session); // email message

                message.setFrom(new InternetAddress(from)); // setting header fields

                message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

                message.setSubject("Вы добавлены в систему TMS!"); // subject line

                // actual mail body
                message.setText("Здравствуйте, уважаемый/ая " + user.getDisplayName() +
                        "!\nСистемный администратор добавил вас в систему Task Management System.\n" +
                        "Данные для входа: \n" +
                        "Логин: " + user.getUsername() + "\n" +
                        "Пароль: " + usrBean.getPassword());

                // Send message
                Transport.send(message); System.out.println("Email Sent successfully....");
            } catch (MessagingException mex){ mex.printStackTrace(); }
        }

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @GetMapping(value="delete/{id}")
    public ResponseEntity<List<Usr>> deleteUser(@PathVariable(name="id") int id){
        Optional<Usr> userToRemoveOptional = userRepository.findById(id);
        if (!userToRemoveOptional.isPresent())
        {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        Usr userToRemove = userToRemoveOptional.get();

        roleMemberRepository.deleteAll(roleMemberRepository.findByUser(userToRemove));
        userRepository.delete(userToRemove);

        List<Usr> users = userRepository.findAll();
        if (users == null) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(users, HttpStatus.OK);
        }
    }

    @PostMapping(value="changePassword/{id}")
    public ResponseEntity<Usr> changeUser(@PathVariable(name="id") int id, @RequestBody String password){
        Usr user = userRepository.findById(id).get();
        user.setPassword(encoder.encode(password));
        Usr savedUser = userRepository.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }
}
