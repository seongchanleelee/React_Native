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




### ReactNative Api and Components

- RN을 사용하는 유저들을 위해 API 와 Components가 준비 되어있다.
- https://reactnative.dev/docs/components-and-apis
- 하지만 많은 기능을 다루기 힘들기에 ReactNative측에선 많은 기능을 줄였고, 이를 expo측에서 모바일을 위한 api, components를 모아 만드는 사업을 시작하게 됨
- https://docs.expo.dev/



### Layout System

- 모바일은 grid 나 inblock등 이 존재하지 않고 flex만 존재한다!

- 고로 따로 display:flex 라고 선언하지 않아도 flex관련 layout을 사용 가능

- **모바일에서 Flex Direction 기본값은 모두 Column이다.(웹에선 Flex Direction 기본값은 row였음)

- React Native를 이용하는데 있어, width나 height를 사용할 일은 거의 없다 왜나면 모바일은 화면 사이즈가 다양하기 때문!

- 대신 flex를 이용하여 비율을 맞춰 사용한다

- ```js
  export default function App() {
    return (
      <View style={{flex: 1}}>
        <View style={{ flex: 1,backgroundColor:"tomato"}}></View>
        <View style={{ flex: 1,backgroundColor:"teal"}}></View>
        <View style={{flex: 1,backgroundColor:"orange"}}></View>

      </View>
    );
  }

  // 부모components의 flex를 1로 두었을 때(전체화면을 1이라고 둠 0.5라면 그중 절반만 됨) 그 걸 1:1:1비율로 자식컴포넌트가 가져간다는 뜻
  ```

- 부모컴포넌트의 flex 비율을 잡지 않으면 자식 컴포넌트도 flex비율이 잡히지 않으므로 주의해야함



### **모바일 화면 필수 컴포넌트RN(자주쓰임)

- ScrollView

- ```js
  import {ScrollView } from "react-native";

  // View 대신 사용하면 됨 <ScrollView>
  // 아래로 스크롤이 자동으로 됨
  ```

- ScrollView(props) horizontal

- ```js
  // horizontal

  // 옆으로 스크롤이 됨
  <ScrollView horizontal>

  ```

- ScrollView를 이용하면 flex 사이즈가 먹지 않는다!

  - why? 모름 그냥 안먹음

  - ScrollView에게 css를 먹이기 위해선 props에 있는 contentContainerStyle을 사용해야 함

  - ```html
    <ScrollView horizontal contentContainerStyle={styles.weather}>
    ```

  - but 사용하게 되면 스크롤링이 멈춤

  - 왜나하면, horizontal scrollview는 flex보다 훨씬 커야함. 그래야 좌우로 이동이 가능해서.

  - 그래서 style에 flex를 지워버리면 됨

- **css를 적용하는데 확인하는 방법

  - expo go를 흔든 뒤 제일 아래 show element inspector를 클릭하면 css적인 요소를 확인 가능

- **핸드폰 사이즈를 알려주는 API (Dimensions)

  - ```js
    import { Dimensions } from "react-native";

    const {height, width} = Dimensions.get("window");
    console.log(width) //12미니의 경우 375
    console.log(height) //812

    //이를 변수로 사용하기 위해선
    const {width: SCREEN_WIDTH} = Dimensions.get("window")

    //css로 사용
      day: {
        width:SCREEN_WIDTH,
        alignItems: "center",
      },
    ```

- ScrollView(props) paginate(페이지생성)

  - 스크롤을 자유롭지 못하게 해주고 페이지가 생기게 해줌

  - ```
    // pagingEnabled

    // 페이지를 생성시켜 자유롭게 스크롤 하는걸 막아줌
    <ScrollView pagingEnabled horizontal>

    ```

- ScrollView(props) scroll indicator, horizontal scroll indicator visible

  - 스크롤 시 생기는 스크롤 바 를 숨겨줌

  - ```
    <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false}>
    ```

- ScrollView(props) indicatorStyle

  - 스크롤 바를 커스텀 할 수 있음(이건 ios에서만 동작됨)

  - ```js
    <ScrollView
           pagingEnabled 
           horizontal 
           // 여기
           indicatorStyle="white"
           //
           contentContainerStyle={styles.weather}>

    ```

- Activity indicator --> 로딩중 화면을 보여줌

- ```html
  <ActivityIndicator color="white" size="large">
  ```

- ​

### **모바일 컴포넌트EXPO(자주쓰임)

