package com.ssafy.api.service;

import java.util.List;

import com.ssafy.api.mapping.CounselorMapping;
import com.ssafy.api.request.CounselorRegisterPostReq;
import com.ssafy.api.request.CounselorUpdateReq;
import com.ssafy.api.request.PasswordUpdateReq;
import com.ssafy.db.entity.Counselor;

public interface CounselorService {
	Counselor createCounselor(CounselorRegisterPostReq counselorRegisterInfo);
	Counselor getCounselorByCounselorId(String counselorId);
	List<CounselorMapping> getAllCounselor();
	Counselor updateCounselor(CounselorUpdateReq updateCounselorInfo);
	Counselor updatePassword(PasswordUpdateReq passwordUpdateInfo);
	void deleteCounselor(String counselorId);
}
