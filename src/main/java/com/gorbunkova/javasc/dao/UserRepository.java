package com.gorbunkova.javasc.dao;


import com.gorbunkova.javasc.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository <User, Long> {
    @Query("select user from User user join fetch user.roles where user.login = :login")
    User getUserByName(@Param("login") String login);
}
