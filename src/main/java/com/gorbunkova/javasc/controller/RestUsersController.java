package com.gorbunkova.javasc.controller;

import com.gorbunkova.javasc.model.Role;
import com.gorbunkova.javasc.model.User;
import com.gorbunkova.javasc.service.RoleService;
import com.gorbunkova.javasc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
//@RequestMapping(value = "/")
public class RestUsersController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public RestUsersController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/admin/authorities")
    public ResponseEntity<?> getAuthorizedUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<User>> getAllUser() {
        return ResponseEntity.ok().body(userService.getUsersList());
    }

    @GetMapping("/admin/getUser/{id}")
    public ResponseEntity<User> show(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/admin/create/{new_Roles}")
    public ResponseEntity<User> create(@RequestBody User user, @PathVariable(required = false, name = "new_Roles") String roleString) {
        Set<Role> setRoleController;
        setRoleController = roleService.findByRoleSet(roleString);
        user.setRoles(setRoleController);
        userService.createUser(user);
        return ResponseEntity.ok().body(user);
    }

    @PutMapping("/admin/update/{new_Roles}")
    public ResponseEntity<?> update(@RequestBody User user, @PathVariable(required = false, name = "new_Roles") String roleString) {
        Set<Role> setRoleController;
        setRoleController = roleService.findByRoleSet(roleString);
        user.setRoles(setRoleController);
        userService.updateUser(user);
        return ResponseEntity.ok().body(user);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}