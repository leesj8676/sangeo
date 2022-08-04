package com.ssafy.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.mapping.CounselorMapping;
import com.ssafy.api.request.CounselorRegisterPostReq;
import com.ssafy.db.entity.Counselor;
import com.ssafy.db.repository.CounselorRepository;

/**
 *	상담사 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("counselorService")
public class CounselorServiceImpl implements CounselorService{

	@Autowired
	CounselorRepository counselorRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public Counselor createCounselor(CounselorRegisterPostReq counselorRegisterInfo) {
		Counselor counselor = new Counselor();
		counselor.setCounselorId(counselorRegisterInfo.getCounselorId());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		counselor.setPassword(passwordEncoder.encode(counselorRegisterInfo.getPassword()));
		counselor.setName(counselorRegisterInfo.getName());
		counselor.setPhoneNumber(counselorRegisterInfo.getPhoneNumber());
		counselor.setProfile(counselorRegisterInfo.getProfile());
		counselor.setShortIntroduction(counselorRegisterInfo.getShortIntroduction());
		counselor.setContactStartTime(counselorRegisterInfo.getContactStartTime());
		counselor.setContactEndTime(counselorRegisterInfo.getContactEndTime());
		
		return counselorRepository.save(counselor);
	}

	@Override
	public Counselor getCounselorByCounselorId(String counselorId) {
		if(!counselorRepository.findByCounselorId(counselorId).isPresent())
			return null;
		
		Counselor counselor = counselorRepository.findByCounselorId(counselorId).get();
		return counselor;
	}
	
	@Override
	public List<CounselorMapping> getAllCounselor() {
		List<CounselorMapping> clist = counselorRepository.findAllBy();
		return clist;
	}

	@Override
	public Counselor updateCounselor(Counselor updateCounselor) { // 모든 정보 수정 가능한 버전
		Counselor counselor = counselorRepository.findByCounselorId(updateCounselor.getCounselorId()).get();
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		counselor.setPassword(passwordEncoder.encode(updateCounselor.getPassword()));
		counselor.setName(updateCounselor.getName());
		counselor.setPhoneNumber(updateCounselor.getPhoneNumber());
		counselor.setProfile(updateCounselor.getProfile());
		counselor.setShortIntroduction(updateCounselor.getShortIntroduction());
		counselor.setContactStartTime(updateCounselor.getContactStartTime());
		counselor.setContactEndTime(updateCounselor.getContactEndTime());
		counselor.setCareer(updateCounselor.getCareer());
		counselor.setLongIntroduction(updateCounselor.getLongIntroduction());
		counselor.setReserveStartTime(updateCounselor.getReserveStartTime());
		counselor.setReserveEndTime(updateCounselor.getContactEndTime());
		counselor.setConsultTarget(updateCounselor.getConsultTarget());
		counselor.setPrice(updateCounselor.getPrice());
		counselor.setConsultNumber(updateCounselor.getConsultNumber());
		counselor.setHoliday(updateCounselor.getHoliday());
		
		return counselorRepository.save(counselor);
	}

	@Override
	public void deleteCounselor(String counselorId) {
		counselorRepository.deleteByCounselorId(counselorId);
	}

}