- Location

  - ```bash
    npx expo install expo-location
    ```

- Location 의 methods: requestForegroundPermissionsAsync()

  - 위치추적을 허가 받는 methods


  - ```js
    import * as Location from 'expo-location'
    import React, { useEffect, useState } from "react";

    export default function App() {
      const [location, setLocation] = useState()
      const [ok, setOk] = useState(true)
      const ask = async() => {
        const {granted} =  await Location.requestForegroundPermissionsAsync();
        if (!granted) {
          setOk(false);
        }
      }
      useEffect(() => {
        ask()
      },[])
    ```

- Location의 methods: getCurrentPositionAsync()

  - 위치의 위도와 경도를 뽑아줌

  - ```js
    import * as Location from 'expo-location'
    import { StatusBar } from "expo-status-bar";
    import React, { useEffect, useState } from "react";
    import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";

    const {width: SCREEN_WIDTH} = Dimensions.get("window")
    export default function App() {
      const [city,setCity] = useState("Loading...")
      const [location, setLocation] = useState()
      const [ok, setOk] = useState(true)
      const ask = async() => {
        // 위치추적허용을 위함
        const {granted} =  await Location.requestForegroundPermissionsAsync();
        if (!granted) {
          setOk(false);
        }
        // 위치의 위도와 경도를 뽑아줌
        const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5})
    ```

- Location의 methods: reverseGeocodeAsync()

  - 위도와 경도를 기반으로 지역의 정보를 뽑아줌

  - ```js

    import * as Location from 'expo-location'
    import { StatusBar } from "expo-status-bar";
    import React, { useEffect, useState } from "react";
    import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";

    const {width: SCREEN_WIDTH} = Dimensions.get("window")
    export default function App() {
      const [city,setCity] = useState("Loading...")
      const [location, setLocation] = useState()
      const [ok, setOk] = useState(true)
      const ask = async() => {
        // 위치추적허용을 위함
        const {granted} =  await Location.requestForegroundPermissionsAsync();
        if (!granted) {
          setOk(false);
        }
        // 위치의 위도와 경도를 뽑아줌
        const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5})
        // 위도와 경도를 기반으로 지역정보를 뽑아줌
        const location = await Location.reverseGeocodeAsync(
          {latitude, longitude}, 
          {useGoogleMaps:false})
        setCity(location[0].city)
      }
    ```

- weather는 실습해보려 했지만... api 오류가 남.(유료서비스에 접근해서 안되는듯 함)

- ** Icon

  - expo init 으로 App을 설치했다면 아이콘 사용전에 import

  - ```js
    import {Ionicons} from '@expo/vector-icons'
    ```

  - ```html
    // 예제
    <Ionicons name="md-checkmark-circle" size={32} color="green">
    ```

  - 아이콘 정보 들은 url을 통해 확인 가능

  - https://icons.expo.fyi/

  ​

## TODOAPP

### color.js

- color나 또 다른 css 요소중 자주 사용되는 요소 가 있다면 따로 js파일을 이용하는것 이 좋음

- ```js
  //clolr.js

  export const theme = {
      bg: "black",
      gray: "#3A3D40",
  }
  ```

- 이 후 이용시 import  한 뒤 사용하면 됨

- ```js
  import { theme } from './color';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingHorizontal: 20,
    },
  ```

### 터치관련 속성

1. TouchableOpacity

   - 클릭 시 투명도가 내려간다.

   - 투명도를 조절 방법

   - ```js
     <TouchableOpacity activeOpacity={0}>
     ```

2. TouchableHighlight

   - 요소를 클릭 시 배경색이 바뀌도록 해줌

   - 변화는 바로 보이지 않고 속성을 추가 시켜야 함

     1. onPress

        - 유저가 Touchable을 눌렀을 때 실행되는 이벤트를 뜻함

        - ```js
          <TouchableHighlight onPress={() => console.log("pressed")}>
          ```

     2. underlayColor

        - 클릭 시 배경색이 변경됨

        - ```js
          <TouchableHighlight onPress={() => console.log("pressed")} underlayColor="#DDDDDD">
          ```

3. TouchableWithoutFeedback

   - 클릭은 인식되지만, 이벤트 변화를 보여주고 싶지 않을 때 사용된다.
   - UI적인 변화는 없음

