import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import config from '../../server-config.json';

const SERVER_URL = config.SERVER_URL; // 이 부분은 스크립트에 의해 자동으로 업데이트됩니다.

const { width: screenWidth } = Dimensions.get('window');

export default function FuneralReviewScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(SERVER_URL);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`${SERVER_URL}/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error(error);
    }
  };

  const renderPost = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PostDetailScreen', { post: item, updatePost, deletePost })}>
      <View style={styles.post}>
        <View style={styles.postHeader}>
          <Image source={require('../../assets/review-person-icon.png')} style={styles.avatar} />
          <View>
            <Text style={styles.postAuthor}>{item.author}</Text>
            <Text style={styles.postTime}>{moment(item.createdAt).fromNow()}</Text>
          </View>
        </View>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text>{item.content}</Text>
        <Text style={styles.hashtags}>{item.hashtags.map(tag => `#${tag}`).join(' ')}</Text>
        {item.media && item.media.length > 0 && (
          <Swiper style={styles.wrapper} showsButtons>
            {item.media.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.carouselImage} />
            ))}
          </Swiper>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreatePostScreen', { addPost, deletePost, updatePost })}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  list: {
    paddingBottom: 80,
  },
  post: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: '#aaa',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hashtags: {
    color: '#007BFF',
    marginTop: 5,
  },
  wrapper: {
    height: screenWidth * 0.75,
  },
  carouselImage: {
    width: screenWidth,
    height: screenWidth * 0.75,
  },
  addButton: {
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
  },
});
