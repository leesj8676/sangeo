package com.ssafy.db.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.api.mapping.ReviewMapping;
import com.ssafy.db.entity.Review;

/**
 * 리뷰 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>  {
	
	List<Review> findBySchedule_Id(Long scheduleId);
	List<Review> findBySchedule_CounselorId(Long counselorId);
	List<Review> findBySchedule_UserId(Long userId);
	
    @Transactional
    Optional<Review> deleteBySchedule_Id(Long scheduleId);
}
