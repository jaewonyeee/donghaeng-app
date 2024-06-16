import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';

const documents = [
  {
    stage: '장례 전 필요서류',
    items: [
      { type: '가족관계\n증명서', site: '정부24', image: require('../assets/link1.png'), link: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=97400000004&HighCtgCD=A01008&tp_seq=01' },
      { type: '사망진단서, \n사체검안서', site: '병원 및 의료기관', image: require('../assets/link2.png'), link: 'https://www.hospital.go.kr' },
      { type: '주민등록\n초본', site: '정부24', image: require('../assets/link1.png'), link: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=13100000015&HighCtgCD=A01010001&Mcode=10200' },
      { type: '인감증명서', site: '정부24', image: require('../assets/link1.png'), link: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=13100000025' },
      { type: '장례예식장 예약 확인서', site: '장례예식장', image: require('../assets/link3.png'), link: '#' },
      { type: '신분증', site: '신분증', image: require('../assets/link4.png'), link: '#' },
    ]
  },
  {
    stage: '장례 후 필요서류',
    items: [
      { type: '사망신고서', site: '정부24', image: require('../assets/link1.png'), link: 'https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A01007&CappBizCD=12700000059&tp_seq=' },
      { type: '사망진단서 사본', site: '병원 및 의료기관', image: require('../assets/link2.png'), link: 'https://www.hospital.go.kr' },
      { type: '주민등록\n말소신청서', site: '정부24', image: require('../assets/link1.png'), link: 'https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A01010&CappBizCD=13100000010&tp_seq=01' },
      { type: '상속\n재산조회', site: '국세청', image: require('../assets/link5.png'), link: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2332&cntntsId=7725' },
      { type: '금융기관\n제출서류', site: '금융기관 홈페이지', image: require('../assets/link6.png'), link: '#' },
      { type: '보험금\n청구서', site: '보험사 홈페이지', image: require('../assets/link7.png'), link: '#' },
      { type: '국민연금\n수급자격\n변경 신고서', site: '국민연금공단', image: require('../assets/link8.png'), link: 'https://www.nps.or.kr' },
    ]
  }
];

const AdministrativeDocumentsScreen = () => {
  const handleLinkPress = (link) => {
    if (link === '#') {
      alert('해당 사이트로 연결할 수 없습니다.');
    } else {
      Linking.openURL(link);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.appNameContainer}>
        <Text style={styles.appName}>행정서류</Text>
        <Text style={styles.subName}>장례에 필요한 서류들을 미리 확인해보세요.</Text>
      </View>
      <View>
      <View>
      {documents.map((doc, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{doc.stage}</Text>
          <View style={styles.table}>
            <View style={styles.rowHeader}>
              <Text style={styles.cellHeader}>서류</Text>
              <Text style={styles.cellHeader}>발급 사이트</Text>
            </View>
          {doc.items.map((item, idx) => (
            <View key={idx} style={styles.row}>
              <Text style={styles.cell}>{item.type}</Text>
              <View>
                <TouchableOpacity onPress={() => handleLinkPress(item.link)}>
                <Image source={item.image} style={styles.imageType} />
              < Text style={styles.link}>{item.site}</Text>
                </TouchableOpacity>
              </View>
            </View>
           ))}
          </View>
        </View>
      ))}
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    paddingBottom: 10,
  },
  appNameContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingTop: 30,
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
  section: {
    width: '100%',
    marginBottom: 30,
    flexDirection: 'flex-start',
    backgroundColor: '#f8f8f8',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    backgroundColor: '#fff',
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
    shadowOpacity: 0.25, // 그림자 불투명도
    shadowRadius: 3.84,
  },
  rowHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 0,
    paddingRight: 50,
  },
  imageType: {
    width: 50,
    height: 50,
    marginLeft: 74,
    marginTop: 30,
  },
  cellHeader: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    minWidth: 150,
    fontSize: 14,
    padding: 40,
    marginTop: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    textAlign: 'center',
  },
  link: {
    flex: 1,
    minWidth: 200,
    fontSize: 14,
    marginTop: 5,
    marginBottom: 30,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default AdministrativeDocumentsScreen;
