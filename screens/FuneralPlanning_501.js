import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FuneralContext } from '../FuneralContext';
import { soups, sides, riceCakes } from '../menuItems'; // 필요한 데이터를 import 합니다.

const FuneralPlanning_501 = ({ navigation }) => {
  const { funeralStatus, setFuneralStatus, funeralMethod, funeralAttire, funeralFlower, funeralMenu, funeralItems, funeralCoffin, funeralShroud, ceremonyItems} = useContext(FuneralContext);

  const formatFuneralAttire = (attire) => {
    if (!attire) return '상복 선택되지 않음';
    
    let result = '상복 선택: ';
    let isSelected = false;

    Object.keys(attire.sizes).forEach(size => {
      if (attire.sizes[size].men > 0 || attire.sizes[size].women > 0) {
        isSelected = true;
        result += `${size} (남성: ${attire.sizes[size].men}, 여성: ${attire.sizes[size].women}), `;
      }
    });
    result += `완장: ${attire.extras.armband}, 머리핀: ${attire.extras.hairpin}`;
    return isSelected ? result : '상복 선택되지 않음';
  };

  const formatFuneralFlower = (flower) => {
    if (!flower) return '제단 꽃장식 선택되지 않음';
    return `${flower.name} - ${flower.price.toLocaleString()}원`;
  };

  const formatFuneralMenu = (menu) => {
    if (!menu) return '선택된 메뉴가 없습니다.';
    const getMenuDescription = (menuArray, index) => {
      if (index < 0 || index >= menuArray.length) return '잘못된 선택';
      return menuArray[index] ? menuArray[index].name : '잘못된 선택';
    };
    const soupDescription = menu.soup !== null ? `국류: ${getMenuDescription(soups, menu.soup)}` : '국류 선택되지 않음';
    const sidesDescription = menu.sides && menu.sides.length > 0 ? `반찬류: ${menu.sides.map(index => `${getMenuDescription(sides, index)}`).join(', ')}` : '반찬류 선택되지 않음';
    const riceCakeDescription = menu.riceCake !== null ? `떡류: ${getMenuDescription(riceCakes, menu.riceCake)}` : '떡류 선택되지 않음';
    return `${soupDescription}\n${sidesDescription}\n${riceCakeDescription}`;
  };

  const formatFuneralCoffin = (coffin) => {
    if (!coffin) return '관 설정되지 않음';
    return `${coffin.name}\n규격: ${coffin.size}\n재질: ${coffin.material}\n단가: ${coffin.price.toLocaleString()}원`;
  };

  const formatFuneralShroud = (shroud) => {
    if (!shroud) return '수의 설정되지 않음';
    let result = `${shroud.name}\n재질구성: ${shroud.material}\n원사 생산국: ${shroud.origin}\n원단 생산지: ${shroud.production}`;
    if (shroud.remarks) {
      result += `\n비고: ${shroud.remarks}`;
    }
    return result;
  };

  const formatCeremonyItems = (items) => {
    const itemNames = {
      mortuaryTablet: '명정',
      coffinCloth: '관보',
      outerCoffinCloth: '겉관보',
      ceremonialSilk: '예단',
      spiritTablet: '혼백',
      alcohol: '알코올',
      cotton: '탈지면',
      hanji: '한지',
      sushipo: '수시포',
      sushimat: '수시매트',
      sushipillow: '수시베게',
      headScarf: '두건',
      haengjeon: '행전',
      carRibbon: '차량리본',
      cottonGloves: '면장갑',
    };

    const selectedItems = Object.keys(items)
      .filter(item => items[item].selected)
      .map(item => itemNames[item]);

    return selectedItems.length === 0 ? '추가 영결식 준비물 선택되지 않음' : `영결식 준비물: ${selectedItems.join(', ')}`;
  };

 

  const handleNext = () => {
    setFuneralStatus('장례 준비 완료');
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mainTitle}>나의 장례</Text>

      <View style={[styles.section]}>

        <View style={[styles.subSection]}>
          <Text style={styles.sectionTitle}>상복</Text>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>{formatFuneralAttire(funeralAttire)}</Text>
          </View>
        </View>

        <View style={[styles.subSection]}>
          <Text style={styles.sectionTitle}>제단 꽃장식</Text>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>{formatFuneralFlower(funeralFlower)}</Text>
          </View>
        </View>

        <View style={[styles.subSection]}>
          <Text style={styles.sectionTitle}>식사메뉴</Text>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>{formatFuneralMenu(funeralMenu)}</Text>
          </View>
        </View>

        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FuneralPlanning_401')}
          >
            <Text style={styles.buttonText}>장례물품 수정하기</Text>
          </TouchableOpacity>
      </View>

      <View style={[styles.section]}>

        <View style={[styles.subSection]}>
          <Text style={styles.sectionTitle}>관</Text>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>{formatFuneralCoffin(funeralCoffin)}</Text>
          </View>
        </View>

        <View style={[styles.subSection]}>
          <Text style={styles.sectionTitle}>수의</Text>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>{formatFuneralShroud(funeralShroud)}</Text>
          </View>
        </View>

        <View style={[styles.subSection]}>
          <Text style={styles.sectionTitle}>추가 화장용품</Text>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>{formatCeremonyItems(ceremonyItems)}</Text>
          </View>
        </View>
        
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FuneralPlanning_801')}
          >
            <Text style={styles.buttonText}>화장물품 수정하기</Text>
          </TouchableOpacity>
      </View>


      

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#eee',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
    shadowOpacity: 0.25, // 그림자 불투명도
    shadowRadius: 3.84,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  subSection: {
    marginBottom: 5,
    padding: 7,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
  },
  itemLabel: {
    fontSize: 16,
    padding: 7,
  },
  button: {
    backgroundColor: '#999',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
    shadowOpacity: 0.25, // 그림자 불투명도
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#555',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FuneralPlanning_501;
