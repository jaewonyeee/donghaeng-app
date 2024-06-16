import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { FuneralContext } from '../FuneralContext';
import Swiper from 'react-native-swiper';
import { soups, sides, riceCakes } from '../menuItems'; // 필요한 데이터를 import 합니다.

const flowerArrangements = [
  { name: '제단 꽃장식 7호', price: 550000, src: require('../assets/flower/flower1.png') },
  { name: '제단 꽃장식 6호', price: 800000, src: require('../assets/flower/flower2.png') },
  { name: '제단 꽃장식 5호', price: 950000, src: require('../assets/flower/flower3.png') },
  { name: '제단 꽃장식 4호', price: 1100000, src: require('../assets/flower/flower4.png') },
  { name: '제단 꽃장식 3호', price: 1350000, src: require('../assets/flower/flower5.png') },
  { name: '제단 꽃장식 2호', price: 1550000, src: require('../assets/flower/flower6.png') },
  { name: '제단 꽃장식 1호', price: 1850000, src: require('../assets/flower/flower7.png') },
  { name: '제단 꽃장식 특호', price: 2100000, src: require('../assets/flower/flower8.png') },
];

/*const soups = [
  { name: '우거지해장국', src: require('../assets/soups/1.png') },
  { name: '육개장', src: require('../assets/soups/2.png') },
  { name: '돈육김치찌개', src: require('../assets/soups/3.png') },
  { name: '소고기뭇국', src: require('../assets/soups/1.png') },
  { name: '북엇국', src: require('../assets/soups/2.png') },
];

const sides = [
  { name: '김치', src: require('../assets/sides/1.png') },
  { name: '모듬전', src: require('../assets/sides/2.png') },
  { name: '북어조림', src: require('..//assets/sides/3.png') },
  { name: '가오리회무침', src: require('../assets/sides/1.png') },
  { name: '멸치마늘쫑볶음', src: require('../assets/sides/2.png') },
  { name: '훈제삼겹수육', src: require('../assets/sides/3.png') },
  { name: '소불고기', src: require('../assets/sides/1.png') },
  { name: '제육볶음', src: require('../assets/sides/2.png') },
  { name: '진미채무침', src: require('../assets/sides/3.png') },
];

const riceCakes = [
  { name: '절편', src: require('../assets/ricecakes/1.png') },
  { name: '꿀떡', src: require('../assets/ricecakes/2.png') },
  { name: '송편', src: require('../assets/ricecakes/3.png') },
  { name: '콩찰떡', src: require('../assets/ricecakes/1.png') },
  { name: '인절미', src: require('../assets/ricecakes/2.png') },
  { name: '약식', src: require('../assets/ricecakes/3.png') },
];
*/

