package com.ssafy.api.mapping;

import java.time.LocalTime;

public interface CounselorMapping {
	String getCounselorId();
	String getName();
	String getPhoneNumber();
	String getProfile();
	String getShortIntroduction();
	LocalTime getContactStartTime();
	LocalTime getContactEndTime();
	int getCareer();
	String getLongIntroduction();
	LocalTime getReserveStartTime();
	LocalTime getReserveEndTime();
	String getConsultTarget();
	int getPrice();
	int getConsultNumber();
	String getHoliday();
}
