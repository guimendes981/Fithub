import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";

const exercises = [
  { name: "Agachamento", videoId: "ddCEZHpVqqc" },
  { name: "Supino Reto", videoId: "fG_03xSzT2s" },
  { name: "Flexão de Braço", videoId: "a_n7mtAOEO0" },
  { name: "Abdominal", videoId: "2pLT-olgUJs" },
  { name: "Panturrilha em Pé", videoId: "720lq1j9mhs" },
  { name: "Barra Fixa", videoId: "eGo4IYlbE5g" },
  { name: "Rosca Direta", videoId: "8w2bX0eDwv8" },
  { name: "Desenvolvimento de Ombros", videoId: "6Z15ZDhK9hM" },
  { name: "Remada Curvada", videoId: "Dy28eq2PjcM" },
  { name: "Elevação Lateral", videoId: "7c5bYX4Ox3M" },
  { name: "Tríceps Pulley", videoId: "2yjwXTZQDDI" },
  { name: "Rosca Alternada", videoId: "8w2bX0eDwv8" },
  { name: "Rosca Concentrada", videoId: "8w2bX0eDwv8" },
  { name: "Rosca Martelo", videoId: "8w2bX0eDwv8" },
  { name: "Rosca Inversa", videoId: "8w2bX0eDwv8" },
  { name: "Rosca Scott", videoId: "8w2bX0eDwv8" },
  { name: "Rosca 21", videoId: "8w2bX0eDwv8" },
  { name: "Rosca Punho", videoId: "8w2bX0eDwv8" },
  { name: "Rosca Testa", videoId: "8w2bX0eDwv8" },
  { name: "Rosca Francesa", videoId: "8w2bX0eDwv8" },
  { name: "Rosca 21", videoId: "8w2bX0eDwv8" },
  { name: "Rosca Punho", videoId: "8w2bX0eDwv8" },
  { name: "Rosca Testa", videoId: "8w2bX0eDwv8" },
  { name: "Rosca Francesa", videoId: "8w2bX0eDwv8" },
];

export default function ExerciseList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biblioteca de Exercícios</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.videoId}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <div
              style={{ height: "300px", width: "100%" }}
              dangerouslySetInnerHTML={{
                __html: `
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
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8A2BE2",
    marginBottom: 20,
  },
  exerciseItem: {
    marginTop: 20,
    backgroundColor: "#FFF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  exerciseName: {
    marginBottom: 10,
    fontWeight: "bold",
  },
});
