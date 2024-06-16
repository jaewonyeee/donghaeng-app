import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image,  Modal, Button } from 'react-native';

const profiles = [
  {
    name: '김혁준 장례지도사',
    education: '서울대학교 장례지도학과',
    personalExperience: '5년',
    companyExperience: '5년 (AA상조회사)',
    cases: '150건',
    rating: 4.8,
    religion: '천주교',
    image: require('../assets/profile/profile1.png'),
    tags: ['#서울', '#경기', '#대전', '#부산', '#전주', '#인천'],
  },
  {
    name: '차은우 장례지도사',
    education: '고려대학교 장례지도학과',
    personalExperience: '8년',
    companyExperience: '없음',
    cases: '120건',
    rating: 4.5,
    religion: '기독교',
    image: require('../assets/profile/profile2.png'),
    tags: ['#서울', '#경기', '#부산', '#전주'],
  },
  {
    name: '김혜수 장례지도사',
    education: '연세대학교 장례지도학과',
    personalExperience: '6년',
    companyExperience: '6년 (BB상조회사)',
    cases: '200건',
    rating: 4.9,
    religion: '불교',
    image: require('../assets/profile/profile3.png'),
    tags: ['#경기', '#대전', '#부산'],
  },
  {
    name: '김은지 장례지도사',
    education: '성균관대학교 장례지도학과',
    personalExperience: '없음',
    companyExperience: '5년 (CC상조회사)',
    cases: '90건',
    rating: 4.3,
    religion: '유교',
    image: require('../assets/profile/profile4.png'),
    tags: ['#전주', '#부산'],
  },
  {
    name: '한지민 장례지도사',
    education: '한양대학교 장례지도학과',
    personalExperience: '7년',
    companyExperience: '없음',
    cases: '110건',
    rating: 4.6,
    religion: '천주교',
    image: require('../assets/profile/profile5.png'),
    tags: ['#서울', '#인천'],
  },
  {
    name: '송강호 장례지도사',
    education: '중앙대학교 장례지도학과',
    personalExperience: '9년',
    companyExperience: '없음',
    cases: '140건',
    rating: 4.7,
    religion: '기독교',
    image: require('../assets/profile/profile6.png'),
    tags: ['#경기', '#대전', '#부산'],
  },
  {
    name: '박은혁 장례지도사',
    education: '한국장례지도학원',
    personalExperience: '3년',
    companyExperience: '6년 (VV상조회사)',
    cases: '130건',
    rating: 4.6,
    religion: '불교',
    image: require('../assets/profile/profile7.png'),
    tags: ['#서울', '#대전', '#부산'],
  },
  {
    name: '송은수 장례지도사',
    education: 'HH장례지도학원',
    personalExperience: '4년',
    companyExperience: '없음',
    cases: '80건',
    rating: 4.2,
    religion: '없음',
    image: require('../assets/profile/profile3.png'),
    tags: ['#서울', '#경기', '#인천', '#부산'],
  },
];

const FuneralPlanning_201 = ({ navigation }) => {
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // 모달 표시 여부 상태 추가
  const [selectedProfile, setSelectedProfile] = useState(null); 

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

  const handleNext = () => {
    navigation.navigate('FuneralPlanning_501');
  }

  const handleSelectProfile = (index) => {
    setSelectedProfileIndex(index);
    setSelectedProfile(profiles[index]); // 선택된 프로필 정보 저장
    setModalVisible(true); // 모달 표시
  };

  const handleTagPress = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      }
      return [...prevTags, tag];
    });
    setSelectedProfileIndex(null);
  };

  const filteredProfiles = selectedTags.length > 0
    ? profiles.filter(profile => selectedTags.every(tag => profile.tags.includes(tag)))
    : profiles;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>장례지도사 선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer}>
        {['#서울', '#경기', '#대전', '#부산', '#전주', '#인천'].map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tabButton,
              selectedTags.includes(tag) ? styles.activeTabButton : null,
            ]}
            onPress={() => handleTagPress(tag)}
          >
            <Text style={[
              styles.tabButtonText,
              selectedTags.includes(tag) ? styles.activeTabButtonText : null,
            ]}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {filteredProfiles.map((profile, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.profileContainer,
            selectedProfileIndex === index && styles.selectedProfileContainer,
          ]}
          onPress={() => handleSelectProfile(index)}
        >
          <Image source={profile.image} style={styles.profileImage} />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileDescription}>{profile.description}</Text>
            <View style={styles.tagContainer}>
              {profile.tags.map((tag, tagIndex) => (
                <Text key={tagIndex} style={styles.tagText}>{tag}</Text>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      ))}
      
      {/* 모달 컴포넌트 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* 선택된 프로필 정보 표시 */}
            <View style={styles.row}>
            <Image source={selectedProfile?.image} style={styles.profileImage} />
            <Text style={styles.modalTitle}>{selectedProfile?.name}</Text>
            </View>
            
            <View style={styles.infoContainer}>
              <View style={styles.row}>
                <Text style={styles.label}>학력 : </Text>
                <Text style={styles.value}>{selectedProfile?.education}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>경력 : </Text>
                <Text style={styles.value}>
                  {selectedProfile?.personalExperience !== '없음' && `개인 ${selectedProfile?.personalExperience}`}
                  {selectedProfile?.personalExperience !== '없음' && selectedProfile?.companyExperience !== '없음' && ', '}
                  {selectedProfile?.companyExperience !== '없음' && `회사 ${selectedProfile?.companyExperience}`}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>지도한 횟수 : </Text>
                <Text style={styles.value}>{selectedProfile?.cases}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>평점 : </Text>
                <View style={styles.ratingContainer}>
                  {selectedProfile?.rating !== undefined && 
                  <Text style={styles.ratingText}>{renderStars(selectedProfile?.rating)}
                </Text>}
                </View>
              </View>
            </View>

            {/* 추가 정보 및 닫기 버튼 */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>

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
    padding: 16,
    backgroundColor: '#eeeeee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  tabButton: {
    marginHorizontal: 5,
    height: 40, // 높이 고정
    justifyContent: 'center', // 수직 가운데 정렬
    alignItems: 'center', // 수평 가운데 정렬
    paddingHorizontal: 20, // 좌우 여백
    borderRadius: 20,
    backgroundColor: '#cccccc',
  },
  activeTabButton: {
    backgroundColor: '#555555',
    
  },
  tabButtonText: {
    color: 'white',
    fontSize: 14, // 텍스트 크기 고정
  },
  activeTabButtonText: {
    color: 'white',
    fontSize: 14, // 텍스트 크기 고정
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f8f8f8',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  selectedProfileContainer: {
    backgroundColor: '#cccccc',
    borderColor: '#cccccc',
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
    shadowOpacity: 0.25, // 그림자 불투명도
    shadowRadius: 3.84,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileDescription: {
    fontSize: 14,
    color: 'gray',
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  tagText: {
    fontSize: 12,
    color: 'gray',
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#999999',
    paddingVertical: 15,
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
    backgroundColor: '#555555',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingLeft: 30,
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
    marginLeft: 3,
  },
  star: {
    fontSize: 20,
    color: '#FFD700',
    marginTop: 3,
  },
  emptyStar: {
    fontSize: 24,
    color: '#C0C0C0',
  },
  closeButton: {
    backgroundColor: '#999999',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 5,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FuneralPlanning_201;
