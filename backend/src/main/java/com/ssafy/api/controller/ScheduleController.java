package com.ssafy.api.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Objects;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.api.request.BreakRegisterPostReq;
import com.ssafy.api.request.HolidayRegisterPostReq;
import com.ssafy.api.request.ScheduleRegisterPostReq;
import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.CounselorService;
import com.ssafy.api.service.ScheduleService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.Counselor;
import com.ssafy.db.entity.Schedule;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepositorySupport;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 스케줄 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "스케줄 API", tags = { "Schedule" })
@RestController
@RequestMapping("/api/v1/schedules")
public class ScheduleController {

	@Autowired
	UserService userService; // 나중에 mappedBy로 스케줄 조회만 가능한거 만들기
	@Autowired
	CounselorService counselorService; // 나중에 mappedBy로 스케줄 조회만 가능한거 만들기
	@Autowired
	ScheduleService scheduleService;

	@PostMapping()
	@ApiOperation(value = "스케줄 생성", notes = "<strong>상담사ID와 고객ID, 날짜가 포함된 시작 시간</strong>을 통해 스케줄을 생성한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "상담사 ID 부적절"),
		@ApiResponse(code = 402, message = "고객 ID 부적절"), @ApiResponse(code = 402, message = "시간 포맷 부적절"),
		@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Schedule> registerSchedule(
			@RequestBody @ApiParam(value = "스케줄 생성 정보", required = true) ScheduleRegisterPostReq scheduleInfo) {

		// 카운슬러, 고객 찾아오기
		Counselor counselor = counselorService.getCounselorByCounselorId(scheduleInfo.getCounselorId());
		User user = userService.getUserByUserId(scheduleInfo.getUserId());

		if (counselor == null)
			return ResponseEntity.status(400).body(null);

		if (user == null)
			return ResponseEntity.status(401).body(null);

		
		String startTime = scheduleInfo.getStartTime();
		try {
			Schedule schedule = scheduleService.createSchedule(counselor, user, startTime);
			return ResponseEntity.status(200).body(schedule);
		} catch (ParseException e) {
			e.printStackTrace();
			return ResponseEntity.status(402).body(null);
		}
	}

	@PostMapping("/holiday")
	@ApiOperation(value = "휴일 생성", notes = "<strong>상담사ID와 날짜 배열/strong>을 통해 휴일을 생성한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "상담사 ID 부적절"),
			@ApiResponse(code = 401, message = "시간 포맷 부적절"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Schedule> registerHolidays(
			@RequestBody @ApiParam(value = "스케줄 생성 정보", required = true) HolidayRegisterPostReq holidayInfo) {
		Counselor counselor = counselorService.getCounselorByCounselorId(holidayInfo.getCounselorId());
		if (counselor == null)
			return ResponseEntity.status(400).body(null);

		// JPA에서 Schedule이 User객체를 참조하기 위해, User의 FK가 필요 (설계랑 달라짐)
		// 설계를 고치지 않으려면,, 실제 사용하지 않는 계정을 user를 FK로 가지도록 하기
		// 새로 만들거나, 배포할때는 admin으로 두기
		User user = userService.getUserByUserId("kimssafy");
		
		for (String date : holidayInfo.getDates()) {
			try {
				scheduleService.createHoliday(counselor, user, date);
			} catch (Exception e) {
				e.printStackTrace();
				return ResponseEntity.status(401).body(null);
			}
		}
		return ResponseEntity.status(200).body(null);
	}
	
	@PostMapping("/break")
	@ApiOperation(value = "휴식시간 생성", notes = "<strong>상담사ID는 시간 배열을</strong>을 통해 휴식 시간을 생성한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "상담사 ID 부적절"),
		@ApiResponse(code = 401, message = "시간 포맷 부적절"),			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Schedule> registerBreak(
			@RequestBody @ApiParam(value = "휴식시간 생성 정보", required = true) BreakRegisterPostReq breakInfo) {

		// 카운슬러, 고객 찾아오기
		Counselor counselor = counselorService.getCounselorByCounselorId(breakInfo.getCounselorId());

		User user = userService.getUserByUserId("kimssafy");
		
		for (String date : breakInfo.getDatetimes()) {
			try {
				scheduleService.createBreak(counselor, user, date);
			} catch (Exception e) {
				e.printStackTrace();
				return ResponseEntity.status(401).body(null);
			}
		}
		return ResponseEntity.status(200).body(null);
	}
	
}
