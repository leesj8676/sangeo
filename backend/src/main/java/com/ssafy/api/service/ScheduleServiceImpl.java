package com.ssafy.api.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.Counselor;
import com.ssafy.db.entity.Schedule;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.ScheduleRepository;

/**
 *	스케줄 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */

@Service("scheduleService")
public class ScheduleServiceImpl implements ScheduleService{

	@Autowired
	ScheduleRepository scheduleRepository;

	@Override
	public Schedule createSchedule(Counselor counselor, User user, String startTime) throws ParseException {

		Schedule schedule = Schedule.builder()
				.counselor(counselor)
				.user(user)
				.startTime(startTime)
				.build();
		return scheduleRepository.save(schedule);
	}

	@Override
	public void createHoliday(Counselor counselor, User user, String date) throws ParseException{
		Schedule schedule = Schedule.builder()
				.counselor(counselor)
				.user(user)
				.isHoliday(true)
				.startTime(date)
				.build();
		scheduleRepository.save(schedule);
	}

	@Override
	public void createBreak(Counselor counselor, User user, String date) throws ParseException {
		Schedule schedule = Schedule.builder()
				.counselor(counselor)
				.user(user)
				.startTime(date)
				.build();
		scheduleRepository.save(schedule);
	}

	@Override
	public List<Schedule> getSchedulesByCounselor(Counselor counselor) {
		List<Schedule> list = scheduleRepository.findByCounselor_Id(counselor.getId());
		return list;
	}

	@Override
	public List<Schedule> getSchedulesByUser(User user) {
		List<Schedule> list = scheduleRepository.findByUser_Id(user.getId());
		return list;
	}

	@Override
	public Schedule getSchedulesByCounselorIdAndStartTime(Long counselorId, String startTime) throws ParseException {
		// 시간 포맷팅
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.KOREA);
		Date date = formatter.parse(startTime);
		return scheduleRepository.findByCounselor_IdAndStartTime(counselorId, date);
	}

	@Override
	public Schedule getSchedulesByUserIdAndStartTime(Long userId, String startTime) throws ParseException {
		// 시간 포맷팅
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.KOREA);
		Date date = formatter.parse(startTime);
		return scheduleRepository.findByUser_IdAndStartTime(userId, date);
	}

	@Override
	public Schedule updateSchedule(Schedule schedule, String afterStartTime) throws ParseException {
		// 변경하려는 시간 포맷팅
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.KOREA);
		Date startTime = formatter.parse(afterStartTime);
		schedule.setStartTime(startTime);
		schedule.setEndTime(DateUtils.addHours(startTime, 1));
		return scheduleRepository.save(schedule);
	}

	@Override
	public void deleteSchedule(Schedule schedule) {
		scheduleRepository.delete(schedule);
	}
	
}
