import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { FuneralContext } from '../FuneralContext';

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

const FuneralPlanning_803 = ({ navigation }) => {
  const { ceremonyItems, setCeremonyItems, setFuneralStatus } = useContext(FuneralContext);
  const [items, setItems] = useState(ceremonyItems);

  const toggleSwitch = (key) => {
    const newItems = { ...items, [key]: { ...items[key], selected: !items[key].selected } };
    setItems(newItems);
    setCeremonyItems(newItems);
  };

  const handleNext = () => {
    setFuneralStatus('영결식 준비물 선택');
    navigation.navigate('FuneralPlanning_901');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mainTitle}>영결식 준비물 선택</Text>

      {itemsList.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemLabel}>{item.name} - {item.price.toLocaleString()}원</Text>
          <Switch
            value={items[item.key]?.selected || false}
            onValueChange={() => toggleSwitch(item.key)}
          />
        </View>
      ))}

      

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

export default FuneralPlanning_803;
