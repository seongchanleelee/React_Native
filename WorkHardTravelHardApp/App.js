import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { theme } from './color';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from '@expo/vector-icons'

STORAGE_KEY = "@toDos"

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});


  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);

  // 앱 로딩시 저장된 정보 가져옴
  useEffect(() => {
    loadToDos();
  },[])

  //localstorage에 저장
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };

  //저장된 정보를 가져오는 코드
  const loadToDos = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY);
      if (s) {
        setToDos(JSON.parse(s));
      }
    } catch (e) {

    }
  };


  //추가 시 사용되는 코드
  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = { ...toDos, [Date.now()]: {text, working},}
    setToDos(newToDos);
    await saveToDos(newToDos)
    setText("");
  };

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={work}>
        <Text style={{...styles.btnText, color: working ? "white": theme.gray}}>Work</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={travel}>
        <Text style={{...styles.btnText, color: !working ? "white":theme.gray }}>Travel</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <TextInput returnKeyType='done' onSubmitEditing={addToDo} onChangeText={onChangeText} value={text} placeholderTextColor="red" placeholder={working ? "Add a To Do" : "Where do you want to go?"} style={styles.input} />
        <ScrollView>{Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
              <Fontisto name="trash" size={18} color={theme.gray} />
              </TouchableOpacity>
            </View>
          ) : null
        )}</ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection:"row",
    marginTop:100,
  },
  body: {
    flex: 5,
  },
  btnText : {
    fontSize:38,
    fontWeight:"600",
    color: "white",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection:"row",
    alignItems: "center",
    justifyContent:"space-between"
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  }
});
