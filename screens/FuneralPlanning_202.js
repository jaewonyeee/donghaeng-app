import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FuneralContext } from '../FuneralContext';

const FuneralPlanning_202 = ({ route, navigation }) => {
  const { profile } = route.params; // 전달된 프로필 정보를 가져옴]
  const { setFuneralStatus } = useContext(FuneralContext);
  const [embalming, setEmbalming] = useState(0);
  const [transport, setTransport] = useState(0);
  const [religious, setReligious] = useState(0);

  const handleIncrement = (setter, value) => {
    setter(value + 1);
  };

  const handleDecrement = (setter, value) => {
    if (value > 0) {
      setter(value - 1);
    }
  };

  const handleNext = () => {
      setFuneralStatus('장례지도사 선정');
      navigation.navigate('FuneralPlanning_301');
    }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <View style={styles.starContainer}>
        {Array.from({ length: fullStars }).map((_, index) => (
          <Text key={`full-${index}`} style={styles.star}>★</Text>
        ))}
        {halfStar && <Text style={styles.star}>☆</Text>}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <Text key={`empty-${index}`} style={styles.emptyStar}>★</Text>
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{profile.name}</Text>
      <Image source={profile.image} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>학력</Text>
          <Text style={styles.value}>{profile.education}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>경력</Text>
          <Text style={styles.value}>
            {profile.personalExperience !== '없음' && `개인 ${profile.personalExperience}`}
            {profile.personalExperience !== '없음' && profile.companyExperience !== '없음' && ', '}
            {profile.companyExperience !== '없음' && `회사 ${profile.companyExperience}`}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>지도한 횟수</Text>
          <Text style={styles.value}>{profile.cases}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>평균 평점</Text>
          <View style={styles.ratingContainer}>
            {renderStars(profile.rating)}
            {profile.rating !== undefined && <Text style={styles.ratingText}>{profile.rating.toFixed(1)}</Text>}
          </View>
        </View>
      </View>
      <View style={styles.expertiseContainer}>
        <View style={styles.expertiseRow}>
          <Text style={styles.label}>염습 전문 인력</Text>
          <View style={styles.counter}>
            <TouchableOpacity onPress={() => handleDecrement(setEmbalming, embalming)}>
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{embalming}</Text>
            <TouchableOpacity onPress={() => handleIncrement(setEmbalming, embalming)}>
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.extraCost}>추가비용: 10,000원</Text>
        </View>
        <View style={styles.expertiseRow}>
          <Text style={styles.label}>운구 전문 인력</Text>
          <View style={styles.counter}>
            <TouchableOpacity onPress={() => handleDecrement(setTransport, transport)}>
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{transport}</Text>
            <TouchableOpacity onPress={() => handleIncrement(setTransport, transport)}>
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.extraCost}>추가비용: 15,000원</Text>
        </View>
        {profile.religion !== '없음' && (
          <>
            <View style={styles.expertiseRow}>
              <Text style={styles.label}>종교 전문 인력</Text>
              <View style={styles.counter}>
                <TouchableOpacity onPress={() => handleDecrement(setReligious, religious)}>
                  <Text style={styles.counterButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{religious}</Text>
                <TouchableOpacity onPress={() => handleIncrement(setReligious, religious)}>
                  <Text style={styles.counterButton}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.extraCost}>추가비용: 20,000원</Text>
            </View>
            <View style={styles.religionContainer}>
              {['천주교', '기독교', '불교', '유교'].map((religion) => (
                <View
                  key={religion}
                  style={[
                    styles.religionButton,
                    profile.religion === religion && styles.selectedReligionButton,
                  ]}
                >
                  <Text style={[
                    styles.religionButtonText,
                    profile.religion === religion && styles.selectedReligionButtonText,
                  ]}>
                    {religion}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
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
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  starContainer: {
    flexDirection: 'row',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
  },
  star: {
    fontSize: 24,
    color: '#FFD700',
  },
  emptyStar: {
    fontSize: 24,
    color: '#C0C0C0',
  },
  expertiseContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  expertiseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  counterValue: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  extraCost: {
    fontSize: 16,
    color: 'gray',
  },
  religionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  religionButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedReligionButton: {
    backgroundColor: '#8BC34A', // 하이라이트 색상을 다른 색으로 설정
  },
  religionButtonText: {
    fontSize: 16,
    color: 'black',
  },
  selectedReligionButtonText: {
    color: 'white',
    fontWeight: 'bold', // 텍스트 굵게 설정
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

export default FuneralPlanning_202;
