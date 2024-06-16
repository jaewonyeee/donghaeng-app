import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FuneralContext } from '../FuneralContext';
import { soups, sides, riceCakes } from '../menuItems'; // 필요한 데이터를 import 합니다.
import { coffins } from '../coffins'; 

const formatFuneralAttire = (attire) => {
  if (!attire) return '상복: 선택없음';
  let result = `상복 선택: ${attire.attireType === 'traditional' ? '전통 상복' : '현대 상복'}\n`;
  Object.keys(attire.sizes).forEach(size => {
    if (attire.sizes[size].men > 0 || attire.sizes[size].women > 0) {
      result += `${size} (남성: ${attire.sizes[size].men}, 여성: ${attire.sizes[size].women}), `;
    }
  });
  result += `완장: ${attire.extras.armband}, 머리핀: ${attire.extras.hairpin}`;
  return result;
};

const formatFuneralFlower = (flower) => {
  if (!flower) return '제단 꽃장식: 선택없음';
  return `제단 꽃장식: ${flower.name} - ${flower.price.toLocaleString()}원`;
};

const formatFuneralMenu = (menu) => {
  if (!menu) return '선택된 메뉴가 없습니다.';

  const getMenuDescription = (menuArray, index) => {
    if (index < 0 || index >= menuArray.length) return '잘못된 선택';
    return menuArray[index] ? menuArray[index].name : '잘못된 선택';
  };

  const soupDescription = menu.soup !== null ? `국류: ${menu.soup + 1}번 - ${getMenuDescription(soups, menu.soup)}` : '국류: 선택없음';
  const sidesDescription = menu.sides && menu.sides.length > 0 ? `반찬류: ${menu.sides.map(index => `${index + 1}번 - ${getMenuDescription(sides, index)}`).join(', ')}` : '반찬류: 선택되지 않음';
  const riceCakeDescription = menu.riceCake !== null ? `떡류: ${menu.riceCake + 1}번 - ${getMenuDescription(riceCakes, menu.riceCake)}` : '떡류: 선택없음';

  return `${soupDescription}\n${sidesDescription}\n${riceCakeDescription}`;
};

const formatFuneralItems = (items) => {
  const itemNames = {
    tablet: '위패',
    incense: '향',
    condolenceBook: '조위록',
    candle: '양초',
    incenseStick: '분향초',
    portraitRibbon: '영정리본',
  };

  const selectedItems = Object.keys(items)
    .filter(item => items[item].selected) // items[item].selected가 true인 항목만 필터링합니다.
    .map(item => itemNames[item]); // 필터링된 항목의 이름을 매핑합니다.

  if (selectedItems.length === 0) return '추가 장례 용품: 선택없음';
  return `${selectedItems.join(', ')} 사용`;
};

const formatFuneralDetails = (details) => {
  if ( !details.crematorium ) return '화장장: 선택없음';
  return `화장장: ${details.crematorium}\n날짜: ${details.date}\n시간: ${details.time}`;
};

const formatFuneralHome = (home) => {
  if (!home) return '장례식장: 선택없음';
  return `장례식장: ${home.name}`;
};

const formatCemeteryLoc = (loc) => {
  if (!loc) return '묘지 위치: 선택없음';
  return `묘지 위치: ${loc.cemetery}\n주소: ${loc.address}`;
};

const formatCoffin = (coffin) => {
  if (!coffin) return '관: 선택없음';
  return `관: ${coffin.name}\n규격: ${coffin.size}\n재질: ${coffin.material}\n단가: ${coffin.price.toLocaleString()}원`;
};

const formatShroud = (shroud) => {
  if (!shroud) return '수의: 선택없음';
  let result = `수의: ${shroud.name}\n재질구성: ${shroud.material}\n원사 생산국: ${shroud.origin}\n원단 생산지: ${shroud.production}`;
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
    .filter(item => items[item].selected) // items[item].selected가 true인 항목만 필터링합니다.
    .map(item => itemNames[item]); // 필터링된 항목의 이름을 매핑합니다.

  if (selectedItems.length === 0) return '추가 영결식 준비물 선택되지 않음';
  return `영결식 준비물: ${selectedItems.join(', ')}`;
};

export default function HomeScreen({ navigation }) {
  const { funeralStatus, funeralHome, funeralMethod,
          funeralAttire, funeralFlower, funeralMenu,
          funeralItems, funeralDetails, cemeteryLoc,
          funeralCoffin, funeralShroud, ceremonyItems } = useContext(FuneralContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.appNameContainer}>
        <Text style={styles.appName}>동행</Text>
        <Text style={styles.subName}>고인의 마지막 길을 함께,{'\n'}저희가 동행하겠습니다.</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FuneralPlanning_101')}
      >
        <Text style={styles.buttonText}>장례 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate('FuneralConsulting_101')}
      >
        <Text style={styles.buttonText}>장례지도사 빠른 상담</Text>
        </TouchableOpacity>
      

        
      <View style={styles.profileContainer} >
      
        <View>
        <Text style={styles.MyProfile}>나의 장례</Text>
        <Image
            style={styles.profileImage}
            source={require('../assets/person-icon.jpg')}
        />
        </View>
        <View>
          <Text style={styles.profileName}>Name({funeralStatus || '장례 시작전'})</Text>
          <Text style={styles.profileDescription}>
            {formatFuneralHome(funeralHome)}
          </Text>
          <Text style={styles.profileDescription}>
            {funeralMethod || ''}
          </Text>
          <Text style={styles.profileDescription}>
            {formatFuneralAttire(funeralAttire)}
          </Text>
          <Text style={styles.profileDescription}>
            {formatFuneralFlower(funeralFlower)}
          </Text>
          <Text style={styles.profileDescription}>
            {formatFuneralMenu(funeralMenu)}
          </Text>
          <Text style={styles.profileDescription}>
            {formatFuneralItems(funeralItems)}
          </Text>
          <Text style={styles.profileDescription}>
            {formatFuneralDetails(funeralDetails)}
          </Text>
          <Text style={styles.profileDescription}>
            {formatCemeteryLoc(cemeteryLoc)}
          </Text>
          <Text style={styles.profileDescription}>
            {formatCoffin(funeralCoffin)}
          </Text>
          <Text style={styles.profileDescription}>
            {formatShroud(funeralShroud)}
          </Text>
          <Text style={styles.profileDescription}>
            {formatCeremonyItems(ceremonyItems)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20, // Add some padding to the bottom to ensure scrollability
  },
  appNameContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 22,
    marginBottom: 10,
    textAlign: 'left',
  },
  subName: {
    fontSize: 16,
    marginLeft: 25,
    marginBottom: 20,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#555555',
    padding: 40,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'left',
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
    shadowOpacity: 0.25, // 그림자 불투명도
    shadowRadius: 3.84,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  MyProfile: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
  },
  profileDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});