4. Pressable

   - TouchableWithoutFeedback 과 거의 동일하지만, 새로운 component요소들이 많이 들어있음
   - hitSlop: 터치 감지되는 범위를 지정 가능



알아야 할 요소(css적으로 중요)

- ```
  <Text style={styles.btnText}>Work</Text>
  // 이는 styles.btnText만 style요소로 가져갈 수 있다.
  // styles제외하고, 또 다른 요소들을 가져 오거나 style에 if문을 사용한는 방법은?
  ```

- ```js
  <Text style={{...styles.btnText, color: wirking ? "white": theme.gray}}>Work</Text>

  // style요소로 ...styles.btnText를 가져오고 나머지 녀석 들 도 사용가능
  // 그 뒤는 color요소를 변화시키는데 도움을 주는데, working이 true면 white, 아니면 gray가 들어온다
  ```

- ```js
  // 예시
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white": theme.gray}}>Work</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white":theme.gray }}>Travel</Text>
        </TouchableOpacity>
  ```



## TextInput

- html처럼 textarea나 input이 없음 (TextInput하나로 해결)

- ```js
  import { TextInput } from 'react-native';
  ```

- placeholder

  - TexpInput태그 안에 미리 들어갈 요소

  - ```js
     <TextInput keyboardType='number-pad' placeholder={working ? "Add a To Do" : "Where do you want to go?"} style={styles.input} />
    ```

- keyboardType

  - 키보드 타입을 바꿔줌

  - ```js
     <TextInput keyboardType='number-pad' placeholder={working ? "Add a To Do" : "Where do you want to go?"} style={styles.input} />
    ```

- multiline

  - text를 줄바꿈 하며 작성 가능

- *onChangeText

  - text변화를 알 수 있음(어떤 문장이 들어왔는지 확인 가능)

  - ```js
    const onChangeText = (event) => console.log(event)

    <TextInput onChangeText={onChangeText} style={styles.input} />
    ```

- *state에 적힌 text를 저장하는법

  - ```js
    // text라는 useState("")를 잡아주고
    // value를 text로 잡아준뒤
    // onChangeText라는 함수로 setText를 건드려줌
    const [text, setText] = useState("") 
    const onChangeText = (event) => setText(event)
    <TextInput onChangeText={onChangeText} value={text} />

    // onSubmitEditing를 이용하여 확인 버튼 누를시 addToDo함수가 실행되게 함
     <TextInput returnKeyType='done' onSubmitEditing={addToDo} onChangeText={onChangeText} value={text} />

    // text가 없으면 return 되고 아니라면 alert() 해서 확인해보기
    const addToDo = () => {
        if (text === "") {
          return;
        }
      	alert(text)

    ```

- **저장된 text를 object로 감싸는 법!(object를 이용하여 hash를 사용 )

  1. ```js
     // toDos라는 useState()를 만듬
     const [toDos, setToDos] = useState({});

     const addToDo = () => {
         if (text === "") {
           return;
         }
     // newToDos라는 함수를 이용하는데, Object.assign을 이용
     // Object.assign은, Object.assign(Obj1, Obj2, obj3}); 형태로, obj1에 기존에 있던 obj2와 새롭게 합쳐질 obj3를 합쳐 obj1에 넣는것이다!
       
     // 또 Date.now()는 현재를 해쉬로 변환한 값을 반환하는 함수인데, 이를 key로 사용하여 안정성을 올림
       
         const newToDos = Object.assign({}, toDos, {
           [Date.now()]: { text, work: working },
         });
       // ToDos자리에 newToDos로 치환 시켜줌
         setToDos(newToDos);
         setText("");
       };
       console.log(toDos)
     ```

  2. ​

     ```js
     //위와같이 Object.assign이 이해가 잘 되지 않는다면 E26 사용

     // ...toDos는 기존의 toDos를 풀어서 다른 object에 넣어주기 위함
     const newToDos = { ...toDos, [Date.now()]: {text, work:working},}
     ```

- Todo를 보여주기 위해 사용하는 map

  - 지금까지 Todo를 object를 이용하여 만들었는데, 이를 기존의 방식처럼 map을 사용하여 보여주기 위해선 어떻게 해야 할 까?(Object.keys() 사용)

  - ```js
    // 기존방법
    <ScrollView>{[].map(key => key)}</ScrollView>

    // obj를 map 하여 사용하는 방법
    <ScrollView>{Object.keys(x).map(key => x[key])}</ScrollView>
    ```

- *work이거나 travel일때 todo리스트가 다르게 하는법

