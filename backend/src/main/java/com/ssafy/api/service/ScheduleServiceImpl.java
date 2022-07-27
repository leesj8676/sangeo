package com.ssafy.api.service;

import java.text.ParseException;

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
	
}
