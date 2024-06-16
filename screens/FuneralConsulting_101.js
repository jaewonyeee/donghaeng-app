import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // 아이콘을 사용하기 위한 패키지

const funeralDirectors = [
  {
    name: '김예공',
    location: '서울',
    experience: '경력10년',
    description: '안녕하세요, 저는 서울, 경기 지역의 장례를 주요로 맡고 있습니다. 2003년부터 일을 시작하여 경력 20년차 입니다. 편하게 상담문의 주세요.',
    image: require('../assets/profile/profile1.png'), // 적절한 프로필 이미지 경로
    status: 'online',
  },
  {
    name: '이예공',
    location: '부산',
    experience: '경력8년',
    description: '부산에서 장례를 준비하시는 분은 제게 오시면 됩니다.',
    image: require('../assets/profile/profile2.png'), // 적절한 프로필 이미지 경로
    status: 'online',
  },
  {
    name: '박예공',
    location: '대구',
    experience: '경력6년',
    description: '저는 성실한 장례지도사 입니다. 성실만큼은 자신있으니 믿고 고인의 장례를 맡겨주세요.',
    image: require('../assets/profile/profile3.png'), // 적절한 프로필 이미지 경로
    status: 'offline',
  },
  {
    name: '최예공',
    location: '인천',
    experience: '경력5년',
    description: '인천에서의 경력만 10년차인 장례지도사 김예공입니다. 인천 지역의 장례식장은 잘 알고 있으니 상담 문의 주세요.',
    image: require('../assets/profile/profile4.png'), // 적절한 프로필 이미지 경로
    status: 'online',
  },
  {
    name: '정예공',
    location: '광주',
    experience: '경력7년',
    description: '저는 돈 부분에서는 확실한 사람입니다. 정해진 금액 이상의 장례는 사치입니다. 상담주세요.',
    image: require('../assets/profile/profile5.png'), // 적절한 프로필 이미지 경로
    status: 'online',
  },
  {
    name: '홍예공',
    location: '대전',
    experience: '경력9년',
    description: '안녕하세요, 대전에서 장례를 준비하시는 분은 편하게 상담 문의 주세요.',
    image: require('../assets/profile/profile6.png'), // 적절한 프로필 이미지 경로
    status: 'online',
  },
];

const handlePhonePress = () => {
  Alert.alert('기능 구현', '전화 기능이 구현되지 않았습니다.');
};

const handleKakaoPress = () => {
  Alert.alert('기능 구현', '카카오톡 기능이 구현되지 않았습니다.');
};


const FuneralDirectorConsultation = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={40} color="#c6c6c6" />
        </TouchableOpacity>
        <Text style={styles.title}>장례지도사 상담</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      
        {funeralDirectors.map((director, index) => (
          <View key={index} style={styles.card}>
            <Image source={director.image} style={styles.profileImage} />
            <View style={styles.infoContainer}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{director.name} 장례지도사</Text>
                <View style={styles.statusContainer}>
                  <FontAwesome
                    name={director.status === 'online' ? 'check-circle' : 'times-circle'}
                    size={20}
                    color={director.status === 'online' ? 'green' : 'gray'}
                    style={styles.statusIcon}
                  />
                  <Text style={[styles.status, director.status === 'online' ? styles.onlineText : styles.offlineText]}>
                    {director.status === 'online' ? '온라인' : '오프라인'}
                  </Text>
                </View>
              </View>
              <Text style={styles.location}>{director.location}, {director.experience}</Text>
                <Text style={styles.description}>{director.description}</Text>
                <View style={styles.iconContainer}>
                  <TouchableOpacity style={styles.button} onPress={handlePhonePress}>
                    <FontAwesome name="phone" size={20} color="#c6c6c6" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={handleKakaoPress}>
                    <FontAwesome name="comment" size={17} color="#c6c6c6" />
                  </TouchableOpacity>
                </View>
            </View>
          </View>
        ))}
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 100,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 70,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
    marginTop: 3,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    padding: 7,
    marginLeft: 150,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'right',
  },
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    width: '45%',
  },
  status: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  onlineText: {
    color: 'green',
    marginLeft: 5,
  },
  offlineText: {
    color: 'gray',
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
 
  },
  backButton: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FuneralDirectorConsultation;