- ```js
  const newToDos = { ...toDos, [Date.now()]: {text, working},}

  //map으로 나눌 때 key를 가지고 함수를 타는데, toDos[key].working === 현재의 working이면 보여주고 아니면 null
  <ScrollView>{Object.keys(toDos).map(key => toDos[key].working === working ?<View style={styles.toDo} key={key}><Text style={styles.toDoText}>{toDos[key].text}</Text></View>: null)}</ScrollView>
  ```



## AsyncStorage

- 어플을 껐을시에도 모든 정보가 남아있어야함. 그러려면 expo에 AsyncStorage를 사용해야함

- ```bash
  expo install @react-native-async-storage/async-storage
  ```

- ```js
  // 저장 시 사용 
  import { AsyncStorage } from '@react-native-async-storage/async-storage';

  const saveToDos = async (toSave) => {
    const s = JSON.stringify(toSave)
    await AsyncStorage.setItem(STORAGE_KEY, s)
  }
  ```

- ```js
    // 하나 추가 할 때마다 함께 저장 되는것 이 좋음
    const addToDo = async () => {
      if (text === "") {
        return;
      }
      const newToDos = { ...toDos, [Date.now()]: {text, working},}
      setToDos(newToDos);
      await saveToDos(newToDos)
      setText("");
    };
  ```

- ```js
    // 앱 로딩시 저장된 정보 가져옴
    useEffect(() => {
      loadToDos();
    },[])
    
      //저장된 정보를 가져오는 코드
    const loadToDos = async () => {
      try {
        const s = await AsyncStorage.getItem(STORAGE_KEY);
        setToDos(JSON.parse(s));
      } catch (e) {

      }
    };
  ```

- ```js
    //지울 때 사용되는 코드
    const deleteToDo = async (key) => {
      const newToDos = {...toDos}
      delete newToDos[key]
      setToDos(newToDos);
      await saveToDos(newToDos)
    }
    
    <View style={styles.toDo} key={key}>
      <Text style={styles.toDoText}>{toDos[key].text}</Text>
      <TouchableOpacity onPress={() => deleteToDo(key)}>
      <Text>x</Text>
      </TouchableOpacity>
    </View>
  ```

- Alert

- ```
  const deleteToDo = async (key) => {
      Alert.alert("Delete To Do?", "Are you sure?")
      return
  ```

- ```
  import { Alert, } from 'react-native';
  const deleteToDo = async (key) => {
  	//Alert이용  //대제목          //본문           //object안에 2개의 선택지 작성
      Alert.alert("Delete To Do?", "Are you sure?", [
      // Cancel이란 선택지
        {text:"Cancel"},
      // I'm Sure이란 선택지
      // I'm Sure 클릭시 onPress함수가 적용되고 이 함수는
        {text:"I'm Sure", onPress: async () => {
        // newToDos라는 함수에 기존toDos를 가져오고
          const newToDos = {...toDos}
        // x버튼 클릭시 가져온 key값을 토대로 지운 뒤,
          delete newToDos[key]
        // ToDos 저장해줌
          setToDos(newToDos);
        // AsyncStorage에도 저장!
          await saveToDos(newToDos)
        }}
      ])
      return
    }
  ```

- icon

- ```js
  import { Fontisto } from '@expo/vector-icons'

  //x 대신 아이콘을 이용
  <TouchableOpacity onPress={() => deleteToDo(key)}>
    <Fontisto name="trash" size={18} color={theme.gray} />
  </TouchableOpacity>
  ```



## Platform

- 어느 환경에서 개발 하고 있는지 알 수 있음

- ```js
  import {Platform} from "react-native"
  ```

- 모바일과 web화면을 나눔

- ```js
   //지울 때 사용되는 코드
    const deleteToDo = async (key) => {
      // web에서
      if (Platform.OS ==="web") {
        const ok = confirm("Do you want to delete this To Do?")
        if (ok) {
          const newToDos = {...toDos}
          delete newToDos[key]
          setToDos(newToDos);
          await saveToDos(newToDos)
        }
      } else {
        Alert.alert("Delete To Do?", "Are you sure?", [
          {text:"Cancel"},
          {text:"I'm Sure", onPress: async () => {
            const newToDos = {...toDos}
            delete newToDos[key]
            setToDos(newToDos);
            await saveToDos(newToDos)
          }}
        ])
      }
      return
    }
  ```





