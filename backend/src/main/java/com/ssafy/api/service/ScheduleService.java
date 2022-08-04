package com.ssafy.api.service;

import java.text.ParseException;
import java.util.List;

import com.ssafy.db.entity.Counselor;
import com.ssafy.db.entity.Schedule;
import com.ssafy.db.entity.User;

public interface ScheduleService {

	Schedule createSchedule(Counselor counselor, User user, String startTime) throws ParseException;
	void createHoliday(Counselor counselor, User user, String date) throws ParseException;
	void createBreak(Counselor counselor, User user, String date) throws ParseException;
	List<Schedule> getSchedulesByCounselor(Counselor counselor);
	List<Schedule> getSchedulesByUser(User user);
	Schedule getSchedulesByCounselorIdAndStartTime(Long counselorId, String startTime) throws ParseException;
	Schedule getSchedulesByUserIdAndStartTime(Long userId, String startTime) throws ParseException;
	Schedule updateSchedule(Schedule schedule, String afterStartTime) throws ParseException;
	void deleteSchedule(Schedule schedule);
}
