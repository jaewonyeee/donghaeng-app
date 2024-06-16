import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Post({ title, content, author, createdAt, hashtags }) {
  return (
    <View style={styles.post}>
      <Text style={styles.title}>{title}</Text>
      <Text>{content}</Text>
      <Text style={styles.author}>{author}</Text>
      <Text style={styles.time}>{createdAt}</Text>
      <Text style={styles.hashtags}>{hashtags.map(tag => `#${tag}`).join(' ')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#555',
  },
  time: {
    fontSize: 12,
    color: '#aaa',
  },
  hashtags: {
    color: '#007BFF',
    marginTop: 5,
  },
});
