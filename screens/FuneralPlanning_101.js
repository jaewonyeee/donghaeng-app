import React, { useState, useRef, useContext } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import RNPickerSelect from 'react-native-picker-select';
import { FuneralContext } from '../FuneralContext';
import { FontAwesome } from '@expo/vector-icons'; // 아이콘을 사용하기 위한 패키지

const GOOGLE_PLACES_API_KEY = 'AIzaSyACUZkyL92b1ywS8mnJ9D1-_xMK-Z4eQ0U'; // 여기에 발급받은 Google Places API 키를 입력하세요.

const haversineDistance = (coords1, coords2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const lat1 = coords1.latitude;
  const lon1 = coords1.longitude;
  const lat2 = coords2.latitude;
  const lon2 = coords2.longitude;

  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

const getRandomCost = () => {
  const min = 19000;
  const max = 45000;
  const step = 1000;
  const randomCost = Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;
  return randomCost;
};

function FuneralPlanning_101({ navigation }) {
  const [location, setLocation] = useState(null);
  const [funeralHomes, setFuneralHomes] = useState([]);
  const [selectedFuneralHome, setSelectedFuneralHome] = useState('');
  const [address, setAddress] = useState('');
  const [inputText, setInputText] = useState('');
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [isAutoSelectDisabled, setIsAutoSelectDisabled] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [cost, setCost] = useState(0);
  const mapRef = useRef(null);
  const { setFuneralStatus, setFuneralHome } = useContext(FuneralContext);


  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    mapRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 1000);

    await fetchFuneralHomes(location.coords.latitude, location.coords.longitude);
    setIsSearchPerformed(true);
  };

  const fetchFuneralHomes = async (latitude, longitude) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=funeral_home&key=${GOOGLE_PLACES_API_KEY}`
    );
    const result = await response.json();
    const sortedHomes = result.results.map(home => {
      const distance = haversineDistance(
        { latitude, longitude },
        { latitude: home.geometry.location.lat, longitude: home.geometry.location.lng }
      );
      return {
        ...home,
        distance
      };
    }).sort((a, b) => a.distance - b.distance);

    setFuneralHomes(sortedHomes);
  };

  const handleFuneralHomeSelection = (value) => {
    setSelectedFuneralHome(value);
    if (value) {
      setCost(getRandomCost());
    } else {
      setCost(0);
    }
    const selectedHome = funeralHomes.find(home => home.place_id === value);
    if (selectedHome) {
      setAddress(`${(selectedHome.distance * 1000).toFixed(0)}m ${selectedHome.name} - ${selectedHome.vicinity}`);
      mapRef.current.animateToRegion({
        latitude: selectedHome.geometry.location.lat,
        longitude: selectedHome.geometry.location.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  const selectNearestFuneralHome = () => {
    if (funeralHomes.length > 0) {
      const nearestHome = funeralHomes[0];
      handleFuneralHomeSelection(nearestHome.place_id);
      setIsInputDisabled(true);
    }
  };

  const handleNext = () => {
    if (selectedFuneralHome) {
      const selectedHome = funeralHomes.find(home => home.place_id === selectedFuneralHome);
      setFuneralHome(selectedHome);
      navigation.navigate('FuneralPlanning_102', {
        averageCost: cost, // 전달할 평균 금액
        funeralHome: selectedHome
      });
    } else {
      alert('장례식장을 선택해 주세요.');
    }
  };

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleInputSubmit = async () => {
    if (!location) {
      Alert.alert('현재 위치를 확인할 수 없습니다.');
      return;
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputText}&types=establishment&key=${GOOGLE_PLACES_API_KEY}`
    );
    const result = await response.json();
    if (result.predictions.length > 0) {
      const placeId = result.predictions[0].place_id;
      const placeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_PLACES_API_KEY}`
      );
      const placeResult = await placeResponse.json();
      const locationDetails = placeResult.result.geometry.location;

      const distance = haversineDistance(
        { latitude: location.latitude, longitude: location.longitude },
        { latitude: locationDetails.lat, longitude: locationDetails.lng }
      );

      const newHome = {
        place_id: placeId,
        name: placeResult.result.name,
        vicinity: placeResult.result.vicinity,
        geometry: { location: locationDetails },
        distance
      };

      setFuneralHomes([newHome, ...funeralHomes]);
      handleFuneralHomeSelection(placeId);
      mapRef.current.animateToRegion({
        latitude: locationDetails.lat,
        longitude: locationDetails.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);

      setIsAutoSelectDisabled(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.nameContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={40} color="#c6c6c6" />
        </TouchableOpacity>
        <Text style={styles.title}>장례식장 설정</Text>
      </View>

      
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, (!isSearchPerformed || isInputDisabled) && styles.disabledInput]}
          placeholder="장례식장 이름, 위치 등 직접 입력"
          value={inputText}
          onChangeText={handleInputChange}
          editable={isSearchPerformed && !isInputDisabled}
        />
        <TouchableOpacity
          style={[styles.inputButton, (isSearchPerformed && !isInputDisabled) ? styles.enabledButton : styles.disabledButton]}
          onPress={handleInputSubmit}
          disabled={!isSearchPerformed || isInputDisabled}
        >
          <Text style={styles.inputButtonText}>검색</Text>
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
            {funeralHomes.map((home, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: home.geometry.location.lat,
                  longitude: home.geometry.location.lng,
                }}
                title={home.name}
                description={home.vicinity}
              />
            ))}
          </MapView>
        ) : (
          <Text style={styles.placeholderText} >
            <FontAwesome name="map" size={90} color="#dfdfdf" style={styles.iconWithShadow} onPress={getLocation} /> {"\n"}
            {"\n"}{"\n"}아이콘을 클릭 후 지도를 불러오세요. {"\n"}지도에서 가까운 장례식장을 확인해보세요.
            </Text>
        )}
      </View>

    

      <TouchableOpacity
        style={[styles.button, (isSearchPerformed && !isAutoSelectDisabled) ? styles.enabledButton : styles.disabledButton]}
        onPress={selectNearestFuneralHome}
        disabled={!isSearchPerformed || isInputDisabled}>
        <Text style={styles.buttonText}>가까운 장례식장 자동선정</Text>
      </TouchableOpacity>
      
      <View style={styles.infoContainer}>
      <RNPickerSelect
        onValueChange={(value) => handleFuneralHomeSelection(value)}
        items={funeralHomes.map(home => ({
          label: `${(home.distance * 1000).toFixed(0)}m ${home.name}`,
          value: home.place_id
        }))}
        placeholder={{ label: '선택된 장례식장 세부정보', value: null }}
        value={selectedFuneralHome}
      />
      {selectedFuneralHome && (
        
        <Text style={styles.addressText}>{'\n'}{address}{'\n'}{'\n'}시간당 요금: {selectedFuneralHome ? `${cost.toLocaleString()}원` : '0,000원'}</Text>
       
      )}
       </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: selectedFuneralHome ? '#555555' : '#e6e6e6' }]}
          onPress={handleNext}
          disabled={!selectedFuneralHome}
        >
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#eeeeee',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 115,
  },
  backButton: {
    backgroundColor: 'f8f8f8',
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  mapContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
    shadowOpacity: 0.25, // 그림자 불투명도
    shadowRadius: 3.84,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  iconWithShadow: {
    textShadowColor: 'gray',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'left',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#e6e6e6',
  },
  enabledButton: {
    backgroundColor: '#999999',
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
    shadowOpacity: 0.25, // 그림자 불투명도
    shadowRadius: 3.84,
  },
  
  placeholderText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
  },
  addressText: {
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  nextButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
  },
  
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
  },
  inputButton: {
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputButtonText: {
    color: 'white',
    fontSize: 16,
  },
  infoContainer: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  costText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default FuneralPlanning_101;
