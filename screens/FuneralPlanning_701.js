import React, { useState, useRef, useContext } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, TextInput, StyleSheet, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { FuneralContext } from '../FuneralContext';

const GOOGLE_PLACES_API_KEY = 'AIzaSyACUZkyL92b1ywS8mnJ9D1-_xMK-Z4eQ0U'; // 여기에 발급받은 Google Places API 키를 입력하세요.

function FuneralPlanning_701({ navigation }) {
  const { setFuneralStatus } = useContext(FuneralContext);
  const [location, setLocation] = useState(null);
  const [inputText, setInputText] = useState('');
  const [contactInfoVisible, setContactInfoVisible] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: '010-0000-0000',
    kakao: '카카오톡',
  });
  const mapRef = useRef(null);
  const { setCemeteryLoc } = useContext(FuneralContext);

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleInputSubmit = async () => {
    if (!inputText) return;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${inputText}&inputtype=textquery&fields=geometry,name,formatted_address,type&key=${GOOGLE_PLACES_API_KEY}`
    );
    const result = await response.json();

    if (result.candidates.length > 0) {
      const place = result.candidates[0];
      if (place.types.includes("cemetery")) {
        const locationDetails = place.geometry.location;

        setLocation({
          latitude: locationDetails.lat,
          longitude: locationDetails.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        mapRef.current.animateToRegion({
          latitude: locationDetails.lat,
          longitude: locationDetails.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);

        setContactInfoVisible(true);
        setCemeteryLoc({ cemetery: place.name, address: place.formatted_address });
      } else {
        Alert.alert("묘지가 아닙니다. 다시 입력해 주세요.");
        setContactInfoVisible(false);
      }
    } else {
      Alert.alert("묘지가 아닙니다. 다시 입력해 주세요.");
      setContactInfoVisible(false);
    }
  };

  const handleKakaoPress = () => {
    const kakaoUrl = 'kakaotalk://msg'; // 카카오톡 메시지 보내기 URL
    Linking.canOpenURL(kakaoUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(kakaoUrl);
        } else {
          Alert.alert('카카오톡이 설치되어 있지 않습니다.');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  const handleNext = () => {
    setFuneralStatus('묘지 위치 입력함');
    navigation.navigate('FuneralPlanning_801');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>묘지 위치 검색</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="묘지 위치 입력"
            value={inputText}
            onChangeText={handleInputChange}
          />
          <TouchableOpacity style={styles.inputButton} onPress={handleInputSubmit}>
            <Text style={styles.inputButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mapContainer}>
          {location ? (
            <MapView
              ref={mapRef}
              style={styles.map}
              region={location}
              showsUserLocation={true}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title={location.name}
                description={location.address}
              />
            </MapView>
          ) : (
            <Text style={styles.placeholderText}>위치를 확인하려면 버튼을 누르세요.</Text>
          )}
        </View>
        {contactInfoVisible && (
          <View style={styles.contactInfoContainer}>
            <Text style={styles.contactInfoText}>전화번호: {contactInfo.phone}</Text>
            <TouchableOpacity onPress={handleKakaoPress}>
              <Text style={styles.kakaoButton}>{contactInfo.kakao}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>뒤로가기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  inputButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputButtonText: {
    color: 'white',
    fontSize: 16,
  },
  mapContainer: {
    height: 300,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 16,
  },
  contactInfoContainer: {
    marginTop: 20,
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
  },
  contactInfoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  kakaoButton: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    backgroundColor: 'gray',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FuneralPlanning_701;
