# 안드로이드 기반 건강 식품 APP 구축 및 Elastic Beanstalk 배포

## 📅 프로젝트 기간

2024-08-26 ~ 2024-09-05

## 🛠 기술 스택

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![S3](https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=amazon-s3&logoColor=white)
![Elastic Beanstalk](https://img.shields.io/badge/Elastic%20Beanstalk-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?style=for-the-badge&logo=amazon-dynamodb&logoColor=white)

## 🎯 프로젝트 목적(요구 사항 분석)

도매 건강 식품을 하시는 아버지의 가게를 위한 안드로이드 기반 애플리케이션 개발

가게 정보:
- 주 고객층: 40-60대
- 고객 선호 소통 방식: 직접 전화 문의(제품의 가격, 할인 상품 문의, 가게 Open & Close 시간 문의)
- 현재 마케팅 방식: 문자 및 카카오톡을 통한 신제품, 할인 제품 홍보

문제점:
1. 고령 고객님들이 가게 번호를 찾는데, 어려움을 겪으심
2. 문자/카카오톡 홍보, 가게 휴무 알림 확인에 어려움
3. 늘어나는 고객에 따른 마케팅 비용 증가

해결 방안:
1. 앱 홈 화면에 "가게 연결" 원터치 버튼 구현
2. 앱 홈 화면 중간 빈 부분에 신제품 및 할인 상품 정보 표시 공간 마련

---

## 🗒️ 설계(구조)
![healing-hub](https://github.com/user-attachments/assets/7178229b-460c-497e-8296-55acf7227969)


### 프론트엔드 (FE)
- #### 개발 환경 (Expo)
- 많은 기능이 불필요하기 때문에 React Native를 기반으로 하는 expo 프레임워크를 통해서 개발 진행 및 배포 과정을 간소화
- 개인 디바이스에 Expo Go 설치를 통해 개발 과정을 실시간을 확인
- #### 기능 설계
- 타겟 고객이 고령층인 만큼 전반적인 텍스트, 아이콘, 그리고 버튼 크기가 커야함
- 불필요하고 복잡한 기능은 제외하고 최대한 직관적이고 사용하기 간편해야함

### 백엔드 (BE)
- #### 개발 환경 (Node js)
- 코드 재사용이 용이한 Node.js를 사용하여, 프론트엔드와의 동일한 언어(Javascript)를 사용
- 관리자의 상품 등록과 삭제에 대한 I/O 작업을 처리하기에 용이함
- 수 많은 패키지와 라이브러리를 통해, AWS와의 연동이 용이함

- #### 기능 설계
- 관리자가 로그인하고 상품을 등록, 삭제한 상품이 홈 화면에 업데이트 되는 것 이외에 다른 RESTful API는 불필요
- 상품과 관리자의 정보에 대한 데이터는 각각 s3와 DynamoDB를 통해 관리

### 배포 (AWS Elastic Beanstalk)
- Elastic Beanstalk을 통한 백앤드 배포로 인프라 관리 부담 최소화
- 서버 상태를 실시간으로 모니터링이 가능

---

## 🚀 개발 (기능 구현)
### FE Updated (2024-09-19)
    <img src="https://github.com/user-attachments/assets/2761e311-f1a9-4e9c-9a82-db1d5c67ee5f" alt="Update Design" width=700><br>
### 프론트엔드 (FE)

1. **원터치 가게 연결**
   - 앱 하단에 **"가게 전화 걸기"** 버튼 구현
   - 클릭 시 즉시 가게로 전화 연결<br>
   
   <img src="https://github.com/user-attachments/assets/3fa15829-1ebe-431e-814b-ac2acc295dcd" alt="원터치 가게 연결" width=700><br>

   ```javascript
   // index.jsx
   import { Linking } from 'react-native';
   
   const makePhoneCall = () => {
     Linking.openURL('tel:010-4040-1669');
   };
   
   return (
     <TouchableOpacity style={styles.callButton} onPress={makePhoneCall}>
       <Text style={styles.callButtonText}>가게 전화 걸기</Text>
     </TouchableOpacity>
   );
   ```

2. **상품 정보 표시**
   - 홈 화면 중앙에 상품 정보 캐러셀 구현
   - **FlipCard**를 사용하여 상품 정보의 앞면과 뒷면 표시<br>
   
   <img src="https://github.com/user-attachments/assets/228d1a38-1b00-4ee0-bada-4e642f1242ac" alt="상품 정보 표시" width=700><br>

   ```javascript
   // index.jsx
   import { SwiperFlatList } from 'react-native-swiper-flatlist';
   import FlipCard from 'react-native-flip-card';

   const ProductSlide = memo(({ item, formatPrice }) => (
     <View style={styles.slide}>
       <FlipCard
         style={styles.flipCard}
         friction={1000}
         perspective={3000}
         flipHorizontal={true}
         flipVertical={false}
         flip={false}
         clickable={true}
       >
         {/* Face side */}
         <View style={styles.face}>
           ...
         </View>
         {/* Back side */}
         <View style={styles.back}>
           ...
         </View>
       </FlipCard>
     </View>
   ));

   return (
     ...
     <View style={styles.swiperContainer}>
        <SwiperFlatList
          ...
          renderItem={({ item }) => <ProductSlide item={item} formatPrice={formatPrice} />}
        />
      </View>
      ...
   );
   ```

3. **관리자 기능**
   - 관리자 로그인 화면 구현
   - 상품 추가, 삭제 기능 구현
  
   <img src="https://github.com/user-attachments/assets/7df75fc6-7a55-4b1c-9966-aaa2d8d98c93" alt="관리자 페이지" width=700><br>

   ```javascript
   // home.jsx (관리자 화면)
   const addProduct = async () => {
     // 상품 추가 로직
   };
   
   const confirmRemoveProduct = (id) => {
     // 상품 삭제 로직
   };
   
   return (
     ...
     <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {products.map((product) => (
            <View key={product.id} style={styles.productContainer}>
              ...
            </View>
          ))}
        </View>
      </ScrollView>
      // 상품 추가 버튼 (모달 창 불러오기)
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>... </TouchableOpacity>
      // 상품 추가 모달창
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >...</Modal>
      ...
   );
   ```

### 백엔드 (BE)

1. **RESTful API 구현**
   - Express.js를 사용하여 API 엔드포인트 구현

   ```javascript
   // server.js
   const express = require('express');
   const app = express();
   
   app.get('/api/products', async (req, res) => {
     // 상품 목록 조회 로직
   });
   
   app.post('/api/products', upload.single('image'), async (req, res) => {
     // 상품 추가 로직
   });
   
   app.delete('/api/products/:id', async (req, res) => {
     // 상품 삭제 로직
   });
   ```

2. **데이터베이스 연동**
   - AWS DynamoDB를 사용하여 상품 정보 저장 및 관리

   ```javascript
   // server.js
   const AWS = require('aws-sdk');
   const dynamodb = new AWS.DynamoDB.DocumentClient();
   
   const getProducts = async () => {
     const params = { TableName: DYNAMODB_TABLE_NAME };
     const data = await dynamodb.scan(params).promise();
     return data.Items;
   };
   ```

3. **이미지 저장**
   - AWS S3를 사용하여 상품 이미지 저장

   ```javascript
   // server.js
   const s3 = new AWS.S3();
   
   const uploadImage = async (file) => {
     const params = {
       Bucket: S3_BUCKET_NAME,
       Key: `${uuidv4()}.jpg`,
       Body: file.buffer,
       ContentType: file.mimetype
     };
     await s3.putObject(params).promise();
     return `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${params.Key}`;
   };
   ```

4. **보안**
   - CORS 설정을 통한 API 접근 제어

   ```javascript
   // server.js
   const cors = require('cors');
   app.use(cors());
   ```

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
