import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function TreinoForm() {
  const [exercicio, setExercicio] = useState('');
  const [peso, setPeso] = useState('');
  const [series, setSeries] = useState('');
  const [repeticoes, setRepeticoes] = useState('');

  const handleSalvar = () => {
    // Lógica para salvar os dados do treino
    console.log('Exercício:', exercicio);
    console.log('Peso:', peso);
    console.log('Séries:', series);
    console.log('Repetições:', repeticoes);
  };

  const handleInputChange = (value, setState) => {
    // Verificar se o valor é um número antes de atualizar o estado
    if (!isNaN(value)) {
      setState(value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Exercício</Text>
      <TextInput
        placeholder="Nome do Exercício"
        style={styles.input}
        onChangeText={(text) => setExercicio(text)}
        value={exercicio}
      />
      <TextInput
        placeholder="Peso (kg)"
        style={styles.input}
        onChangeText={(text) => handleInputChange(text, setPeso)}
        value={peso}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Séries"
        style={styles.input}
        onChangeText={(text) => handleInputChange(text, setSeries)}
        value={series}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Repetições"
        style={styles.input}
        onChangeText={(text) => handleInputChange(text, setRepeticoes)}
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
});
