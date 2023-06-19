import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput } from "react-native";
import { Card, Image } from "react-native-elements";
import { LIVRES, CATEGORIES } from "./models/data";

const HomeScreen = ({ navigation }) => {
  // État pour la catégorie sélectionnée
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // État pour la requête de recherche
  const [searchQuery, setSearchQuery] = useState("");

  const handleBookPress = (book) => {
    // Naviguer vers l'écran des détails du livre avec les données du livre sélectionné
    navigation.navigate("BookDetails", { book });
  };

  const handleCategoryPress = (category) => {
    // Mettre à jour la catégorie sélectionnée
    setSelectedCategory(category);
  };

  const handleSearch = (text) => {
    // Mettre à jour la requête de recherche
    setSearchQuery(text);
  };

  const filterBooksByCategory = (category) => {
    let filteredBooks = LIVRES;

    if (category !== "All") {
      // Trouver l'ID de la catégorie sélectionnée
      const categoryId = CATEGORIES.find((c) => c.genre === category)?.id;
      if (categoryId) {
        // Filtrer les livres en fonction de la catégorie
        filteredBooks = filteredBooks.filter((book) =>
          book.categorieId.includes(categoryId)
        );
      }
    }

    if (searchQuery !== "") {
      // Filtrer les livres en fonction de la requête de recherche (titre)
      filteredBooks = filteredBooks.filter((book) =>
        book.titre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredBooks;
  };

  const renderCategoryButton = (category) => {
    const isActive = category === selectedCategory;

    return (
      <TouchableOpacity
        key={category}
        style={[
          styles.categoryButton,
          { backgroundColor: isActive ? "#f5428d" : "#ccc" },
        ]}
        onPress={() => handleCategoryPress(category)}
      >
        <Text style={styles.categoryButtonText}>{category}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        {/* Afficher un bouton pour la catégorie "All" */}
        {renderCategoryButton("All")}
        
        {/* Afficher des boutons pour chaque catégorie */}
        {CATEGORIES.map((category) => renderCategoryButton(category.genre))}
      </View>
      
      {/* Barre de recherche */}
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher par titre..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Liste des livres filtrés */}
      <FlatList
        data={filterBooksByCategory(selectedCategory)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleBookPress(item)}>
            {/* Afficher une carte pour chaque livre */}
            <Card containerStyle={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.title}>{item.titre}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </Card>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

// Styles
const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
    paddingTop: 10,
    height: 50,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  categoryButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  flatListContent: {
    paddingBottom: 20,
  },
};

export default HomeScreen;
