import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CadastroForm({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idade, setIdade] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [sexo, setSexo] = useState('');
  const [ativo, setAtivo] = useState('');
  const [cadastrarError, setCadastrarError] = useState('');

  const handleCadastro = () => {
    if (!nome || !email || !password || !idade || !altura || !peso || !sexo || !ativo) {
      setCadastrarError('Preencha todos os campos.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setCadastrarError('Email inválido. Por favor, insira um email válido.');
      return;
    }

    if (parseInt(idade) <= 12) {
      setCadastrarError('Idade deve ser maior que 12.');
      return;
    }

    if (parseInt(altura) <= 0) {
      setCadastrarError('Altura deve ser maior que 0.');
      return;
    }

    switch (sexo) {
      case 'M':
        setSexo('Masculino');
        break;
      case 'F':
        setSexo('Feminino');
        break;
      default:
    }

    switch (ativo) {
      case 'Sim':
        setAtivo('Ativo');
        break;
      case 'Não':
        setAtivo('Sedentário');
        break;
      default:
    }

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View>
        
      </View>
      <Text style={styles.title}>Inscreva-se</Text>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        onChangeText={(text) => setNome(text)}
        value={nome}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <View style={styles.inlineInputs}>
        <TextInput
          placeholder="Idade"
          style={[styles.input, styles.inlineInput]}
          onChangeText={(text) => setIdade(text)}
          value={idade}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Altura (cm)"
          style={[styles.input, styles.inlineInput]}
          onChangeText={(text) => setAltura(text)}
          value={altura}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inlineInputs}>
        <TextInput
          placeholder="Peso"
          style={[styles.input, styles.inlineInput]}
          onChangeText={(text) => setPeso(text)}
          value={peso}
          keyboardType="numeric"
        />
        <View style={[styles.input, styles.inlineInput]}>
          <TouchableOpacity onPress={() => setSexo('M')}>
            <View style={styles.selectContainer}>
              <Text>{sexo === 'M' ? 'Masculino' : sexo === 'F' ? 'Feminino' : 'Sexo (M/F)'}</Text>
              <Ionicons name="chevron-down" size={24} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inlineInputs}>
        <View style={[styles.input, styles.input]}>
          <TouchableOpacity onPress={() => setAtivo('Sim')}>
            <View style={styles.selectContainer}>
              <Text>{ativo === 'Sim' ? 'Ativo' : ativo === 'Não' ? 'Sedentário' : 'Ativo (Sim/Não)'}</Text>
              <Ionicons name="chevron-down" size={24} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <Text style={styles.errorText}>{cadastrarError}</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232323',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3DEC63',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  inlineInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  inlineInput: {
    width: '48%', 
  },
  bottomInput: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  selectContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#3DEC63',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#3DEC63',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    color: '#FFF',
    marginTop: 5,
  },
});