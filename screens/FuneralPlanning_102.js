import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FuneralContext } from '../FuneralContext';
import { FontAwesome } from '@expo/vector-icons';

const images = [
  require('../assets/room/room1.png'),
  require('../assets/room/room2.png'),
  require('../assets/room/room3.png'),
  require('../assets/room/room4.png'),
  require('../assets/room/room5.png'),
  require('../assets/room/room6.png'),
];

const getRandomValueInRange = (min, max, step = 1) => {
  const range = Math.floor((max - min) / step);
  const randomValue = Math.floor(Math.random() * (range + 1)) * step + min;
  return randomValue;
};

const FuneralPlanning_102 = ({ navigation, route }) => {
  const { setFuneralStatus } = useContext(FuneralContext);
  const { averageCost, funeralHome } = route.params || {};
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const generateRooms = () => {
      let generatedRooms = [];
      const numRooms = 5;
      const baseCost = averageCost; 
      let totalCost = 0;

      for (let i = 0; i < numRooms; i++) {
        const size = getRandomValueInRange(60, 100, 1);
        const cost = baseCost + ((size - 80) * 100);
        const capacity = getRandomValueInRange(size - 5, size + 5, 1);
        const imageUri = images[Math.floor(Math.random() * images.length)];

        generatedRooms.push({
          size,
          cost,
          capacity,
          imageUri,
        });

        totalCost += cost;
      }

      const adjustmentFactor = baseCost * numRooms / totalCost;
      generatedRooms = generatedRooms.map(room => ({
        ...room,
        cost: Math.round(room.cost * adjustmentFactor)
      }));

      generatedRooms.sort((a, b) => a.cost - b.cost);

      return generatedRooms;
    };

    setRooms(generateRooms());
  }, [averageCost]);

  const handleSelectRoom = (index) => {
    setSelectedRoom(index);
  };

  const handleNext = () => {
    if (selectedRoom !== null) {
      setFuneralStatus('장례식장 선정');
      navigation.navigate('FuneralPlanning_401'); 
    } else {
      alert('빈소를 선택해 주세요.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>장례식장 내 빈소 설정{'\n'}</Text>
        <Text style={styles.subtitle}>
          <FontAwesome name="map-marker" size={17} color="#555555" /> 장례식장 : {funeralHome ? funeralHome.name : '장례식장 이름'}
        </Text>
      <View style={styles.roomsContainer}>
        {rooms.map((room, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.roomBox,
              selectedRoom === index && styles.selectedRoomBox,
            ]}
            onPress={() => handleSelectRoom(index)}
          >
            <Image source={room.imageUri} style={styles.image} />
            <Text style={styles.roomText}>{`크기: ${room.size}평`}</Text>
            <Text style={styles.roomText}>{`시간당 요금: ${room.cost.toLocaleString()}원`}</Text>
            <Text style={styles.roomText}>{`수용 인원: ${room.capacity}명`}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>뒤로가기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nextButton,
            { backgroundColor: selectedRoom !== null ? '#555555' : '#999999' },
          ]}
          onPress={handleNext}
          disabled={selectedRoom === null}
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
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 7,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'left',
    marginBottom: 10,
  },
  roomsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  roomBox: {
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedRoomBox: {
    backgroundColor: '#999999',
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
    shadowOpacity: 0.25, // 그림자 불투명도
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  roomText: {
    fontSize: 15,
    marginBottom: 5,
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
    backgroundColor: '#999999',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FuneralPlanning_102;
