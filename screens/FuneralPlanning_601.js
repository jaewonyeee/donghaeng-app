import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { FuneralContext } from '../FuneralContext';

const GOOGLE_PLACES_API_KEY = 'AIzaSyACUZkyL92b1ywS8mnJ9D1-_xMK-Z4eQ0U'; // 여기에 발급받은 Google Places API 키를 입력하세요.

const generateTimeSlots = () => [
  { time: '6:50~8:30', availability: Math.floor(Math.random() * 10) },
  { time: '7:00~9:00', availability: Math.floor(Math.random() * 10) },
  { time: '8:00~10:00', availability: Math.floor(Math.random() * 10) },
  { time: '8:40~10:20', availability: Math.floor(Math.random() * 10) },
  { time: '9:00~11:00', availability: Math.floor(Math.random() * 10) },
  { time: '10:00~12:00', availability: Math.floor(Math.random() * 10) },
  { time: '10:30~12:10', availability: Math.floor(Math.random() * 10) },
  { time: '11:00~13:00', availability: Math.floor(Math.random() * 10) },
  { time: '12:00~14:00', availability: Math.floor(Math.random() * 10) },
  { time: '12:20~14:00', availability: Math.floor(Math.random() * 10) },
  { time: '13:00~15:00', availability: Math.floor(Math.random() * 10) },
  { time: '14:00~16:00', availability: Math.floor(Math.random() * 10) },
  { time: '14:10~15:50', availability: Math.floor(Math.random() * 10) },
  { time: '15:00~17:00', availability: Math.floor(Math.random() * 10) },
  { time: '16:00~17:40', availability: Math.floor(Math.random() * 10) },
  { time: '16:00~18:00', availability: Math.floor(Math.random() * 10) },
  { time: '17:00~19:00', availability: Math.floor(Math.random() * 10) },
  { time: '17:50~19:30', availability: Math.floor(Math.random() * 10) },
];

