package com.ssafy.api.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.mapping.ScheduleMapping;
import com.ssafy.api.request.BreakRegisterPostReq;
import com.ssafy.api.request.HolidayRegisterPostReq;
import com.ssafy.api.request.ScheduleGetReq;
import com.ssafy.api.request.ScheduleRegisterPostReq;
import com.ssafy.api.request.ScheduleUpdatePutReq;
import com.ssafy.api.service.CounselorService;
import com.ssafy.api.service.ScheduleService;
import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.Counselor;
import com.ssafy.db.entity.Schedule;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.ScheduleRepository.TimeOnly;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * 스케줄 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "스케줄 API", tags = { "Schedule" })
@RestController
@RequestMapping("/api/v1/schedules")
@CrossOrigin(origins = "*", allowedHeaders = "*")
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
			@ApiResponse(code = 401, message = "시간 포맷 부적절"), @ApiResponse(code = 500, message = "서버 오류") })
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

	@GetMapping("/counselors/{counselorId}")
	@ApiOperation(value = "상담사 스케줄 조회", notes = "<strong>아이디</strong>를 통해 상담사 스케줄을 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "상담사 ID 부적절"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<List<Schedule>> searchSchedulesByCounselorId(
			@PathVariable("counselorId") @ApiParam(value = "스케줄을 조회할 상담사 아이디", required = true) String counselorId) {

		Counselor counselor = counselorService.getCounselorByCounselorId(counselorId);
		if (counselor == null)
			return ResponseEntity.status(400).body(null);

		List<Schedule> list = scheduleService.getSchedulesByCounselor(counselor);
		return ResponseEntity.status(200).body(list);
	}

	
	
	@GetMapping("/counselors/{counselorId}/{starttime}")
	@ApiOperation(value = "상담사 스케줄 상세 조회", notes = "<strong>아이디와 날짜가 포함된 시작 시간</strong>을 통해 상담사의 해당 스케줄을 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "상담사 ID 부적절"),
			@ApiResponse(code = 401, message = "starttime 포맷 부적절"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Schedule> searchSchedulesByCounselorId(
			@PathVariable("counselorId") @ApiParam(value = "스케줄을 조회할 상담사 아이디", required = true) String counselorId,
			@PathVariable("starttime") @ApiParam(value = "날짜가 포함된 시작 시간(예: \"2022-07-27 17:30\")", required = true) String startTime) {

		Counselor counselor = counselorService.getCounselorByCounselorId(counselorId);
		if (counselor == null)
			return ResponseEntity.status(400).body(null);

		Schedule schedule = null;

		try {
			schedule = scheduleService.getSchedulesByCounselorIdAndStartTime(counselor.getId(), startTime);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(401).body(schedule);
		}

		return ResponseEntity.status(200).body(schedule);
	}

	@GetMapping("/users/{userId}")
	@ApiOperation(value = "회원 스케줄 조회", notes = "<strong>아이디</strong>를 통해 회원 스케줄을 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "회원 ID 부적절"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<List<Schedule>> searchSchedulesByUserId(
			@PathVariable("userId") @ApiParam(value = "스케줄을 조회할 회원 아이디", required = true) String userId) {

		User user = userService.getUserByUserId(userId);
		if (user == null)
			return ResponseEntity.status(400).body(null);

		List<Schedule> list = scheduleService.getSchedulesByUser(user);
		return ResponseEntity.status(200).body(list);
	}

	@GetMapping("/users/{userId}/{starttime}")
	@ApiOperation(value = "회원 스케줄 상세 조회", notes = "<strong>아이디와 날짜가 포함된 시작 시간</strong>을 통해 회원의 해당 스케줄을 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "회원 ID 부적절"),
			@ApiResponse(code = 401, message = "starttime 포맷 부적절"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Schedule> searchSchedulesByUserId(
			@PathVariable("userId") @ApiParam(value = "스케줄을 조회할 회원 아이디", required = true) String userId,
			@PathVariable("starttime") @ApiParam(value = "날짜가 포함된 시작 시간(예: \"2022-07-27 17:30\")", required = true) String startTime) {

		User user = userService.getUserByUserId(userId);
		if (user == null)
			return ResponseEntity.status(400).body(null);

		Schedule schedule = null;

		try {
			schedule = scheduleService.getSchedulesByUserIdAndStartTime(user.getId(), startTime);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(401).body(schedule);
		}

		return ResponseEntity.status(200).body(schedule);
	}

	@GetMapping("/counselors/date/{counselorId}/{date}")
	@ApiOperation(value = "상담사 스케줄 날짜별 조회", notes = "<strong>아이디, 연월일</strong>을 통해 상담사 스케줄을 날짜별로 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "상담사 ID 부적절"),
		@ApiResponse(code = 401, message = "date 포맷 부적절"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<List<TimeOnly>> searchSchedulesByCounselorIdAndDate(
			@PathVariable("counselorId") @ApiParam(value = "스케줄을 조회할 상담사 아이디(예: parkcs)", required = true) String counselorId,
			@PathVariable("date") @ApiParam(value = "연도가 포함된 날짜(예: \"2022-08-04\")", required = true) String date ) {

		Counselor counselor = counselorService.getCounselorByCounselorId(counselorId);
		if (counselor == null)
			return ResponseEntity.status(400).body(null);

		List<TimeOnly> list = new ArrayList<TimeOnly>();
		try {
			list = scheduleService.getSchedulesByCounselorIdAndDate(counselor.getId(), date);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(401).body(null);
		}
		
		return ResponseEntity.status(200).body(list);
	}
	
	@PutMapping()
	@ApiOperation(value = "상담사 스케줄 시간 변경", notes = "<strong>상담사ID, 날짜가 포함된 시작 시간과 변경 시간</strong>을 통해 스케줄 정보를 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "상담사 ID 부적절"),
			@ApiResponse(code = 401, message = "날짜 포맷 부적절"), @ApiResponse(code = 402, message = "예약 존재 하지 않음"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Schedule> updateSchedule(
			@RequestBody @ApiParam(value = "수정할 스케줄 정보", required = true) ScheduleUpdatePutReq updateInfo) {

		String counselorId = updateInfo.getCounselorId();
		Counselor counselor = counselorService.getCounselorByCounselorId(counselorId);
		if (counselor == null)
			return ResponseEntity.status(400).body(null);

		String startTime = updateInfo.getBeforeStartTime();
		Schedule schedule = null;
		try {
			schedule = scheduleService.getSchedulesByCounselorIdAndStartTime(counselor.getId(), startTime);
			if (schedule == null)
				return ResponseEntity.status(402).body(null);
			// 스케쥴을 찾은 경우
			schedule = scheduleService.updateSchedule(schedule, updateInfo.getAfterStartTime());
		} catch (ParseException e) {
			e.printStackTrace();
			return ResponseEntity.status(401).body(null);
		}

		return ResponseEntity.status(200).body(schedule);
	}

	@PutMapping("/confirm")
	@ApiOperation(value = "스케줄 확정", notes = "<strong>상담사ID, 날짜가 포함된 시작 시간과 변경 시간</strong>을 통해 <strong>상담사가</strong> 스케줄을 확정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "상담사 ID 부적절"),
			@ApiResponse(code = 401, message = "날짜 포맷 부적절"), @ApiResponse(code = 402, message = "예약 존재 하지 않음"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Schedule> confirmSchedule(
			@RequestBody @ApiParam(value = "확정할 스케줄 정보", required = true) ScheduleGetReq scheduleInfo) {

		String counselorId = scheduleInfo.getCounselorId();
		Counselor counselor = counselorService.getCounselorByCounselorId(counselorId);
		if (counselor == null)
			return ResponseEntity.status(400).body(null);

		String startTime = scheduleInfo.getStartTime();
		Schedule schedule = null;
		try {
			schedule = scheduleService.getSchedulesByCounselorIdAndStartTime(counselor.getId(), startTime);
			if (schedule == null)
				return ResponseEntity.status(402).body(null);
			// 스케쥴을 찾은 경우
			schedule = scheduleService.confirmSchedule(schedule);
		} catch (ParseException e) {
			e.printStackTrace();
			return ResponseEntity.status(401).body(null);
		}

		return ResponseEntity.status(200).body(schedule);
	}
	
	@DeleteMapping("/{counselorId}/{starttime}")
	@ApiOperation(value = "스케줄 삭제(현재는 상담사만 가능)", notes = "<strong>상담사 ID와 스케줄 시작 시간</strong>으로 스케줄을 삭제한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "상담사 ID 부적절"),
			@ApiResponse(code = 401, message = "날짜 포맷 부적절"), @ApiResponse(code = 402, message = "스케줄 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<String> delete(
			@PathVariable("counselorId") @ApiParam(value = "스케줄을 삭제할 상담사 아이디", required = true) String counselorId,
			@PathVariable("starttime") @ApiParam(value = "날짜가 포함된 시작 시간(예: \"2022-07-27 17:30\")", required = true) String startTime) {

		Counselor counselor = counselorService.getCounselorByCounselorId(counselorId);
		if (counselor == null)
			return ResponseEntity.status(400).body(null);

		Schedule schedule = null;
		try {
			schedule = scheduleService.getSchedulesByCounselorIdAndStartTime(counselor.getId(), startTime);
			if (schedule == null)
				return ResponseEntity.status(402).body(null);
			// 스케쥴을 찾은 경우
			scheduleService.deleteSchedule(schedule);
		} catch (ParseException e) {
			e.printStackTrace();
			return ResponseEntity.status(401).body(null);
		}

		return ResponseEntity.status(200).body(null);

	}

}
