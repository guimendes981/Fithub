import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  ScrollView,
} from "react-native";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import Home from "./Home";

export default function TreinoForm({ navigation, route }) {
  const [nome, setNome] = useState("");
  const [exercicio, setExercicio] = useState("");
  const [peso, setPeso] = useState("");
  const [series, setSeries] = useState("");
  const [repeticoes, setRepeticoes] = useState("");
  const [treinos, setTreinos] = useState([]);

  const { userId } = route.params;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const usuario = auth.currentUser; // Obter o usuário atual
      if (usuario) {
        onSnapshot(collection(db, "treinos"), (snapshot) => {
          const newTreinos = [];
          snapshot.forEach((doc) => {
            if (usuario.uid === doc.data().userId) {
              console.log(doc.id, "=>", doc.data());
              newTreinos.push({ id: doc.id, ...doc.data() });
            }
          });
          setTreinos(newTreinos);
        });
      }
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error.message);
    }
  };
  const Selection = ({ selectedValue, setSelectedValue }) => (
    <Picker
      style={styles.picker}
      selectedValue={selectedValue}
      onValueChange={(itemValue) => setSelectedValue(itemValue)}
    >
      <Picker.Item label="Triceps" value="Triceps" />
      <Picker.Item label="Biceps" value="Biceps" />
      <Picker.Item label="Costas" value="Costas" />
      <Picker.Item label="Pernas" value="Pernas" />
      <Picker.Item label="Peito" value="Peito" />
      <Picker.Item label="Abdomen" value="Abdomen" />
    </Picker>
  );

  const handleSalvar = async () => {
    const user = auth.currentUser;
    const novoExercicio = {
      id: Math.random().toString(36).substr(2, 9),
      nome: exercicio,
      peso: peso,
      series: series,
      repeticoes: repeticoes,
    };

    const treinoExistente = treinos.find((treino) => treino.nome === nome);

    if (treinoExistente) {
      // Adiciona o novo exercício ao treino existente
      const atualizadoTreinos = treinos.map((treino) => {
        if (treino.nome === nome) {
          return {
            ...treino,
            exercicios: [...treino.exercicios, novoExercicio],
          };
        }
        return treino;
      });

      setTreinos(atualizadoTreinos);

      // Atualize o Firestore
      const treinoDocRef = doc(db, "treinos", treinoExistente.id);
      await updateDoc(treinoDocRef, {
        exercicios: [...treinoExistente.exercicios, novoExercicio],
      });
    } else {
      // Cria um novo treino
      const novoTreino = {
        userId: user.uid,
        nome: nome,
        exercicios: [novoExercicio],
      };

      const treinoDocRef = await addDoc(collection(db, "treinos"), novoTreino);

      setTreinos([...treinos, { id: treinoDocRef.id, ...novoTreino }]);
    }

    setNome("");
    setExercicio("");
    setPeso("");
    setSeries("");
    setRepeticoes("");
  };

  const allExercises = treinos.flatMap((treino) => treino.exercicios);

  const handleDelete = async (exercicio) => {
    const treino = treinos.find((exercicio) => treino.id === treinoId);
    if (!treino) return;
  
    const updatedExercicios = treino.exercicios.filter(
      (exercicio) => exercicio.nome !== exercicioNome
    );
    console.log(updatedExercicios);
    
    const treinoDocRef = doc(db, "treinos", treinoId);
    await updateDoc(treinoDocRef, { exercicios: updatedExercicios });
  
    const updatedTreinos = treinos.map((treino) =>
      treino.id === treinoId ? { ...treino, exercicios: updatedExercicios } : treino
    );

    setTreinos(updatedTreinos);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="arrow-left" size={30} color="#8A2BE2" style={{marginTop: 30}}/>
        </TouchableOpacity>

      <Text style={styles.title}>
        Adicionar Exercício
      </Text>


        <Selection selectedValue={nome} setSelectedValue={setNome} />
        <TextInput
          placeholder="Nome do Exercício"
          style={styles.input}
          onChangeText={(text) => setExercicio(text)}
          value={exercicio}
        />
        <TextInput
          placeholder="Peso (kg)"
          style={styles.input}
          onChangeText={(text) => setPeso(text)}
          value={peso}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Séries"
          style={styles.input}
          onChangeText={(text) => setSeries(text)}
          value={series}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Repetições"
          style={styles.input}
          onChangeText={(text) => setRepeticoes(text)}
          value={repeticoes}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <FlatList
          data={allExercises}
          ListHeaderComponent={
            <>
              <Text style={styles.title2}>Seus Exercícios</Text>
            </>
          }
          renderItem={({ item }) => (
            <ScrollView>
              <View style={styles.card}>
                <Text style={styles.cardText}>Nome: {item.nome}</Text>
                <Text style={styles.cardText}>Peso: {item.peso}</Text>
                <Text style={styles.cardText}>Séries: {item.series}</Text>
                <Text style={styles.cardText}>
                  Repetições: {item.repeticoes}
                </Text>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Icon
                    name="trash"
                    size={20}
                    color="#900"
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
          keyExtractor={(item, index) => index.toString()}
          />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#232323",
    width: "100%",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  picker: {
    width: "80%",
    height: 40,
    borderColor: "#8A2BE2",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8A2BE2",
    marginBottom: 20,
    marginTop: 60,
  },
  title2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8A2BE2",
    marginTop: 30,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#8A2BE2",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  button: {
    width: "80%",
    height: 40,
    borderRadius: 5,
    backgroundColor: "#8A2BE2",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  treinoItem: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  treinoInfo: {
    flex: 1,
  },
  deleteIcon: {
    marginLeft: 10,
  },
  card: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: "center",
    width: "80%",
  },
  cardText: {
    marginBottom: 10,
  },
});
