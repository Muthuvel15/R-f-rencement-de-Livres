import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const CategoryList = ({ categories }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryText}>{item.genre}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  categoryItem: {
    backgroundColor: '#f5a442',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 8,
  },
  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CategoryList;
