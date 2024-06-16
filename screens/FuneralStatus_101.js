import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';

const procedures = [
  {
    title: '준비',
    description: '조문객 범위 및 예상 조문객 수, 종교, 거주지, 투자가능 비용, 영정사진 등을 미리 설정합니다. 본격적인 장례 전 원활한 장례를 치르기 위해 미리 준비하는 단계입니다.',
  },
  {
    title: '장례식장 및 장례물품 선정',
    description: '고인이 사망한 후, 위치와 시설을 고려하여 장례식장을 선정합니다. 장례시 필요한 물품(수의, 관, 꽃 등)을 구체적으로 선택합니다.',
  },
  {
    title: '안치',
    description: '고인을 운구용 차량으로 운구한 후, 안치실에 고인을 인지합니다. 상주는 고인과 동행하며, 필요한 서류(사망진단서, 시체검안서 등)를 구비합니다. 또한 상주는 부고를 작성한 후, 발송합니다.',
  },
  {
    title: '입관',
    description: '장례 둘째날입니다. 정결하게 고인을 다루고 수의를 입히는 염습이 진행됩니다. 그 후 고인을 관에 모시는 입관이 이뤄집니다. 고인의 종교에 따라 종교적 예식이 진행될 수 있습니다.',
  },
  {
    title: '발인',
    description: '장례 셋째날입니다. 고인을 모신 후 장지로 이동합니다. 고인의 장례방법(매장, 화장 등)에 따라 알맞은 장지를 선택합니다. 장지는 지역, 시설, 세부 조건 등에 따라 차이가 있을 수 있으니, 잘 알아보신 후 계약하시길 추천드립니다.',
  },
  {
    title: '장례 후',
    description: '상주는 장례를 모두 끝마친 후, 고인의 사망 신고를 접수합니다. 또한 고인의 재산내역을 조회한 후 상속 승인 또는 포기 절차를 진행합니다.',
  },
];

const FuneralStatusScreen = () => {
  const [currentProcedureIndex, setCurrentProcedureIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProcedureIndex(prevIndex => (prevIndex + 1) % procedures.length);
    }, 10000); // 10초마다 다음 절차로 이동

    return () => clearInterval(interval);
  }, []);

  const handleProcedurePress = (procedure) => {
    setSelectedProcedure(procedure);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.appNameContainer}>
          <Text style={styles.appName}>장례현황</Text>
          <Text style={styles.subName}>현재 장례 준비 현황을 확인해보세요.</Text>
      </View>
        <View style={styles.timelineContainer}>
          <View style={styles.arrow} />
          <View style={styles.timeline}>
            {procedures.map((procedure, index) => (
              <View key={index} style={styles.procedureContainer}>
                <View style={[
                  styles.dot,
                  currentProcedureIndex === index && styles.activeDot
                ]} />
                <TouchableOpacity 
                  style={[
                    styles.procedureButton,
                    currentProcedureIndex === index && styles.activeProcedureButton
                  ]}
                  onPress={() => handleProcedurePress(procedure)}
                >
                  <Text style={styles.procedureText}>{procedure.title}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedProcedure?.title}</Text>
            <Text style={styles.modalDescription}>{selectedProcedure?.description}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    paddingBottom: 20, 
  },
  appNameContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingTop: 30,
    backgroundColor: '#f8f8f8',
  },
  appName: {
    fontSize: 25,
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
  timelineContainer: {
    width: '95%',
    paddingRight: 15,
    paddingLeft: 0,
  },
  arrow: {
    width: 10,
    height: '100%',
    backgroundColor: '#e6e6e6',
    position: 'absolute',
    left: 15,
    borderRadius: 10,
  },
  timeline: {
    flex: 1,
    paddingLeft: 50,
  },
  procedureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5, // 버튼 간의 간격을 늘려서 화면 하단에 빈 공간이 없도록 조정
  },
  dot: {
    width: 10,
    height: 85,
    borderRadius: 10,
    backgroundColor: '#e6e6e6',
    marginRight: 20,
    marginLeft: -35,
  },
  activeDot: {
    backgroundColor: '#999999',
  },
  procedureButton: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  activeProcedureButton: {
    backgroundColor: '#999999',
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
    shadowOpacity: 0.25, // 그림자 불투명도
    shadowRadius: 3.84,
  },
  procedureText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
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
  closeButton: {
    backgroundColor: '#555555',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FuneralStatusScreen;
