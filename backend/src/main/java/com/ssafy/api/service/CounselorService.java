package com.ssafy.api.service;

import java.util.List;

import com.ssafy.api.request.CounselorRegisterPostReq;
import com.ssafy.db.entity.Counselor;

public interface CounselorService {
	Counselor createCounselor(CounselorRegisterPostReq counselorRegisterInfo);
	Counselor getCounselorByCounselorId(String counselorId);
	List<Counselor> getAllCounselor();
	Counselor updateCounselor(CounselorRegisterPostReq counselorRegisterInfo);
	void deleteCounselor(String counselorId);
}
