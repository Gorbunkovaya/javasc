package com.gorbunkova.javasc.service;



import com.gorbunkova.javasc.model.User;

import java.util.List;

public interface UserService {
    void createUser(User user);

    void updateUser(User user);

    void deleteUser(Long id);

    List<User> getUsersList();

    User getUserById(Long id);

    User getUserByName(String s);
}
