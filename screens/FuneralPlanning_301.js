import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { PieChart } from 'react-native-chart-kit';
import { FuneralContext } from '../FuneralContext';

const images = [
  { src: require('../assets/1.png'), label: '화장' },
  { src: require('../assets/2.png'), label: '자연장' },
  { src: require('../assets/3.png'), label: '매장' },
];

const chartData = [
  {
    name: "화장",
    population: 70,
    color: "#f00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "자연장",
    population: 20,
    color: "#0f0",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "매장",
    population: 10,
    color: "#00f",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];

const screenWidth = Dimensions.get('window').width;

const FuneralPlanning_301 = ({ navigation }) => {
  const { setFuneralMethod } = useContext(FuneralContext);
  const [selectedMethod, setSelectedMethod] = useState('화장');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>매장방법선택</Text>
      <Swiper
        style={styles.wrapper}
        showsButtons
        loop={false}
        onIndexChanged={(index) => setSelectedMethod(images[index].label)}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={image.src} style={styles.image} />
            <Text style={styles.imageLabel}>{image.label}</Text>
          </View>
        ))}
      </Swiper>
      <Text style={styles.graphTitle}>매장 방법 비율</Text>
      <PieChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>뒤로가기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => {
          setFuneralMethod(selectedMethod);
          navigation.navigate('HomeStack', { screen: 'FuneralPlanning_401' });
        }}>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  wrapper: {
    height: 400,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  imageLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  graphTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: 'gray',
    paddingVertical: 15,
    paddingHorizontal: 30,
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
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FuneralPlanning_301;
