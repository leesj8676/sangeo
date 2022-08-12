package com.ssafy.api.mapping;

import java.time.LocalDateTime;

import com.ssafy.db.entity.Counselor;
import com.ssafy.db.entity.User;

public class ScheduleMapping {

	private Long id;
	private Counselor counselor;
	private User user;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	private boolean isConfirmed;
	private boolean isComplete;
	private String formPath;

	public ScheduleMapping(Long id, Counselor counselor, User user, LocalDateTime startTime, LocalDateTime endTime,
			boolean isConfirmed, boolean isComplete, String formPath) {
		super();
		this.id = id;
		this.counselor = counselor;
		this.user = user;
		this.startTime = startTime;
		this.endTime = endTime;
		this.isConfirmed = isConfirmed;
		this.isComplete = isComplete;
		this.formPath = formPath;
	}

	public Long getId() {
		return id;
	}

	public String getCounselorId() {
		return counselor.getCounselorId();
	}

	public String getCounselorName() {
		return counselor.getName();
	}

	public String getUserId() {
		return user.getUserId();
	}

	public String getUserName() {
		return user.getName();
	}

	public LocalDateTime getStartTime() {
		return startTime;
	}

	public LocalDateTime getEndTime() {
		return endTime;
	}

	public boolean isConfirmed() {
		return isConfirmed;
	}

	public boolean isComplete() {
		return isComplete;
	}
	
	public String getFormPath() {
		return formPath;
	}

}