const findNearestCrematoriums = async (latitude, longitude) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=100000&type=funeral_home&key=${GOOGLE_PLACES_API_KEY}`
  );
  const result = await response.json();
  if (result.results.length === 0) {
    Alert.alert('근처에 화장장이 없습니다.');
    return null;
  }
  return result.results[0];
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const FuneralPlanning_601 = ({ navigation }) => {
  const { funeralMethod, setFuneralDetails, setFuneralStatus } = useContext(FuneralContext);
  const [date, setDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({ [formatDate(new Date())]: { selected: true, marked: true, selectedColor: 'blue' } });
  const [timeSlots, setTimeSlots] = useState(generateTimeSlots());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showTimeSlots, setShowTimeSlots] = useState(false); // 기본값을 false로 설정하여 접혀있도록 설정
  const [location, setLocation] = useState(null);
  const [nearestCrematorium, setNearestCrematorium] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('위치 액세스 권한이 필요합니다.');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      const nearest = await findNearestCrematoriums(loc.coords.latitude, loc.coords.longitude);
      if (nearest) {
        setNearestCrematorium({
          latitude: nearest.geometry.location.lat,
          longitude: nearest.geometry.location.lng,
          title: nearest.name,
          description: nearest.vicinity,
        });

        mapRef.current.animateToRegion({
          latitude: nearest.geometry.location.lat,
          longitude: nearest.geometry.location.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      }
    })();
  }, []);

  useEffect(() => {
    setTimeSlots(generateTimeSlots());
    setSelectedTimeSlot(null);
    setMarkedDates({ [formatDate(date)]: { selected: true, marked: true, selectedColor: '#999' } });
  }, [date]);

  const onDayPress = (day) => {
    const selectedDate = new Date(day.timestamp);
    setDate(selectedDate);
  };

  const handleTimeSlotSelection = (index) => {
    setSelectedTimeSlot(index);
  };

  const handleNext = () => {
    if (selectedTimeSlot !== null) {
      const formattedDate = formatDate(date);
      const formattedTime = timeSlots[selectedTimeSlot].time;

      if (nearestCrematorium) {
        setFuneralDetails({
          crematorium: nearestCrematorium.title,
          date: formattedDate,
          time: formattedTime,
        });
        setFuneralStatus('화장장 선정');
      }

      if (funeralMethod === '자연장') {
        navigation.navigate('FuneralPlanning_801');
      } else {
        navigation.navigate('FuneralPlanning_801');
      }
    } else {
      alert('시간을 선택해주세요.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>화장장 선정</Text>

      <View style={[styles.box, styles.mapBox]}>
        <Text style={styles.subtitle}>화장장 자동선정</Text>
        <View style={styles.mapContainer}>
          {location ? (
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsUserLocation={true}
            >
              {nearestCrematorium && (
                <Marker
                  coordinate={{
                    latitude: nearestCrematorium.latitude,
                    longitude: nearestCrematorium.longitude,
                  }}
                  title={nearestCrematorium.title}
                  description={nearestCrematorium.description}
                />
              )}
            </MapView>
          ) : (
            <Text style={styles.placeholderText}>가까운 화장장 자동선정중...</Text>
          )}
        </View>
        {nearestCrematorium && (
          <Text style={styles.crematoriumName}>선택된 화장장 : {nearestCrematorium.title}</Text>
        )}
      </View>

      <View style={[styles.box, styles.calendarBox]}>
        <Text style={styles.subtitle}>화장 날짜 선택</Text>
        
        <Calendar
          onDayPress={onDayPress}
          markedDates={markedDates}
          minDate={new Date().toISOString().split('T')[0]}
          maxDate={new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0]}
          style={styles.calendar}
          theme={{
            selectedDayBackgroundColor: 'blue',
            todayTextColor: 'red',
            arrowColor: '#000',
          }}
        />
        <Text style={styles.dateText}>선택한 날짜: {formatDate(date)}</Text>
      </View>

      <View style={[styles.box, styles.timeSlotBox]}>
        <Text style={styles.subtitle}>화장 시간 선택</Text>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowTimeSlots(!showTimeSlots)}
        >
          <Text style={styles.toggleButtonText}>
            {showTimeSlots ? '확인' : '시간 선택하기'}
          </Text>
        </TouchableOpacity>

        {showTimeSlots ? (
          <>
            {timeSlots.map((slot, index) => (
              <View key={index} style={styles.timeSlotContainer}>
                <Text style={styles.timeText}>{slot.time}</Text>
                <TouchableOpacity
                  style={[
                    styles.timeSlotButton,
                    slot.availability === 0 && styles.unavailable,
                    selectedTimeSlot === index && styles.selectedTimeSlot,
                  ]}
                  onPress={() => handleTimeSlotSelection(index)}
                  disabled={slot.availability === 0}
                >
                  <Text style={styles.buttonText}>
                    {slot.availability === 0 ? '예약 불가' : `예약 가능 (${slot.availability})`}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : (
          <View>
            {selectedTimeSlot !== null ? (
              <Text style={styles.dateText}>선택한 시간: {timeSlots[selectedTimeSlot].time}</Text>
            ) : (
              <Text style={styles.dateText}>  </Text>
            )}
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>뒤로가기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, selectedTimeSlot === null && styles.disabledButton]}
          onPress={handleNext}
          disabled={selectedTimeSlot === null}
        >
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#eeeeee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555555',
    textAlign: 'left',
    
    marginLeft: 5,
    padding: 5,
  },
  box: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  mapBox: {
    backgroundColor: 'white',
  },
  calendarBox: {
    backgroundColor: '#fff',
  },
  timeSlotBox: {
    backgroundColor: '#fff',
  },
  mapContainer: {
    height: 200,
    marginBottom: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 90,
    padding: 30,
  },
  crematoriumName: {
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
  },
  dateText: {
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
  },
  calendar: {
    marginBottom: 20,

  },
  toggleButton: {
    backgroundColor: '#e6e6e6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
    shadowOpacity: 0.25, // 그림자 불투명도
    shadowRadius: 3.84,
  },
  toggleButtonText: {
    color: '#222222',
    fontSize: 16,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  timeText: {
    fontSize: 16,
    flex: 1,
    padding: 10,
  },
  timeSlotButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#999999',
    borderRadius: 0,
  },
  unavailable: {
    backgroundColor: '#e6e6e6',
  },
  selectedTimeSlot: {
    backgroundColor: '#333333',
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
    shadowOpacity: 0.25, // 그림자 불투명도
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#999999',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#555555',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  selectedTimeContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedTimeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FuneralPlanning_601;
