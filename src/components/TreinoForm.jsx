import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";

export default function TreinoForm({ navigation, route }) {
  const [nome, setNome] = useState("");
  const [exercicio, setExercicio] = useState("");
  const [peso, setPeso] = useState("");
  const [series, setSeries] = useState("");
  const [repeticoes, setRepeticoes] = useState("");
  const [treinos, setTreinos] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
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

      const treinoDocRef = doc(db, "treinos", treinoExistente.id);
      await updateDoc(treinoDocRef, {
        exercicios: [...treinoExistente.exercicios, novoExercicio],
      });
    } else {
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

    ToastAndroid.show("Exercício cadastrado com sucesso!", ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="arrow-left" size={30} color="#8A2BE2" style={{ marginTop: 30 }} />
      </TouchableOpacity>

      <Text style={styles.title}>Adicionar Exercício</Text>

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
    </View>
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
});
