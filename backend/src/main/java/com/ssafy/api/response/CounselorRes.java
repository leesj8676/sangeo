package com.ssafy.api.response;

import com.ssafy.db.entity.Counselor;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/counselors/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("CounselorResponse")
public class CounselorRes {
	@ApiModelProperty(name="Counselor ID")
	String counselorId;
	
	public static CounselorRes of(Counselor counselor) {
		CounselorRes res = new CounselorRes();
		res.setCounselorId(counselor.getCounselorId());
		return res;
	}

}
