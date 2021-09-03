package com.gorbunkova.javasc.controller;

import com.gorbunkova.javasc.model.Role;
import com.gorbunkova.javasc.model.User;
import com.gorbunkova.javasc.service.RoleService;
import com.gorbunkova.javasc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;


@Controller

public class UsersController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public UsersController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping(value = "/login")
    public String login() {
        return "login";
    }

    @GetMapping(value = "/user")
    public String getUser(Model model, @AuthenticationPrincipal User user) {
        model.addAttribute("user", user);
        return "user";
    }

    @GetMapping(value = "/admin")
    public String allUsers(@AuthenticationPrincipal User user, Model model) {
        model.addAttribute("users", userService.getUsersList());
        model.addAttribute("roles", roleService.getRolesList());
        model.addAttribute("user", user);
        return "admin";
    }
}

