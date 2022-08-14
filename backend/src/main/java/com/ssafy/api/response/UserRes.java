package com.ssafy.api.response;

import java.time.LocalDateTime;

import com.ssafy.db.entity.Review;
import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ReviewResponse")
public class UserRes {
	@ApiModelProperty(name="id")
	Long id;
	@ApiModelProperty(name="name")
	String name;
	@ApiModelProperty(name="naverUser")
	boolean naverUser;
	@ApiModelProperty(name="password")
	String password;
	@ApiModelProperty(name="phoneNumber")
	String phoneNumber;
	@ApiModelProperty(name="profile")
	String profile;

	public static UserRes of(User User) {
		UserRes res = new UserRes();
		res.setId(User.getId());
		res.setName(User.getName());
		res.setNaverUser(false); //네이버 유저인거 확인하는거 물어보기
		res.setPassword(User.getPassword());
		res.setPhoneNumber(User.getPhoneNumber());
		res.setProfile(User.getProfile());
		return res;
	}
	
}
