## 서버 배포용 FE 파일


### 브랜치 전략
- 프론트엔드 기능별로 feature 브랜치 만들어서 개발
- fe에 merge, 테스트 후 서버 배포


## localhost:8080 으로 API 서버 접근시 변경사항
- .env.development 파일이 REACT_APP_DB_HOST=""으로 변경 [참고](https://www.notion.so/EC2-86be60492dcf4e19990cc92f12fdbb0d#afe57b4278e9424989699cdf9f1c905d)
- package.json의 프록시로 이용해서 로컬호스트 작동


