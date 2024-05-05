import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore"; 
import { auth, db } from "../services/firebaseConfig";
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TreinoForm() {
  const [nome, setNome] = useState('');
  const [exercicio, setExercicio] = useState('');
  const [peso, setPeso] = useState('');
  const [series, setSeries] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [treinos, setTreinos] = useState([]); 

  const handleSalvar = async () => {
    // Criar um objeto contendo os dados do formulário de treino
    const treinoData = {
      nome: nome,
      exercicio: exercicio,
      peso: peso,
      series: series,
      repeticoes: repeticoes,
    };
  
    // Add the training data to Firestore
    const treinoDocRef = await addDoc(collection(db, "treinos"), treinoData);
  
    console.log("Training document written with ID: ", treinoDocRef.id);
  
    // Adicionar o novo treino ao array de treinos com the document ID
    setTreinos([...treinos, { id: treinoDocRef.id, ...treinoData }]);
  
    // Limpar o formulário
    setNome('');
    setExercicio('');
    setPeso('');
    setSeries('');
    setRepeticoes('');
  };

  const handleDelete = async (id) => {
    // Delete the training document from Firestore
    await deleteDoc(doc(db, "treinos", id));

    // Remove the training from the local state
    setTreinos(treinos.filter(treino => treino.id !== id));

    console.log("Training document deleted with ID: ", id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Exercício</Text>
      <TextInput
        placeholder="Nome do Treino"
        style={styles.input}
        onChangeText={(text) => setNome(text)}
        value={nome}
      />
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
      <Animatable.View animation="fadeIn" duration={2000} style={styles.treinoItem}>
        <FlatList
          data={treinos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.treinoItem}>
              <View style={styles.treinoInfo}>
                <Text>Exercício: {item.exercicio}</Text>
                <Text>Peso: {item.peso}</Text>
                <Text>Séries: {item.series}</Text>
                <Text>Repetições: {item.repeticoes}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteIcon}>
                <Icon name="trash" size={30} color="#900" />
              </TouchableOpacity>
            </View>
          )}
        />
      </Animatable.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232323',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#8A2BE2',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  button: {
    width: '80%',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  treinoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
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