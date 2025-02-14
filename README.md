# 안드로이드 기반 건강 식품 앱 구축(힐링 허브)

## 📅 프로젝트 기간 2024-08-26 ~ 진행 중(테스트 프로덕션)


<img src="https://github.com/user-attachments/assets/07ce0354-1da8-42cf-b29b-06d6234e4566" width="500" height="400"/>


## 📌 기술 스택 및 역할  

### 🖥️ 백엔드  
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)  
  - Express.js 기반의 RESTful API 서버 구축  
  - API Gateway를 통해 특정 요청을 분기 처리
  - AWS 서비스와의 원활한 통신을 위한 엔드포인트 설계 

### 🔑 인증 및 API 라우팅  
- ![AWS Lambda](https://img.shields.io/badge/AWS%20Lambda-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)  
  - 서버리스 환경에서 JWT 기반 로그인 처리  
  - 사용자의 로그인 요청(`/login`)을 처리하고, JWT 토큰 발급  

- ![Amazon API Gateway](https://img.shields.io/badge/API%20Gateway-FF4F8B?style=for-the-badge&logo=amazon-aws&logoColor=white)  
  - **요청 라우팅**:  
    - `/login` 요청은 **Lambda로 전달** → JWT 인증 처리  
    - `/product/*` 요청은 **서버(Node.js)로 전달** → 상품 정보 조회 및 관리  

### 📱 프론트엔드  
- ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
  - Expo CLI를 활용한 크로스플랫폼 모바일 앱 개발  
  - 네이티브 기능 연동 (카메라, 알림 등)  

### ☁️ 클라우드 및 데이터 관리  
- ![Amazon S3](https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=amazon-s3&logoColor=white)  
  - 상품 이미지 및 기타 정적 리소스 저장  
  - S3 버킷을 활용한 이미지 최적화 및 접근 제어 설정  

- ![Elastic Beanstalk](https://img.shields.io/badge/Elastic%20Beanstalk-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)  
  - AWS 기반 서버 배포 및 자동 스케일링 지원

- ![Amazon DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?style=for-the-badge&logo=amazon-dynamodb&logoColor=white)  
  - **사용자 테이블**: 관리자 ID/PW 저장 및 인증 처리  
  - **상품 테이블**: 상품 정보 저장 및 조회 최적화  

---

## 🎯 프로젝트 목적(요구 사항 분석)

도매 건강 식품을 하시는 아버지의 매장를 위한 안드로이드 기반 앱 개발

**가게 정보**:

- 주 고객층: 40-60대
- 고객 선호 소통 방식: 직접 전화 문의(제품의 가격, 할인 상품 문의, 가게 Open & Close 시간 문의)
- 현재 마케팅 방식: 문자 및 카카오톡을 통한 신제품, 할인 제품 홍보

**문제점**:

1. 고령 고객님들이 가게 번호를 찾는데, 어려움을 겪으심
2. 문자/카카오톡 홍보, 가게 휴무 알림 확인에 어려움
3. 늘어나는 고객에 따른 알림 서비스 마케팅 비용 증가

**해결 방안**:

1. 앱 메인 화면에 "가게 연결" 원터치 버튼 구현을 통해 고령자의 앱 유입을 향상시켜 마케팅과 기존 문제점을 해결
2. Expo Notification을 통해 신제품 홍보나 매장 휴무와 같은 알림 서비스를 제공 가능
3. 만보기 서비스를 통해 걸음 수에 따라 포인트를 제공하고 포인트를 사용할 수 있도록 구현(앱의 유입 향상) 

---

## 🗒️ 설계(구조)

### 2024-10-02

![healing-hub-diagram](https://github.com/user-attachments/assets/26e21d68-9e48-4b21-99a1-048f128a0da6)

---

## 🚀 앱 이미지



## 💡 문제 해결

### 1. 안드로이드 9 이후 버전 https 프로토콜

- **문제** : Expo Go를 통해 테스트 단계에서는 발생하지 않았던 apk preview로 배포 과정에서 안드로이드 디바이스에서 api 호출이 안되는 문제
- **원인** : 안드로이드 9이상부터는 https프로토콜 사용이 필수 !! http를 통한 api 호출은 네트워크 오류 문제가 발생
- **해결방안** : 1.aws cloud 환경에서 처리를 해야하는 문제로, route53와 도메인을 통해 ssl 인증서를 발급받거나,2.api g/w를 cloudfront에 연결해서 https 통신을 강제하는 두가지 방법이 존재
- **해결** : 매년 선택한 도메인에 대해서 비용을 지불해야하는 route53와 달리, cloudfront는 강력한 free tier가 존재했기에 2번째 방안을 선택

---

## 📚 참고 자료

- [React Native 공식 문서](https://reactnative.dev/docs/getting-started)
- [Expo 문서](https://docs.expo.dev/)
- [AWS Elastic Beanstalk 개발자 안내서](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html)
- [Tab Navigation](https://reactnavigation.org/docs/bottom-tab-navigator)
- [Tab Icon](https://icons.expo.fyi/Index)
- [Color Reference](https://kr.pinterest.com/pin/702983823112471636/)
- [Flatlist](https://www.npmjs.com/package/react-native-swiper-flatlist)
- [React Native 최적화](https://www.deviantceblog.com/it-24/#121_%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98)
- [React Native Dropdown](https://github.com/hoaphantn7604/react-native-element-dropdown)
