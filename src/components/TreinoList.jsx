import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";
import * as Animatable from "react-native-animatable";

export default function TreinoList() {
  const [treinos, setTreinos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTreino, setSelectedTreino] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const usuario = auth.currentUser;
    if (usuario) {
      onSnapshot(collection(db, "treinos"), (snapshot) => {
        const newTreinos = [];
        snapshot.forEach((doc) => {
          if (usuario.uid === doc.data().userId) {
            newTreinos.push({ id: doc.id, ...doc.data() });
          }
        });
        setTreinos(newTreinos);
      });
    }
  }, []);

  const handlePress = (treino) => {
    setSelectedTreino(treino);
    setModalVisible(true);
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.treinoItem}
      onPress={() => handlePress(item)}
    >
      <Text style={styles.title}>{item.nome}</Text>
    </TouchableOpacity>
  );
  
  return (
    <ImageBackground
      source={require("../images/background1.jpg")}
      style={styles.container}
    >
      <View style={styles.topLeft}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="arrow-back" size={30} color="#8A2BE2" />
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Seus Treinos</Text>
      <Animatable.View animation="fadeIn" duration={2000}>
        <FlatList
          data={treinos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <View style={styles.modalView}>
  {selectedTreino ? (
    selectedTreino.exercicios ? (
      selectedTreino.exercicios.map((exercicio, index) => (
        <View key={index} style={styles.exercicioItem}>
          <Text style={styles.text}>Exercício: {exercicio.nome}</Text>
          <Text style={styles.text}>Peso: {exercicio.peso}</Text>
          <Text style={styles.text}>Repetições: {exercicio.repeticoes}</Text>
          <Text style={styles.text}>Séries: {exercicio.series}</Text>
        </View>
      ))
    ) : (
      <Text style={styles.text}>Nenhum exercício encontrado</Text>
    )
  ) : (
    <Text style={styles.text}>Nenhum treino selecionado</Text>
  )}
</View>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: "#8A2BE2" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Animatable.View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#232323",
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },
  topLeft: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#FFF",
  },
  button: {
    padding: 10,
    margin: 20,
    height: 30,
    borderRadius: 5,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
  },
  treinoItem: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#8A2BE2", // Alterado para roxo
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  exercicioItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    width: "100%",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
});
