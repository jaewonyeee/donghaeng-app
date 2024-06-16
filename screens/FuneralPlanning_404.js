import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { FuneralContext } from '../FuneralContext';

const itemsList = [
  { name: '위패', price: 1000, key: 'tablet' },
  { name: '향', price: 2000, key: 'incense' },
  { name: '조위록', price: 3000, key: 'condolenceBook' },
  { name: '양초', price: 4000, key: 'candle' },
  { name: '분향초', price: 5000, key: 'incenseStick' },
  { name: '영정리본', price: 6000, key: 'portraitRibbon' },
];

const FuneralPlanning_404 = ({ navigation }) => {
  const { funeralItems, setFuneralItems } = useContext(FuneralContext);
  const [items, setItems] = useState(funeralItems);

  const toggleSwitch = (key) => {
    const newItems = { ...items, [key]: { ...items[key], selected: !items[key].selected } };
    setItems(newItems);
    setFuneralItems(newItems);
  };

  const handleNext = () => {
    navigation.navigate('FuneralPlanning_501');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mainTitle}>추가 장례 용품 선택</Text>

      {itemsList.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemLabel}>{item.name} - {item.price.toLocaleString()}원</Text>
          <Switch
            value={items[item.key].selected}
            onValueChange={() => toggleSwitch(item.key)}
          />
        </View>
      ))}

      <Text style={styles.infoText}>식사 비용과 일회용품 사용에 따른 비용은 후불로 진행됩니다. 식사비용은 50인분당 0000원이며 일회용품은 100인분당 0000원입니다.</Text>

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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemLabel: {
    fontSize: 18,
    fontWeight: 'bold',
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
  infoText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default FuneralPlanning_404;
