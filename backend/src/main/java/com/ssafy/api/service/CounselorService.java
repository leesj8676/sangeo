package com.ssafy.api.service;

import com.ssafy.api.request.CounselorRegisterPostReq;
import com.ssafy.db.entity.Counselor;

public interface CounselorService {
	Counselor createCounselor(CounselorRegisterPostReq counselorRegisterInfo);
	Counselor getCounselorByCounselorId(String counselorId);
	Counselor updateCounselor(CounselorRegisterPostReq counselorRegisterInfo);
	void deleteCounselor(String counselorId);
}