const FuneralPlanning_401 = ({ navigation }) => {
  const { setFuneralAttire } = useContext(FuneralContext);
  const [attireType, setAttireType] = useState('traditional');
  const [sizes, setSizes] = useState({
    XS: { men: 0, women: 0 },
    S: { men: 0, women: 0 },
    M: { men: 0, women: 0 },
    L: { men: 0, women: 0 },
    XL: { men: 0, women: 0 },
    XXL: { men: 0, women: 0 },
  });
  const [extras, setExtras] = useState({ armband: 0, hairpin: 0 });

  const updateCount = (item, gender, amount) => {
    setSizes((prevSizes) => ({
      ...prevSizes,
      [item]: {
        ...prevSizes[item],
        [gender]: Math.max(0, prevSizes[item][gender] + amount),
      },
    }));
  };

  const updateExtraCount = (item, amount) => {
    setExtras((prevExtras) => ({
      ...prevExtras,
      [item]: Math.max(0, prevExtras[item] + amount),
    }));
  };

  //꽃장식 선택
  const [selectedArrangement, setSelectedArrangement] = useState(flowerArrangements[0]);
  const { setFuneralFlower } = useContext(FuneralContext);

  const handleSelectArrangement = (index) => {
    setSelectedArrangement(flowerArrangements[index]);
  };

  //식사메뉴 선택

  const [selectedSoup, setSelectedSoup] = useState(soups[0]);
  const [selectedSides, setSelectedSides] = useState([sides[0], sides[1]]);
  const [selectedRiceCake, setSelectedRiceCake] = useState(riceCakes[0]);
  const { setFuneralMenu } = useContext(FuneralContext);

  const handleSelectSoup = (index) => {
    setSelectedSoup(soups[index]);
  };

  const handleSelectSide = (index) => {
    const selectedSide = sides[index];
    if (selectedSides.includes(selectedSide)) {
      setSelectedSides(selectedSides.filter(side => side !== selectedSide));
    } else if (selectedSides.length < 2) {
      setSelectedSides([...selectedSides, selectedSide]);
    }
  };

  const handleSelectRiceCake = (index) => {
    setSelectedRiceCake(riceCakes[index]);
  };

  useEffect(() => {
    // 초기 선택값 설정
    setSelectedSoup(soups[0]);
    setSelectedSides([sides[0], sides[1]]);
    setSelectedRiceCake(riceCakes[0]);
  }, []);

  const renderOptions = (options, selectedOption, onSelect) => (
    <View style={styles.optionsContainer}>
      {options.map((option, index) => (
        <TouchableOpacity key={index} style={[styles.optionButton, selectedOption.name === option.name && styles.selectedOption]} onPress={() => onSelect(index)}>
          <Image source={option.src} style={styles.optionImage} />
          <Text style={styles.optionText}>{option.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderMultipleOptions = (options, selectedOptions, onSelect) => (
    <View style={styles.optionsContainer}>
      {options.map((option, index) => (
        <TouchableOpacity key={index} style={[styles.optionButton, selectedOptions.includes(option) && styles.selectedOption]} onPress={() => onSelect(index)}>
          <Image source={option.src} style={styles.optionImage} />
          <Text style={styles.optionText}>{option.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );




  //다음페이지로
  const handleNext = () => {
    setFuneralAttire({ attireType, sizes, extras });
    setFuneralFlower(selectedArrangement);
    if (selectedSides.length === 2) {
      const selectedMenuIndices = {
        soup: soups.indexOf(selectedSoup),
        sides: selectedSides.map(side => sides.indexOf(side)),
        riceCake: riceCakes.indexOf(selectedRiceCake),
      };
      setFuneralMenu(selectedMenuIndices);
    }
    navigation.navigate('FuneralPlanning_601');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>장례식장 물품 선택</Text>

      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.subtitle}>상복 선택</Text>
          <View style={styles.attireTypeContainer}></View>
          <TouchableOpacity
            style={[styles.attireTypeButton,
            attireType === 'traditional' && styles.attireTypeButtonActive,
            ]}
            onPress={() => setAttireType('traditional')}
            >
            <Text style={styles.attireTypeText}>전통 상복</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.attireTypeButton,
            attireType === 'modern' && styles.attireTypeButtonActive,
            ]}
            onPress={() => setAttireType('modern')}
            >
            <Text style={styles.attireTypeText}>현대 상복</Text>
          </TouchableOpacity>
        </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCellHeader}><Text style={styles.tableHeaderText}>사이즈</Text></View>
          <View style={styles.separator}></View>
          <View style={styles.tableCellHeader}><Text style={styles.tableHeaderText}>남성</Text></View>
          <View style={styles.separator}></View>
          <View style={styles.tableCellHeader}><Text style={styles.tableHeaderText}>여성</Text></View>
        </View>
        {Object.keys(sizes).map((size) => (
          <View key={size} style={styles.tableRow}>
            <View style={styles.tableCell}><Text style={styles.tableText}>{size}</Text></View>
            <View style={styles.separator}></View>
            <View style={[
              styles.tableCell,
              (sizes[size].men > 0) && styles.activeSizeCell
            ]}>
              <TouchableOpacity
                style={styles.sizeButton}
                onPress={() => updateCount(size, 'men', -1)}
              >
                <Text style={styles.sizeButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.sizeCount}>{sizes[size].men}</Text>
              <TouchableOpacity
                style={styles.sizeButton}
                onPress={() => updateCount(size, 'men', 1)}
              >
                <Text style={styles.sizeButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator}></View>
            <View style={[
              styles.tableCell,
              (sizes[size].women > 0) && styles.activeSizeCell
            ]}>
              <TouchableOpacity
                style={styles.sizeButton}
                onPress={() => updateCount(size, 'women', -1)}
              >
                <Text style={styles.sizeButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.sizeCount}>{sizes[size].women}</Text>
              <TouchableOpacity
                style={styles.sizeButton}
                onPress={() => updateCount(size, 'women', 1)}
              >
                <Text style={styles.sizeButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.subtitle}>추가 항목</Text>
      <View style={styles.table2Row}>
        <View style={styles.tableCell}><Text style={styles.tableText}>완장</Text></View>
        <View style={[
          styles.tableCell,
          extras.armband > 0 && styles.activeSizeCell
        ]}>
          <TouchableOpacity
            style={styles.sizeButton}
            onPress={() => updateExtraCount('armband', -1)}
          >
            <Text style={styles.sizeButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.sizeCount}>{extras.armband}</Text>
          <TouchableOpacity
            style={styles.sizeButton}
            onPress={() => updateExtraCount('armband', 1)}
          >
            <Text style={styles.sizeButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tableCell}><Text style={styles.tableText}>머리핀</Text></View>
        <View style={[
          styles.tableCell,
          extras.hairpin > 0 && styles.activeSizeCell
        ]}>
          <TouchableOpacity
            style={styles.sizeButton}
            onPress={() => updateExtraCount('hairpin', -1)}
          >
            <Text style={styles.sizeButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.sizeCount}>{extras.hairpin}</Text>
          <TouchableOpacity
            style={styles.sizeButton}
            onPress={() => updateExtraCount('hairpin', 1)}
          >
            <Text style={styles.sizeButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.subtitle}>제단 꽃장식 선택</Text>
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
      </View>

      <View style={styles.box}>
        <Text style={styles.subtitle}>식사 선택</Text>
        <View style={[styles.section]}>
          <Text style={styles.subtitle}>국류 (택1)</Text>
        </View>
        {renderOptions(soups, selectedSoup, handleSelectSoup)}

        <View style={[styles.section]}>
          <Text style={styles.subtitle}>반찬류 (택2)</Text>
        </View>
        {renderMultipleOptions(sides, selectedSides, handleSelectSide)}

        <View style={[styles.section]}>
         <Text style={styles.subtitle}>떡류 (택1)</Text>
        </View>
        {renderOptions(riceCakes, selectedRiceCake, handleSelectRiceCake)}
        <Text style={styles.infoText}>식사 비용과 일회용품 사용에 따른 비용은 후불로 진행됩니다.</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>뒤로가기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>다음</Text>
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
  row : {
    flexDirection: 'row',
    marginBottom: 10,
  },
  attireTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 50,
  },
  attireTypeButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  attireTypeButtonActive: {
    backgroundColor: '#555',
  },
  attireTypeText: {
    color: 'white',
    fontSize: 16,
  },
  attireImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  tableHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableText: {
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  table2Row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingRight: 15,
  },
  tableCell: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tableCellHeader: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: 1,
    backgroundColor: '#ccc',
  },
  sizeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 1,
  },
  sizeButtonText: {
    fontSize: 16,
  },
  sizeCount: {
    width: 30,
    textAlign: 'center',
  },
  activeSizeCell: {
    backgroundColor: '#eee',
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
    alignItems: 'center',
    marginBottom: 20,
  },
  imageLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
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



  section: {
    padding: 5,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#e6e6e6'
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  optionButton: {
    width: 100,
    margin: 5,
    padding: 5,
    borderWidth: 1.5,
    borderColor: '#eee',
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#ccc',
  },
  optionImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  optionText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },



  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#999',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#555',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FuneralPlanning_401;
