import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { shrouds } from '../shrouds'; // 경로를 맞춰주세요
import { FuneralContext } from '../FuneralContext';

const FuneralPlanning_802 = ({ navigation }) => {
  const { funeralShroud, setFuneralShroud, setFuneralStatus } = useContext(FuneralContext);

  const [selectedShroudState, setSelectedShroudState] = useState(funeralShroud || shrouds[0]);

  useEffect(() => {
    if (funeralShroud) {
      setSelectedShroudState(funeralShroud);
    }
  }, [funeralShroud]);

  const handleSelectShroud = (index) => {
    setSelectedShroudState(shrouds[index]);
  };

  const handleNext = () => {
    setFuneralStatus('수의 선택');
    setFuneralShroud(selectedShroudState);
    navigation.navigate('FuneralPlanning_803');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>수의 선택</Text>
      <View style={styles.swiperContainer}>
        <Swiper
          style={styles.wrapper}
          showsButtons
          loop={false}
          onIndexChanged={handleSelectShroud}
          nextButton={<Text style={styles.arrowButton}>›</Text>}
          prevButton={<Text style={styles.arrowButton}>‹</Text>}
          dot={<View style={styles.hiddenDot} />}
          activeDot={<View style={styles.hiddenDot} />}
        >
          {shrouds.map((shroud, index) => (
            <View key={index} style={styles.slide}>
              <Image source={shroud.src} style={styles.image} />
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.descriptionContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>상품명</Text>
          <View style={styles.line} />
          <Text style={styles.label}>재질구성</Text>
          <View style={styles.line} />
          <Text style={styles.label}>원사 생산국</Text>
          <View style={styles.line} />
          <Text style={styles.label}>원단 생산지</Text>
          <View style={styles.line} />
          <Text style={styles.label}>비고</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{selectedShroudState.name}</Text>
          <View style={styles.line} />
          <Text style={styles.info}>{selectedShroudState.material}</Text>
          <View style={styles.line} />
          <Text style={styles.info}>{selectedShroudState.origin}</Text>
          <View style={styles.line} />
          <Text style={styles.info}>{selectedShroudState.production}</Text>
          <View style={styles.line} />
          <Text style={styles.info}>{selectedShroudState.remarks}</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Image source={require('../assets/funeralMethod.jpg')} style={styles.icon} />
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
    height: 250,
    marginBottom: 10,
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
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  labelContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  infoContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 5,
  },
  info: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    height: 200,
  },
  icon: {
    width: '100%',
    height: '100%',
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

export default FuneralPlanning_802;
