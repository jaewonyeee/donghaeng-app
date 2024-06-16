import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import Swiper from 'react-native-swiper';
import { coffins } from '../coffins'; // 경로를 맞춰주세요
import { shrouds } from '../shrouds'; // 경로를 맞춰주세요
import { FuneralContext } from '../FuneralContext';

//추가 화장용품
const itemsList = [
  { name: '명정', price: 1000, key: 'mortuaryTablet' },
  { name: '관보', price: 2000, key: 'coffinCloth' },
  { name: '겉관보', price: 3000, key: 'outerCoffinCloth' },
  { name: '예단', price: 4000, key: 'ceremonialSilk' },
  { name: '혼백', price: 5000, key: 'spiritTablet' },
  { name: '알코올', price: 6000, key: 'alcohol' },
  { name: '탈지면', price: 7000, key: 'cotton' },
  { name: '한지', price: 8000, key: 'hanji' },
  { name: '수시포', price: 9000, key: 'sushipo' },
  { name: '수시매트', price: 10000, key: 'sushimat' },
  { name: '수시베게', price: 11000, key: 'sushipillow' },
  { name: '두건', price: 12000, key: 'headScarf' },
  { name: '행전', price: 13000, key: 'haengjeon' },
  { name: '차량리본', price: 14000, key: 'carRibbon' },
  { name: '면장갑', price: 15000, key: 'cottonGloves' },
];


const FuneralPlanning_801 = ({ navigation }) => {
  const { selectedCoffin, setFuneralCoffin, funeralShroud, setFuneralShroud, ceremonyItems, setCeremonyItems, setFuneralStatus } = useContext(FuneralContext);
  const [selectedCoffinState, setSelectedCoffinState] = useState(selectedCoffin || coffins[0]);

  useEffect(() => {
    if (selectedCoffin) {
      setSelectedCoffinState(selectedCoffin);
    }
  }, [selectedCoffin]);

  const handleSelectCoffin = (index) => {
    setSelectedCoffinState(coffins[index]);
  };

  //수의 선택
  const [selectedShroudState, setSelectedShroudState] = useState(funeralShroud || shrouds[0]);

  useEffect(() => {
    if (funeralShroud) {
      setSelectedShroudState(funeralShroud);
    }
  }, [funeralShroud]);

  const handleSelectShroud = (index) => {
    setSelectedShroudState(shrouds[index]);
  };


  //추가용품선택

  const [items, setItems] = useState(ceremonyItems);

  const toggleSwitch = (key) => {
    const newItems = { ...items, [key]: { ...items[key], selected: !items[key].selected } };
    setItems(newItems);
    setCeremonyItems(newItems);
  };

  //다음페이지에 저장할 것
  const handleNext = () => {
    setFuneralShroud(selectedShroudState);
    setFuneralCoffin(selectedCoffinState);
    setFuneralStatus('영결식 준비물 선택');
    navigation.navigate('FuneralPlanning_201');
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>화장물품 선택</Text>
      <View style={styles.box}>
        <Text style={styles.subtitle}>관 선택</Text>
        <View style={styles.swiperContainer}>
          <Swiper
            style={styles.wrapper}
            showsButtons
            loop={false}
            onIndexChanged={handleSelectCoffin}
            nextButton={<Text style={styles.arrowButton}>›</Text>}
            prevButton={<Text style={styles.arrowButton}>‹</Text>}
            dot={<View style={styles.hiddenDot} />}
            activeDot={<View style={styles.hiddenDot} />}
          >
            {coffins.map((coffin, index) => (
            <View key={index} style={styles.slide}>
              <Image source={coffin.src} style={styles.image} />
            </View>
            ))}
          </Swiper>
        </View>
        <View style={styles.descriptionContainer}>

          <View style={styles.infoContainer}>
            <Text style={styles.info}>품명: {selectedCoffinState.name}</Text>
            <Text style={styles.info}>규격: {selectedCoffinState.size}</Text>
            <Text style={styles.info}>재질: {selectedCoffinState.material}</Text>
            <Text style={styles.info}>단가: {`${selectedCoffinState.price.toLocaleString()}원`}</Text>
          </View>
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.subtitle}>수의 선택</Text>
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
        <View style={styles.infoContainer}>
          <Text style={styles.info}>상품명: {selectedShroudState.name}</Text>
          <Text style={styles.info}>재질구성: {selectedShroudState.material}</Text>
          <Text style={styles.info}>원사 생산지: {selectedShroudState.origin}</Text>
          <Text style={styles.info}>원단 생산지: {selectedShroudState.production}</Text>
          <Text style={styles.info}>비고: {selectedShroudState.remarks}</Text>
        </View>
      </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.subtitle}>추가 화장용품 선택</Text>
        <View style={styles.box}>
        {itemsList.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemLabel}>{item.name} - {item.price.toLocaleString()}원</Text>
          <Switch
            value={items[item.key]?.selected || false}
            onValueChange={() => toggleSwitch(item.key)}
          />
        </View>
        ))}
      </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>뒤로가기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  box: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
    backgroundColor: 'white',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    padding: 10,
  },



  swiperContainer: {
    height: 230, // 스와이프 컨테이너의 높이를 늘려서 상단에 더 가까이 배치합니다.
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
    height: 200,
    resizeMode: 'contain',
  },

  descriptionContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },

  info: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
    
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 5,
  },
  arrowButton: {
    color: 'gray',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 5,
    width: 30,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  hiddenDot: {
    backgroundColor: 'transparent',
  },



  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemLabel: {
    fontSize: 17,
    marginLeft: 10,
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
    backgroundColor: '#555',
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

export default FuneralPlanning_801;
