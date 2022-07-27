package com.ssafy.db.entity;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

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
	private boolean isVacation = false;

	@Builder
	public Schedule(Counselor counselor, User user, String startTime, boolean isComplete,
			boolean isVacation) {

		//Not null을 체크
		//날짜는 String으로 받기
		Assert.hasText(startTime, "startTime must note be empty");
		
		this.counselor = counselor;
		this.user = user;
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
		try {
			this.startTime = formatter.parse(startTime);
		} catch (ParseException e) {
			e.printStackTrace();
			System.out.println("에러발생" + startTime);
		}
		this.endTime = DateUtils.addHours(this.startTime, 1);
		this.isComplete = isComplete;
		this.isVacation = isVacation;
	}

}
