# recruitTeachers

청년교사 모집 시즌비시즌

---

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/PostCSS-DD3A0A?style=flat-square&logo=PostCSS&logoColor=white"/> <img src="https://img.shields.io/badge/Google%20Sheets-34A853?style=flat-square&logo=Google%20Sheets&logoColor=white"/> <img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=Netlify&logoColor=white"/> <img src="https://img.shields.io/badge/Google AppsScript-4285F4?style=flat-square&logo=Google&logoColor=white"/>

## 배포

🔗 https://nsg02.netlify.app/

## 작성자

👤 **Youngrong Oh**
<a href="https://github.com/youngrongoh" target="_blank"><img src="https://img.shields.io/badge/Github-181717?style=flat-square&logo=github&logoColor=white"/><img src="https://img.shields.io/badge/youngrongoh-1A4CA1?style=flat-square"/></a>

## 설명

### 🚩 목적

교회 고등부에서 20살이 된 청년들을 대상으로 교사를 모집하기 위해 제작한 설문 앱

### 🗓 기간

2020.12.14 - 2021.1.7

### 👣 과정

- 2020년 코로나 바이러스로 인한 비대면 상황에서 구글 폼과 같은 딱딱한 설문으로 흥미를 끌기 어렵다고 판단했음
- 비(정지훈)의 유튜브 채널 및 신곡 발표로 인기를 끌던 시기였으며, 일명 '미연시' 게임 형식에서 아이디어를 얻어 20살의 흥미를 끌만한 폼을 제작하기로 결정함

### ✅ 평가

- 이틀이라는 짧은 기한 내에 기본적인 기능 구현부터 배포까지 완료
- 리액트가 익숙하지 않아 애니메이션, 트랜지션을 계획 만큼 구현하지 못했음
- 평소 관계가 있는 10명 남짓한 소규모 집단을 대상으로 하여 문제는 없었으나 개인정보 활용 동의를 명시하지 못함
- 재치 있는 대사를 생각하지 못해 아쉬움

### 💡 깨달은 점

#### 영상, 이미지 같은 리소스는 압축해서 사용하는 것이 사용성 향상에 도움이 된다

- 인트로 동영상이 localhost에서는 잘 나왔으나 배포 후에 로딩 시간이 너무 길어지는 문제 발생하였음
- netlify에 기본제공 서버의 속도가 localhost 만큼 나오지 않아 생기는 문제
- 영상 사이즈와 색상을 줄여 용량을 줄여서 해결

#### 구글 시트를 데이터베이스로 활용

- 단번의 통신만을 필요로 하는 폼 제출에는 구글 시트를 데이터 베이스로 손쉽게 활용할 수 있음

---

## 구현 사항

### 구조

- 배포 서버
  - React: UI 표시 및 인터렉션
  - JS 비즈니스 로직: React로부터 작성된 폼 데이터를 전달 받아 데이터 베이스에 http 요청을 보냄
  - json 정적 데이터: React에 전달될 scene, script 데이터
- 데이터베이스
  - Google Sheets: 데이터 저장
  - AppsScript: POST 요청을 리스닝, 배포 서버로부터 받은 데이터를 처리하여 지정된 Google Sheets 문서에 저장하는 작업을 자동화

### 입력 폼

- 동일한 입력 컴포넌트를 재사용

- 컴포넌트가 언마운트 되어도 입력 받은 데이터 소실되지 않음

- 입력 타입별로 유효성 검사

  - 이름: 한글 자음만 입력하면 제출 버튼 표시 안 함, 영문 및 숫자 입력 불가
    ![유효하지 않은 이름 입력](https://user-images.githubusercontent.com/64844815/112807736-32289c00-90b3-11eb-8f5d-5de575919707.png)
  - 생일: 2002년 1월 - 2003년 2월까지만 입력 가능
  - 연락처: 숫자 외에 입력 불가
  - 빈 값을 제출하면 경고 메시지 표시

- 이름 입력
  ![이름 입력](https://user-images.githubusercontent.com/64844815/112804763-bf69f180-90af-11eb-83c7-5afc8ce4c734.png)

- 생일 입력
  ![생일 입력](https://user-images.githubusercontent.com/64844815/112804790-c5f86900-90af-11eb-962e-afb23b00bac2.png)

- 연락처 입력
  ![연락처 입력](https://user-images.githubusercontent.com/64844815/112804803-ca248680-90af-11eb-8857-c0a83f0f56a9.png)

### 동적 데이터 변경

![이름 동적으로 표시](https://user-images.githubusercontent.com/64844815/112803434-3a320d00-90ae-11eb-9be6-0c76f191dee4.png)

- json으로 저장해놓은 대사 데이터와 사용자로부터 입력받은 이름을 합쳐 동적으로 데이터 만들어 표시

### 구글 시트에 데이터 자동 등록

![구글 시트](https://user-images.githubusercontent.com/64844815/112805342-71092280-90b0-11eb-8671-8093ba8b1df6.png)

- FormData 오브젝트에 입력 데이터를 모아뒀다가 마지막 scene이 끝나면 구글 시트에 POST 요청

### 인트로 영상

- 타이틀 화면에서 아무곳이나 터치 or 클릭하면 인트로 영상이 전체화면으로 표시

- 인트로 영상이 끝나거나, 전체화면이 해제되면 첫 scene으로 자동 전환

- 타이틀 화면

  ![타이틀 화면](https://user-images.githubusercontent.com/64844815/112806030-4c617a80-90b1-11eb-97e4-d29eaabb7838.png)

- 인트로 영상

  ![인트로 영상](https://user-images.githubusercontent.com/64844815/112806038-508d9800-90b1-11eb-85da-a43f4b9b4e45.png)

### 반응형

- pc

![반응형 pc](https://user-images.githubusercontent.com/64844815/112806465-c09c1e00-90b1-11eb-81ae-8a4449851b33.png)

- 태블릿

![반응형 태블릿](https://user-images.githubusercontent.com/64844815/112806656-fd681500-90b1-11eb-9a05-5c304c1d7120.png)

- 모바일

![반응형 모바일](https://user-images.githubusercontent.com/64844815/112806800-27b9d280-90b2-11eb-9fc3-d5bf8e8c6aa1.png)

---

## 브라우저 지원

| ![크롬](https://user-images.githubusercontent.com/64844815/112784126-cf6fda00-908b-11eb-9da4-1a0f4f3c5b6e.png) | ![사파리](https://user-images.githubusercontent.com/64844815/112796463-f8509900-90a4-11eb-8cbe-563aff837e13.png) |
| :------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------: |
|                                                   **Latest**                                                   |                                                    **Latest**                                                    |
