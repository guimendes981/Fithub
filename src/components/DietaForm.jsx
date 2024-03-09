import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function DietaForm() {
  const [comida, setComida] = useState('');
  const [calorias, setCalorias] = useState('');

  const API_ID = '1db24f7c';
  const API_KEY = '5bd662befc20bce221cab14348be8808';

  const handleBuscarCalorias = async () => {
    try {
      const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=${API_ID}&app_key=${API_KEY}&ingr=${comida}`);
      const data = await response.json();
      // Verificar se os dados foram retornados corretamente e se contêm informações de calorias
      if (data.totalNutrients && data.totalNutrients.ENERC_KCAL) {
        // Extrair as calorias médias da resposta da API e atualizar o estado
        setCalorias(data.totalNutrients.ENERC_KCAL.quantity / data.yield);
      } else {
        console.error('Erro ao buscar as calorias: Dados da API incompletos.');
      }
    } catch (error) {
      console.error('Erro ao buscar as calorias:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Calorias</Text>
      <TextInput
        placeholder="Comida"
        style={styles.input}
        onChangeText={(text) => setComida(text)}
        value={comida}
      />
      <TouchableOpacity style={styles.button} onPress={handleBuscarCalorias}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      {calorias !== '' && (
        <Text style={styles.resultText}>Quantidade Média de Calorias: {calorias.toFixed(2)}</Text>
      )}
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
  resultText: {
    marginTop: 20,
    fontSize: 18,
    color: '#FFF',
  },
});
