### 서버 배포시 변경사항
- application.properties 변경 [참고](https://www.notion.so/EC2-86be60492dcf4e19990cc92f12fdbb0d#b4d315660a2c41aa999ae5b428dc2b93)

### 브랜치 전략
- 백엔드 기능별로 feature 별로 브랜치해서 개발하기
- be에 merge, 테스트 후 서버 배포

## localhost:8080 으로 API 서버 접근시 변경사항
- .env.development 파일이 REACT_APP_DB_HOST=""으로 변경 [참고](https://www.notion.so/EC2-86be60492dcf4e19990cc92f12fdbb0d#afe57b4278e9424989699cdf9f1c905d)
- package.json의 프록시로 이용해서 로컬호스트 작동

* 프로젝트명: 미술 심리 상담 서비스 - <b>상</b>담 <b>어</b>때(상어)
* 서비스 특징: 화상 회의 기반 실시간 미술 심리 상담
* 주요 기능
  - 회원 관리 / 상담사 관리
  - 스케줄 기반 상담 예약
  - 화상 미팅룸
  - 그룹 채팅
* 주요 기술
  - WebRTC
  - WebSocket
  - JWT Authentication
  - REST API
* 참조 리소스
  * Vuetify: 디자인 전반 적용
  * Vue Argon Design System: 디자인 전반 적용
  * Vue Black Dashboard Pro(유료): 캘린더 컴포넌트 사용
  * AR Core: 구글에서 제공하는 AR 지원 라이브러리. 이미지 인식 및 오버레이 영상에 활용
  * Color Thief: 이미지 색상 추출 라이브러리. 커버 사진 색상 추출 및 배경 변경에 활용
  * Animation.css: CSS 애니메이션 지원 라이브러리. 메인 페이지 진입 애니메이션에 활용
* 배포 환경
  - URL: // 웹 서비스, 랜딩 페이지, 프로젝트 소개 등의 배포 URL 기입
  - 테스트 계정: // 로그인이 필요한 경우, 사용 가능한 테스트 계정(ID/PW) 기입

<!-- 자유 양식 -->

## 팀 소개
* 이상진: 팀장, 백엔드 개발
* 김준구: 부팀장, 프론트엔드 개발
* 인예림: 백엔드 개발
* 정민지: 프론트엔드 개발

<!-- 자유 양식 -->

## 프로젝트 상세 설명

// 시연 영상, 실행 화면, 개발 환경, 기술 스택, 시스템 구성도, ERD, 기능 '

상세 설명 등
### 개발 환경
- eclipse 2020-06
- sts 3.9.14
- vscode 


### 기술 스택
- Spring 3
- React 18
- mySQL 5.78
- 

### 시스템 구성도
-

### [ERD](https://www.erdcloud.com/d/fj9adz4HAg2kJBc5e)


### 기능 상세 설명
- 회원 관리
  - ㅇ
- 상담사 관리
  - ㅇ
- 예약
  - 네이버 예약 처럼,,,,
