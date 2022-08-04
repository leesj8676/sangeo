package com.ssafy.db.entity;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.util.Assert;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 스케줄 모델 정의.
 */
@Entity
@Getter
@Setter
public class Schedule extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "COUNSELOR_ID")
	private Counselor counselor;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_ID")
	private User user;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false)
	private Date startTime;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false)
	private Date endTime;

	private boolean isComplete = false;
	private boolean isHoliday = false;
	private boolean isConfirmed = false;

	public Schedule() {
		super();
	}

	@Builder
	public Schedule(Counselor counselor, User user, String startTime, boolean isComplete, boolean isHoliday)
			throws ParseException {

		// Not null을 체크
		// 날짜는 String으로 받기
		Assert.hasText(startTime, "startTime must not be empty");

		this.counselor = counselor;
		this.user = user;
		this.isComplete = isComplete;
		this.isHoliday = isHoliday;

		// 휴일인 경우
		if (isHoliday == true) {
			SimpleDateFormat dateformatter = new SimpleDateFormat("yyyy-MM-dd", Locale.KOREA);
			Date date = dateformatter.parse(startTime);
			this.startTime = date;
			this.endTime = DateUtils.addMinutes(date, 1439);
		} else {
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.KOREA);
			this.startTime = formatter.parse(startTime);
			this.endTime = DateUtils.addHours(this.startTime, 1);
		}
	}

	@Override
	public String toString() {
		return "Schedule [counselor=" + counselor + ", endTime=" + endTime + ", isComplete=" + isComplete
				+ ", isConfirmed=" + isConfirmed + ", isHoliday=" + isHoliday + ", startTime=" + startTime + ", user="
				+ user + "]";
	}

}
