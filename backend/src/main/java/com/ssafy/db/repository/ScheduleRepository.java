package com.ssafy.db.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.Schedule;

/**
 * 스케줄 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
	// 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.
//    Optional<User> findByUserId(String userId);

//    @Transactional
//    Optional<User> deleteByUserId(String userId);
	List<Schedule> findByCounselor_Id(Long counselorId);
	List<Schedule> findByUser_Id(Long userId);
	Schedule findByCounselor_IdAndStartTime(Long counselorId, Date date);
	Schedule findByUser_IdAndStartTime(Long userId, Date date);
	//public List<Student> findByRollNumberLessThanEqual(String rollnumber);
	List<Schedule> findByUser_IdAndStartTimeGreaterThanAndStartTimeLessThan(Long id, Date searchDate, Date nextDate);
}