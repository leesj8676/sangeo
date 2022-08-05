<<<<<<< README.md
### 서버 배포시 변경사항
- application.properties 변경 [참고](https://www.notion.so/EC2-86be60492dcf4e19990cc92f12fdbb0d#b4d315660a2c41aa999ae5b428dc2b93)

### 브랜치 전략
- 백엔드 기능별로 feature 별로 브랜치해서 개발하기
- be에 merge, 테스트 후 서버 배포

## localhost:8080 으로 API 서버 접근시 변경사항
- .env.development 파일이 REACT_APP_DB_HOST=""으로 변경 [참고](https://www.notion.so/EC2-86be60492dcf4e19990cc92f12fdbb0d#afe57b4278e9424989699cdf9f1c905d)
- package.json의 프록시로 이용해서 로컬호스트 작동

### 기타
- webpack 빌드용으로 frontend 폴더 유지 (추후 삭제)
