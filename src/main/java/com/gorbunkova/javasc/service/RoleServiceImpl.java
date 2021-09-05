package com.gorbunkova.javasc.service;


import com.gorbunkova.javasc.dao.RoleRepository;
import com.gorbunkova.javasc.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void createRole(Role role) {
        roleRepository.saveAndFlush(role);
    }

    @Override
    public void updateRole(Role role) {
        roleRepository.saveAndFlush(role);
    }

    @Override
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }

    @Override
    public List<Role> getRolesList() {
        return roleRepository.findAll();
    }

    @Override
    public Role getRoleByName(String s) {
        return roleRepository.getRoleByName(s);
    }

    @Override
    public Set<Role> getByRoles(String role) {
        String[] roles = role.split("_");
        Set<Role> authRole = new HashSet<>();
        for (String roless : roles) {
            if (roless.equals("ADMIN")) {
                authRole.add(getRoleByName("ROLE_ADMIN"));
            } else if (roless.equals("USER")) {
                authRole.add(getRoleByName("ROLE_USER"));
            }
        }
        return authRole;
    }
}
