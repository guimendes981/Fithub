import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import Home from "./Home";

export default function TreinoForm(user) {
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
      const usuario = auth.currentUser; // Obter o usuário atual
      if (usuario) {
        // const docRef = doc(db, "users", usuario.uid);
        // const docSnap = await getDoc(docRef);

        // console.log("Dados do usuário:", docSnap);

        // if (docSnap.exists()) {
        //   setUser(docSnap.data());
        // } else {
        //   console.log("No such document!");
        // }

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

  //     import { collection, getDocs } from "firebase/firestore";

  // const querySnapshot = await getDocs(collection(db, "users"));
  // querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id} => ${doc.data()}`);
  // });
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

  const handleSalvar = async (usuario) => {
    // Criar um objeto contendo os dados do formulário de treino
    const user = auth.currentUser;
    const treinoData = {
      userId: user.uid,
      nome: nome,
      exercicios: [
        {
          nome: exercicio,
          peso: peso,
          series: series,
          repeticoes: repeticoes,
        },
      ],
      // exercicio: exercicio,
      // peso: peso,
      // series: series,
      // repeticoes: repeticoes,
    };

    // Add the training data to Firestore
    const treinoDocRef = await addDoc(collection(db, "treinos"), treinoData);

    //update the user's treino colelction
    const userDocRef = doc(db, "users", user.uid);
    await addDoc(collection(userDocRef, "treinos"), {
      id: treinoDocRef.id,
      ...treinoData,
    });

    console.log("Training document written with ID: ", treinoDocRef.id);

    // Adicionar o novo treino ao array de treinos com the document ID
    setTreinos([...treinos, { id: treinoDocRef.id, ...treinoData }]);

    // Limpar o formulário
    setNome("");
    setExercicio("");
    setPeso("");
    setSeries("");
    setRepeticoes("");
  };

  console.log("====================================");
  console.log("Treinos:", treinos);
  console.log("====================================");

  const allExercises = treinos.flatMap((treino) => treino.exercicios);

  const handleDelete = async (id) => {
    const treinoRef = doc(db, 'treinos', id);
  
    try {
      await deleteDoc(treinoRef);
      console.log(`Treino with id ${id} has been deleted.`);
    } catch (e) {
      console.error('Error deleting treino: ', e);
    }
  };

  return (
    <ImageBackground
    source={require("../images/background1.jpg")}
    style={styles.container}
  >
           <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="arrow-left" size={30} color="#900" />
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
      <Animatable.View
        animation="fadeIn"
        duration={2000}
        // style={styles.treinoItem}
      >
        <FlatList
          data={allExercises}
          // keyExtractor={( item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.treinoItem}>
              <View style={styles.treinoInfo}>
                <Text>Exercício: {item.nome}</Text>
                <Text>Peso: {item.peso}</Text>
                <Text>Séries: {item.series}</Text>
                <Text>Repetições: {item.repeticoes}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={styles.deleteIcon}
              >
                <Icon name="trash" size={30} color="#900" />
              </TouchableOpacity>
            </View>
          )}
        />
      </Animatable.View>
    </ImageBackground>
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
  backButton: {
    position: 'absolute',
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
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8A2BE2",
    marginBottom: 20,
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
});
