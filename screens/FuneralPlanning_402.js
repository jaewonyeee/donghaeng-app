import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { FuneralContext } from '../FuneralContext';

const flowerArrangements = [
  { name: '제단 꽃장식 7호', price: 550000, src: require('../assets/1.png') },
  { name: '제단 꽃장식 6호', price: 800000, src: require('../assets/2.png') },
  { name: '제단 꽃장식 5호', price: 950000, src: require('../assets/3.png') },
  { name: '제단 꽃장식 4호', price: 1100000, src: require('../assets/1.png') },
  { name: '제단 꽃장식 3호', price: 1350000, src: require('../assets/2.png') },
  { name: '제단 꽃장식 2호', price: 1550000, src: require('../assets/3.png') },
  { name: '제단 꽃장식 1호', price: 1850000, src: require('../assets/1.png') },
  { name: '제단 꽃장식 특호', price: 2100000, src: require('../assets/2.png') },
];

const FuneralPlanning_402 = ({ navigation }) => {
  const [selectedArrangement, setSelectedArrangement] = useState(flowerArrangements[0]);
  const { setFuneralFlower } = useContext(FuneralContext);

  const handleSelectArrangement = (index) => {
    setSelectedArrangement(flowerArrangements[index]);
  };

  const handleNext = () => {
    setFuneralFlower(selectedArrangement);
    navigation.navigate('FuneralPlanning_403');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>제단 꽃장식 선택</Text>
      <View style={styles.swiperContainer}>
        <Swiper
          style={styles.wrapper}
          showsButtons
          loop={false}
          onIndexChanged={handleSelectArrangement}
          nextButton={<Text style={styles.arrowButton}>›</Text>}
          prevButton={<Text style={styles.arrowButton}>‹</Text>}
          dot={<View style={styles.hiddenDot} />}
          activeDot={<View style={styles.hiddenDot} />}
        >
          {flowerArrangements.map((arrangement, index) => (
            <View key={index} style={styles.slide}>
              <Image source={arrangement.src} style={styles.image} />
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.imageLabel}>{selectedArrangement.name}</Text>
        <Text style={styles.imageLabel}>{`${selectedArrangement.price.toLocaleString()}원`}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Image source={require('../assets/icon.png')} style={styles.icon} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>뒤로가기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  swiperContainer: {
    height: 250, // 스와이프 컨테이너의 높이를 늘려서 상단에 더 가까이 배치합니다.
    marginBottom: 10, // 아래 여유 공간을 추가하여 버튼과의 간격을 유지합니다.
  },
  wrapper: {
    height: '100%',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
  descriptionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
    marginTop: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  arrowButton: {
    color: 'gray',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 5,
    width: 10,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  hiddenDot: {
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    flex: 1,
    backgroundColor: 'gray',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  nextButton: {
    flex: 1,
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FuneralPlanning_402;
