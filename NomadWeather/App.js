
import * as Location from 'expo-location'
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import {Ionicons} from '@expo/vector-icons'
const {width: SCREEN_WIDTH} = Dimensions.get("window")
const API_KEY ="8b9236c1669836b0361ec4d1effc4c4a"
export default function App() {
  const [city,setCity] = useState("Loading...")
  const [ok, setOk] = useState(true)
  const [days, setDays] = useState([])

  const getWeather = async() => {
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
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}`)
    // const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${API_key}`)
    const json = await response.json()
    console.log(json)
  }
  useEffect(() => {
    getWeather()
  },[])
  return (
    < View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
       pagingEnabled 
       horizontal 
       showsHorizontalScrollIndicator={false}
       contentContainerStyle={styles.weather}>

        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
          <Ionicons name="md-checkmark-circle" size={32} color="green"></Ionicons>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
      <StatusBar style="light"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor:"tomato"
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    fontSize:68,
    fontWeight:"500"
  },
  weather: {
  },
  day: {
    width:SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    marginTop:-30,
    fontSize:60,
  }

})

