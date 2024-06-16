import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import config from '../../server-config.json';

const SERVER_URL = config.SERVER_URL; // 이 부분은 스크립트에 의해 자동으로 업데이트됩니다.

export default function CreatePostScreen({ navigation, route }) {
  const { addPost, updatePost, post, deletePost } = route.params || {};
  const [title, setTitle] = useState(post ? post.title : '');
  const [content, setContent] = useState(post ? post.content : '');
  const [hashtags, setHashtags] = useState(post ? post.hashtags.join(' ') : '');
  const [author, setAuthor] = useState(post ? post.author : '');

  const handleSubmit = async () => {
    const newPost = {
      id: post ? post.id : Date.now().toString(),
      title,
      content,
      hashtags: hashtags.split(' '),
      author,
      createdAt: post ? post.createdAt : new Date().toISOString(),
    };

    try {
      if (post) {
        await axios.put(`${SERVER_URL}/${post.id}`, newPost);
        updatePost(newPost);
      } else {
        await axios.post(SERVER_URL, newPost);
        addPost(newPost);
      }
      navigation.navigate('PostDetailScreen', { post: newPost, updatePost, deletePost });
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '게시글을 저장하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{post ? '글 수정' : '글 작성'}</Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Ionicons name="checkmark" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="제목"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="작성자"
          value={author}
          onChangeText={setAuthor}
          placeholderTextColor="#888"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="내용"
          value={content}
          onChangeText={setContent}
          placeholderTextColor="#888"
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="해시태그 (공백으로 구분)"
          value={hashtags}
          onChangeText={setHashtags}
          placeholderTextColor="#888"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    flex: 1,
    paddingTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
