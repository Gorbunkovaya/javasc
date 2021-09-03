package com.gorbunkova.javasc.service;


import com.gorbunkova.javasc.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {
    void createRole(Role role);

    void updateRole(Role role);

    void deleteRole(Long id);

    List<Role> getRolesList();

    Role getRoleByName(String s);

    Set<Role> findByRoleSet(String s);
}
