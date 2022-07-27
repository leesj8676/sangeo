package com.ssafy.db.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.Counselor;

/**
 * 상담사 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
public interface CounselorRepository extends JpaRepository<Counselor, Long>{ // <Entity, Id(value)> 
    Optional<Counselor> findByCounselorId(String counselorId);
    
    @Transactional
    Optional<Counselor> deleteByCounselorId(String counselorId);
}
