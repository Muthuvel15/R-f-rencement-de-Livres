import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const BookList = ({ books }) => {
  return (
    <FlatList
      data={books}
      renderItem={({ item }) => (
        <View style={styles.bookItem}>
          <Image source={{ uri: item.imageUrl }} style={styles.bookImage} />
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{item.titre}</Text>
            <Text style={styles.bookDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  bookItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  bookImage: {
    width: 80,
    height: 120,
    marginRight: 8,
    borderRadius: 4,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookDescription: {
    fontSize: 14,
    color: '#888',
  },
});

export default BookList;
