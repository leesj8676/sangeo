package com.ssafy.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = { "User" })
@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

	@Autowired
	UserService userService;

	@GetMapping("/{userId}")
	@ApiOperation(value = "회원 정보 조회", notes = "<strong>아이디</strong>를 통해 회원 정보를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<User> search(
			@PathVariable("userId") @ApiParam(value = "조회할 회원 아이디", required = true) String userId) {
		User user = userService.getUserByUserId(userId);
		System.out.println(user.toString());
		return ResponseEntity.status(200).body(user);

	}

	@PostMapping()
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디, 패스워드, 이름, 전화번호, 프로필</strong>을 통해 회원가입 한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<User> register(
			@RequestBody @ApiParam(value = "회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
		// 아이디 중복검사
		if (userService.getUserByUserId(registerInfo.getUserId()) == null) {
			System.out.println(registerInfo.getUserId()+" 가입가능한 아이디입니다.");
			// db에 registerInfo 저장
			User user = userService.createUser(registerInfo);
			return ResponseEntity.status(200).body(user);
		} else {
			System.out.println("중복된 아이디입니다.");
			return ResponseEntity.status(401).body(null);
		}
	}

	@PutMapping()
	@ApiOperation(value = "회원 정보 수정", notes = "<strong>패스워드, 이름, 전화번호, 프로필</strong>을 통해 회원 정보를 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<User> update(
			@RequestBody @ApiParam(value = "수정할 회원 정보", required = true) UserRegisterPostReq registerInfo) {
		User user = userService.updateUser(registerInfo);
		return ResponseEntity.status(200).body(user);
	}

	@DeleteMapping("/{userId}")
	@ApiOperation(value = "회원 정보 삭제", notes = "<strong>아이디</strong>를 통해 회원 정보를 삭제한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<String> delete(
			@PathVariable("userId") @ApiParam(value = "삭제할 회원 아이디", required = true) String userId) {
		userService.deleteUser(userId);
		return ResponseEntity.status(200).body("삭제 완료");

	}

	@GetMapping("/me")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		System.out.println(userId+" 본인 인증 성공");
		return ResponseEntity.status(200).body(UserRes.of(user));
	}

}
