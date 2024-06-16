import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FuneralContext } from '../FuneralContext';

const FuneralPlanning_901 = ({ navigation }) => {
  const { funeralStatus, setFuneralStatus, funeralDetails, cemeteryLoc, funeralCoffin, funeralShroud, ceremonyItems } = useContext(FuneralContext);

  const formatFuneralDetails = (details) => {
    if (!details || !details.crematorium) return '화장장 위치 선택되지 않음';
    return `${details.crematorium}\n날짜: ${details.date}\n시간: ${details.time}`;
  };

  const formatCemeteryLoc = (loc) => {
    if (!loc) return '묘지 위치 선택되지 않음';
    return `${loc.cemetery}\n주소: ${loc.address}`;
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
    setFuneralStatus('장례식 준비 완료');
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mainTitle}>장례 계획 요약</Text>

      <View style={[styles.section, styles.section1]}>
        <Text style={styles.sectionTitle}>화장장 위치</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.itemLabel}>{formatFuneralDetails(funeralDetails)}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FuneralPlanning_601')}
          >
            <Text style={styles.buttonText}>여기부터 수정</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.section, styles.section2]}>
        <Text style={styles.sectionTitle}>묘지 위치</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.itemLabel}>{formatCemeteryLoc(cemeteryLoc)}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FuneralPlanning_701')}
          >
            <Text style={styles.buttonText}>여기부터 수정</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.section, styles.section3]}>
        <Text style={styles.sectionTitle}>관 설정</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.itemLabel}>{formatFuneralCoffin(funeralCoffin)}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FuneralPlanning_801')}
          >
            <Text style={styles.buttonText}>여기부터 수정</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.section, styles.section4]}>
        <Text style={styles.sectionTitle}>수의 설정</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.itemLabel}>{formatFuneralShroud(funeralShroud)}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FuneralPlanning_802')}
          >
            <Text style={styles.buttonText}>여기부터 수정</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.section, styles.section5]}>
        <Text style={styles.sectionTitle}>영결식 준비물</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.itemLabel}>{formatCeremonyItems(ceremonyItems)}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FuneralPlanning_803')}
          >
            <Text style={styles.buttonText}>여기부터 수정</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>뒤로가기</Text>
        </TouchableOpacity>
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
    backgroundColor: 'white',
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
  },
  section1: {
    backgroundColor: '#f0f8ff',
  },
  section2: {
    backgroundColor: '#e6e6fa',
  },
  section3: {
    backgroundColor: '#fff0f5',
  },
  section4: {
    backgroundColor: '#f5fffa',
  },
  section5: {
    backgroundColor: '#f0fff0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 20,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
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

export default FuneralPlanning_901;
