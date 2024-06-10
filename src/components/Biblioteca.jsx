import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import { WebView } from "react-native-webview";

const exercises = [
  { name: "Agachamento", videoId: "xqvCmoLULNY" },
  { name: "Supino Reto", videoId: "fG_03xSzT2s" },
  { name: "Flexão de Braço", videoId: "GOj4TMPVuZg" },
  { name: "Abdominal", videoId: "2pLT-olgUJs" },
  { name: "Panturrilha em Pé", videoId: "h7bZ4XbuZLg" },
  { name: "Barra Fixa", videoId: "eGo4IYlbE5g" },
  { name: "Desenvolvimento de Ombros", videoId: "Nu1lKrS-Vvw" },
  { name: "Remada Curvada", videoId: "InPm_ic6Xng" },
  { name: "Elevação Lateral", videoId: "VhUbT9AsU7E" },
  { name: "Tríceps Pulley", videoId: "wQdCw93LkcI" },
  { name: "Rosca Alternada", videoId: "ja45paikjpU" },
];

export default function ExerciseList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExercises, setFilteredExercises] = useState(exercises);

  const handleSearch = (text) => {
    setSearchTerm(text);
    const filtered = exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredExercises(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biblioteca de Exercícios</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar exercícios"
        onChangeText={handleSearch}
        value={searchTerm}
      />
      <FlatList
        style={{ flex: 1 }}
        data={filteredExercises}
        keyExtractor={(item) => item.videoId}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <WebView
              style={{ height: 300, width: "100%" }}
              source={{
                html: `
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/${item.videoId}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          `,
              }}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#232323",
    width: "100%",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8A2BE2",
    marginBottom: 20,
    marginTop: "15%",
  },
  searchInput: {
    backgroundColor: "#FFF",
    width: "80%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  exerciseItem: {
    marginTop: 20,
    backgroundColor: "#FFF",
    padding: 5,
    marginVertical: 5,
    width: 300,
    borderRadius: 5,
  },
  exerciseName: {
    marginBottom: 10,
    fontWeight: "bold",
  },
});
