## ReactNative

초기 필요한것

1. 안드로이드 스튜디오
2. Java
3. 안드로이드 sdk
4. 시뮬레이터
5. 개발 도구

---------------------------------------------------------------------------

이녀석들을 필요 없이 설치 할 녀석이 있다.

### expo

- cmd창에서 설치

- ```bash
  npm install --global expo-cli
  ```

- 그 다음 핸드폰에 expo를 검색해서 설치

### How does ReactNative Work

- ReactJS와는 다르게 BrowserDom을 다루지 않는다.
- React Native는 ios나 android와 같은 운영체제와 react를 연결해주는 인터페이스 임!
- React 언어를 React Native를 통해 ios 또는 java 안드로이드 코드로 번역이 되어 실행을 시켜줌.

그렇다면 어떻게 통신이 이루어 질까?

- Native(운영체제)에서 event가 발생한다.(ex 터치)
- 이를 bridge에서 js가 이해하게끔 변형시켜 전달해준다.
- 우리의 코드(js)는 해당 이벤트를 진행하고 변경사항을 bridge에 보내준다.
- bridge에선 운영체제가 이해할 수 있게끔 보내준다.
- 운영체제는 실행된 화면을 보여준다.

### Creating The App

- expo init {AppName}
- 그 다음 선택창이 뜨면 첫번째 걸 고르면 됨
- 그 다음 App에 들어온 뒤, npm start!(이거 안먹힘.. 왜인진 모르겠는데, 노마드코더 보면 npm start했을때 localhost주소도 함께 뜨지만 난 안뜸) -> 알아보니 개발 툴 웹UI가 중단되었다함
- 다시 터미널 창으로 나간 뒤, expo login을 치고 로그인 진행
- 그 뒤 expo start --tunnel 로 진행시키면 됨!
- 핸드폰 화면과 함께 확인이 가능(기존 핸드폰이 ios라면 자동으로 ios로 연결이 될 꺼고, press i 버튼이 사라져있음)
- 웹화면으로 확인하려면 w를 눌러 web화면에서 보면 됨(내 핸드폰이 아이폰이므로 ios화면과 연동 되어있지만 w를 눌러 web에서도 내 핸드폰 화면 확인 가능)

** 혹시 vscode나 expo가 깔려있지 않은 경우 snack.expo라는 사이트에 들어가 제작 할 수있다. **(추가로 로그인 하면 핸드폰 화면을 따로 qr코드를 찍지 않아도 사용 가능하다)

## The Rules of Native

1. react native는 웹사이트가 아니다.

   - Html이 아니기 때문에 div는 사용 불가. 대신 View가 있음

   - View는 container이다 <View> so 항상 import 해줘야함!

   - ```js
     import { StyleSheet, Text, View } from 'react-native';
     ```

2. react native에 있는 모든 텍스트는 text component안에 들어가야 한다<Text> 다른곳에 들어가면 오류가 뜸

3. style이 있다! (react.js와 유사) but 브라우저에서 사용했던 style들 중 몇개는 사용이 불가함(ex border)

   - what is StyleSheet?

     - StyleSheet.create는 object를 생성하는데 사용(object안에 js언어로 style관련된 css를 넣어서 사용하면됨)

     - ```js
       // 예시
       const styles = StyleSheet.create({
         container: {
           flex: 1,
           backgroundColor: '#fff',
           alignItems: 'center',
           justifyContent: 'center',    
         },
         text: {
           fontSize:28,
           color:"red",
         }
       });
       ```

   - why using StyleSheet?

     1. 아주 좋은 자동 완성 기능을 제공함
     2. 스타일 component를 정리하는데 유용함

### StatusBar**

```js
import { StatusBar } from 'expo-status-bar';
```

- StatusBar 핸드폰임을 보여주는 상태바(시계, wifi, 베터리등)와 소통할 수 있는 방법이다.

- 이는 StatusBar를 통해 브라우저가 아닌 ios나 android와 연동되어 있음을 상기 시킴

- ```js
  <StatusBar style="auto" />

  // 상태바 가 흰색으로 나옴
  <StatusBar style="light" />

  //이를 통해 알 수 있듯 상태바의 형태를 뜻함
  ```

- ​



