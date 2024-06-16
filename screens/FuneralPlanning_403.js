import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FuneralContext } from '../FuneralContext';

import { soups, sides, riceCakes } from '../menuItems'; // 필요한 데이터를 import 합니다.
/*
const soups = [
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
const FuneralPlanning_403 = ({ navigation }) => {
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

  const handleNext = () => {
    if (selectedSides.length === 2) {
      const selectedMenuIndices = {
        soup: soups.indexOf(selectedSoup),
        sides: selectedSides.map(side => sides.indexOf(side)),
        riceCake: riceCakes.indexOf(selectedRiceCake),
      };
      setFuneralMenu(selectedMenuIndices);
      navigation.navigate('FuneralPlanning_404');
    }
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mainTitle}>식사 메뉴 선택</Text>

      <View style={[styles.section, styles.soupSection]}>
        <Text style={styles.title}>국류 (택1)</Text>
      </View>
      {renderOptions(soups, selectedSoup, handleSelectSoup)}

      <View style={[styles.section, styles.sideSection]}>
        <Text style={styles.title}>반찬류 (택2)</Text>
      </View>
      {renderMultipleOptions(sides, selectedSides, handleSelectSide)}

      <View style={[styles.section, styles.riceCakeSection]}>
        <Text style={styles.title}>떡류 (택1)</Text>
      </View>
      {renderOptions(riceCakes, selectedRiceCake, handleSelectRiceCake)}

      <Text style={styles.infoText}>식사 비용과 일회용품 사용에 따른 비용은 후불로 진행됩니다. 식사비용은 50인분당 0000원이며 일회용품은 100인분당 0000원입니다.</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>뒤로가기</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.nextButton, selectedSides.length !== 2 && styles.disabledButton]} 
          onPress={handleNext}
          disabled={selectedSides.length !== 2}
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
    backgroundColor: 'white',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  soupSection: {
    backgroundColor: '#FDE68A',
  },
  sideSection: {
    backgroundColor: '#A7F3D0',
  },
  riceCakeSection: {
    backgroundColor: '#BFDBFE',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
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
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: 'blue',
  },
  optionImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  optionText: {
    marginTop: 10,
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
  disabledButton: {
    backgroundColor: 'gray',
  },
  infoText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default FuneralPlanning_403;
