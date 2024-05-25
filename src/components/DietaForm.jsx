import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, Alert } from 'react-native';

export default function DietaForm() {
  const [refeicao, setRefeicao] = useState('cafeDaManha');
  const [comida, setComida] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [refeicoesSalvas, setRefeicoesSalvas] = useState({});
  const [error, setError] = useState('');

  const handleInserir = () => {
    setError('');

    if (!comida.trim() || !quantidade.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const validQuantidade = /^[0-9]+(?:ml|L|mg|g|kg)$/;

    if (!validQuantidade.test(quantidade)) {
      setError('A quantidade deve ser um número seguido por "ml", "L", "mg", "g" ou "kg". Exemplo: 250g');
      return;
    }

    const novaRefeicao = { comida, quantidade };
    const refeicoesAtualizadas = { ...refeicoesSalvas, [refeicao]: [...(refeicoesSalvas[refeicao] || []), novaRefeicao] };
    setRefeicoesSalvas(refeicoesAtualizadas);
    console.log('Refeições Atualizadas:', refeicoesAtualizadas);
    setComida('');
    setQuantidade('');
  };

  const handleSalvar = () => {
    console.log('Refeições Salvas:', refeicoesSalvas);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Refeições</Text>
      <Picker
        selectedValue={refeicao}
        style={styles.input}
        onValueChange={(itemValue) => setRefeicao(itemValue)}
      >
        <Picker.Item label="Café da Manhã" value="cafeDaManha" />
        <Picker.Item label="Almoço" value="almoco" />
        <Picker.Item label="Jantar" value="jantar" />
      </Picker>
      <TextInput
        placeholder="Nome da Comida"
        style={styles.input}
        onChangeText={(text) => setComida(text)}
        value={comida}
      />
      <TextInput
        placeholder="Quantidade (ex: 250g)"
        style={styles.input}
        onChangeText={(text) => setQuantidade(text)}
        value={quantidade}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleInserir}>
        <Text style={styles.buttonText}>Inserir</Text>
      </TouchableOpacity>
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
