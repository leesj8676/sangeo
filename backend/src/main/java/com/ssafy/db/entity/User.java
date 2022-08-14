package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
public class User extends BaseEntity implements Serializable{
	@NotNull
	String userId;
	@NotNull
	String name;
	@NotNull
	String phoneNumber;
	@NotNull
	String profile;
	boolean isNaverUser;

	@OneToMany(mappedBy = "user")
	private List<Schedule> scheudles = new ArrayList<>();
	
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;
}
