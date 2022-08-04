package com.ssafy.api.mapping;

import java.util.Date;

public interface ScheduleMapping {
	String getCounselorId();
	String getUserId();
	Date getStartTime();
	Date getEndTime();
	Boolean getIsComplete();
	Boolean getIsHoliday();
	Boolean getIsConfirmed();
}
