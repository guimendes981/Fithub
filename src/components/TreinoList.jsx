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
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";
import * as Animatable from "react-native-animatable";

export default function TreinoList() {
  const [treinos, setTreinos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTreino, setSelectedTreino] = useState(null);
  const [selectedExercicio, setSelectedExercicio] = useState(null);

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

  const handleEditButtonPress = (treinoId, exercicioId) => {
    const treino = treinos.find((treino) => treino.id === treinoId);
    const exercicio = treino.exercicios.find(
      (exercicio) => exercicio.id === exercicioId
    );

    setSelectedTreino(treino);
    setSelectedExercicio(exercicio);
  };

  const handleOpenEditModal = (treinoId, exercicioId) => {
    const treino = treinos.find((treino) => treino.id === treinoId);
    const exercicio = treino.exercicios.find(
      (exercicio) => exercicio.id === exercicioId
    );

    setSelectedTreino(treino);
    setSelectedExercicio(exercicio);
    setModalVisible(true);
  };

  const handlePress = (treino) => {
    setSelectedTreino(treino);
    setSelectedExercicio(null);
    setModalVisible(true);
  };
  
  const handleSave = async () => {
    if (!selectedExercicio) return;

    const treino = treinos.find((t) => t.id === selectedTreino.id);
    const updatedExercicios = treino.exercicios.map((exercicio) =>
      exercicio.id === selectedExercicio.id ? selectedExercicio : exercicio
    );

    await updateDoc(doc(db, "treinos", selectedTreino.id), {
      exercicios: updatedExercicios,
    });

    const updatedTreinos = treinos.map((t) =>
      t.id === selectedTreino.id ? { ...t, exercicios: updatedExercicios } : t
    );

    setTreinos(updatedTreinos);

    setSelectedTreino({ ...selectedTreino, exercicios: updatedExercicios });
    setSelectedExercicio(null);
    setModalVisible(false);
  };

  const handleEdit = (field, value) => {
    setSelectedExercicio({ ...selectedExercicio, [field]: value });
  };

  const handleDelete = async (treinoId, exercicioId) => {
    const treino = treinos.find((treino) => treino.id === treinoId);

    if (!treino) return;

    const updatedExercicios = treino.exercicios.filter(
      (exercicio) => exercicio.id !== exercicioId
    );

    await updateDoc(doc(db, "treinos", treinoId), {
      exercicios: updatedExercicios,
    });

    const updatedTreinos = treinos.map((t) =>
      t.id === treinoId ? { ...t, exercicios: updatedExercicios } : t
    );

    setTreinos(updatedTreinos);
    setSelectedTreino({ ...treino, exercicios: updatedExercicios });
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
              {selectedExercicio ? (
                <View style={styles.exercicioItem}>
                  <Text style={styles.text}>Nome:</Text>
                  <TextInput
                    style={styles.textInput}
                    value={selectedExercicio.nome}
                    onChangeText={(text) => handleEdit("nome", text)}
                  />
                  <Text style={styles.text}>Peso:</Text>
                  <TextInput
                    style={styles.textInput}
                    value={String(selectedExercicio.peso)}
                    onChangeText={(text) => handleEdit("peso", text)}
                  />
                  <Text style={styles.text}>Repetições:</Text>
                  <TextInput
                    style={styles.textInput}
                    value={String(selectedExercicio.repeticoes)}
                    onChangeText={(text) => handleEdit("repeticoes", text)}
                  />
                  <Text style={styles.text}>Séries:</Text>
                  <TextInput
                    style={styles.textInput}
                    value={String(selectedExercicio.series)}
                    onChangeText={(text) => handleEdit("series", text)}
                  />
                  <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: "#8A2BE2" }}
                    onPress={handleSave}
                  >
                    <Text style={styles.buttonText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              ) : selectedTreino ? (
                selectedTreino.exercicios.length > 0 ? (
                  selectedTreino.exercicios.map((exercicio, index) => (
                    <View key={index} style={styles.exercicioItem}>
                      <Text style={styles.text}>Nome: {exercicio.nome}</Text>
                      <Text style={styles.text}>Peso: {exercicio.peso}</Text>
                      <Text style={styles.text}>
                        Repetições: {exercicio.repeticoes}
                      </Text>
                      <Text style={styles.text}>
                        Séries: {exercicio.series}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            ...styles.text,
                            color: "#8A2BE2",
                            textDecorationLine: "underline",
                          }}
                          onPress={() =>
                            handleEditButtonPress(
                              selectedTreino.id,
                              exercicio.id
                            )
                          }
                        >
                          Editar
                        </Text>
                        <Text
                          style={{
                            ...styles.text,
                            color: "#8A2BE2",
                            textDecorationLine: "underline",
                          }}
                          onPress={() =>
                            handleDelete(selectedTreino.id, exercicio.id)
                          }
                        >
                          Excluir
                        </Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.text}>Nenhum exercício encontrado</Text>
                )
              ) : (
                <Text style={styles.text}>Nenhum treino selecionado</Text>
              )}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#232323",
    paddingTop: 50,
    width: "100%",
  },
  textInput: {
    height: 40,
    borderColor: '#000',
    borderWidth: 2, 
    borderRadius: 5, 
    paddingLeft: 10, 
    marginBottom: 15, 
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
    marginTop: "35%",
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
    height: 40,
    borderRadius: 5,
    width: "50%",
    paddingVertical: 10,
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
    backgroundColor: "#8A2BE2",
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
    width: "80%",
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
