import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';

const { width: screenWidth } = Dimensions.get('window');

export default function PostDetailScreen({ route, navigation }) {
  const initialPost = route.params.post;
  const { updatePost, deletePost } = route.params;
  const [post, setPost] = useState(initialPost);

  const handleDelete = () => {
    Alert.alert(
      "삭제 확인",
      "정말로 이 게시글을 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          style: "destructive",
          onPress: () => {
            deletePost(post.id);
            navigation.reset({
              index: 0,
              routes: [{ name: 'FuneralReviewScreen' }]
            });
          },
        },
      ]
    );
  };

  const handleUpdatePost = (updatedPost) => {
    setPost(updatedPost);
  };

  useEffect(() => {
    if (route.params.post) {
      handleUpdatePost(route.params.post);
    }
  }, [route.params.post]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'FuneralReviewScreen' }] })}>
          <Ionicons name="arrow-back" size={24} color="#007BFF" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate('CreatePostScreen', { post, updatePost: handleUpdatePost, deletePost })}>
            <Ionicons name="create-outline" size={24} color="#007BFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.author}>by {post.author}</Text>
        <Text style={styles.time}>{moment(post.createdAt).fromNow()}</Text>
        <Text style={styles.content}>{post.content}</Text>
        <Text style={styles.hashtags}>{post.hashtags.map(tag => `#${tag}`).join(' ')}</Text>
        {post.media && post.media.length > 0 && (
          <Swiper style={styles.wrapper} showsButtons>
            {post.media.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.carouselImage} />
            ))}
          </Swiper>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    backgroundColor: '#FFFFFF',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 15,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  hashtags: {
    fontSize: 16,
    color: '#007BFF',
  },
  wrapper: {
    height: screenWidth * 0.75,
  },
  carouselImage: {
    width: screenWidth,
    height: screenWidth * 0.75,
  },
});
