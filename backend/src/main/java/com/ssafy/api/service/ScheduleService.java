package com.ssafy.api.service;

import java.text.ParseException;

import com.ssafy.db.entity.Counselor;
import com.ssafy.db.entity.Schedule;
import com.ssafy.db.entity.User;

public interface ScheduleService {

	Schedule createSchedule(Counselor counselor, User user, String startTime) throws ParseException;
	void createHoliday(Counselor counselor, User user, String date) throws ParseException;
	void createBreak(Counselor counselor, User user, String date) throws ParseException;
}
