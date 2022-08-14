package com.ssafy.db.entity;

import java.io.Serializable;
import java.text.ParseException;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 자격증 모델 정의.
 */
@Entity
@Getter
@Setter
public class Certificate extends BaseEntity implements Serializable{
	
	// 자격증을 등록시 상담사에 cascade할 필요가 있는지 확인 필요,,
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "COUNSELOR_ID", nullable= true)
	private Counselor counselor;

	private String name;
	private String imgPath;
	
	public Certificate() {
		super();
	}
	
	@Builder
	public Certificate(Counselor counselor, String name, String imgPath) throws ParseException {
		this.counselor = counselor;
		this.name = name;
		this.imgPath = imgPath;
	}
}
