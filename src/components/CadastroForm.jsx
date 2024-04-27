import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../services/firebaseConfig";
import { addDoc, collection } from 'firebase/firestore';


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
  const [sexoOptionsVisible, setSexoOptionsVisible] = useState(false);
  const [ativoOptionsVisible, setAtivoOptionsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleCadastro = () => {
    // Verificações dos campos
    if (!isValidEmail(email)) {
      setCadastrarError('Email inválido');
      return;
    }
    if (!idade.match(/^\d+$/)) {
      setCadastrarError('Idade deve conter apenas números');
      return;
    }
    if (!altura.match(/^\d+(\.|,)?\d*$/) && !altura.match(/^\d+$/)) {
      setCadastrarError('Altura inválida');
      return;
    }
    if (!peso.match(/^\d+$/)) {
      setCadastrarError('Peso deve conter apenas números');
      return;
    }
  
    // Dados válidos, prossegue com o cadastro
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          nome,
          email,
          password,
          idade: parseInt(idade),
          altura: parseFloat(altura),
          peso: parseInt(peso),
          sexo,
          ativo: ativo === 'Sim' ? true : false,
        });
        
        console.log("Document written with ID: ", docRef.id);
        
        navigation.navigate('LoginForm'); // Substitua 'LoginForm' pelo nome correto do componente de login
      } catch (error) {
        console.error("Error adding document: ", error);
        setCadastrarError('Erro ao cadastrar usuário');
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setCadastrarError(errorMessage);
    });
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const toggleSexoOptions = () => {
    setSexoOptionsVisible(!sexoOptionsVisible);
    setAtivoOptionsVisible(false); // Fechar opções de ativo se estiverem abertas
  };

  const toggleAtivoOptions = () => {
    setAtivoOptionsVisible(!ativoOptionsVisible);
    setSexoOptionsVisible(false); // Fechar opções de sexo se estiverem abertas
  };

  const selectSexoOption = (selectedSexo) => {
    setSexo(selectedSexo);
    setSexoOptionsVisible(false);
  };

  const selectAtivoOption = (selectedAtivo) => {
    setAtivo(selectedAtivo);
    setAtivoOptionsVisible(false);
  };

  const handleNomeChange = (text) => {
    setNome(text.replace(/[^a-zA-Z\s]/g, ''));
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleIdadeChange = (text) => {
    setIdade(text.replace(/[^\d]/g, ''));
  };

  const handleAlturaChange = (text) => {
    setAltura(text.replace(/[^0-9.,]/g, ''));
  };

  const handlePesoChange = (text) => {
    setPeso(text.replace(/[^\d]/g, ''));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscreva-se</Text>
      <TextInput
        placeholder="Nome"
        style={[styles.input, focusedField === 'nome' && styles.inputFocused]}
        onFocus={() => setFocusedField('nome')}
        onBlur={() => setFocusedField('')}
        onChangeText={handleNomeChange}
        value={nome}
      />
      <TextInput
        placeholder="Email"
        style={[styles.input, focusedField === 'email' && styles.inputFocused]}
        onFocus={() => setFocusedField('email')}
        onBlur={() => setFocusedField('')}
        onChangeText={handleEmailChange}
        value={email}
      />
      <TextInput
        placeholder="Senha"
        style={[styles.input, focusedField === 'password' && styles.inputFocused]}
        onFocus={() => setFocusedField('password')}
        onBlur={() => setFocusedField('')}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <View style={styles.inlineInputs}>
        <TextInput
          placeholder="Idade"
          style={[styles.input, styles.inlineInput, focusedField === 'idade' && styles.inputFocused]}
          onFocus={() => setFocusedField('idade')}
          onBlur={() => setFocusedField('')}
          onChangeText={handleIdadeChange}
          value={idade}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Altura (cm)"
          style={[styles.input, styles.inlineInput, focusedField === 'altura' && styles.inputFocused]}
          onFocus={() => setFocusedField('altura')}
          onBlur={() => setFocusedField('')}
          onChangeText={handleAlturaChange}
          value={altura}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inlineInputs}>
        <TextInput
          placeholder="Peso"
          style={[styles.input, styles.inlineInput, focusedField === 'peso' && styles.inputFocused]}
          onFocus={() => setFocusedField('peso')}
          onBlur={() => setFocusedField('')}
          onChangeText={handlePesoChange}
          value={peso}
          keyboardType="numeric"
        />
        <View style={[styles.input, styles.inlineInput, focusedField === 'sexo' && styles.inputFocused]}>
          <TouchableOpacity onPress={toggleSexoOptions}>
            <View style={styles.selectContainer}>
              <Text>{sexo || 'Sexo (M/F)'}</Text>
              <Ionicons name={sexoOptionsVisible ? 'chevron-up' : 'chevron-down'} size={24} color="#000" />
            </View>
          </TouchableOpacity>
          {sexoOptionsVisible && (
            <View style={styles.optionsContainer}>
              <TouchableOpacity onPress={() => selectSexoOption('Masculino')}>
                <Text>Masculino</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectSexoOption('Feminino')}>
                <Text>Feminino</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={styles.inlineInputs}>
        <View style={[styles.input, styles.inlineInput, focusedField === 'ativo' && styles.inputFocused]}>
          <TouchableOpacity onPress={toggleAtivoOptions}>
            <View style={styles.selectContainer}>
              <Text>{ativo || 'Ativo (Sim/Não)'}</Text>
              <Ionicons name={ativoOptionsVisible ? 'chevron-up' : 'chevron-down'} size={24} color="#000" />
            </View>
          </TouchableOpacity>
          {ativoOptionsVisible && (
            <View style={styles.optionsContainer}>
              <TouchableOpacity onPress={() => selectAtivoOption('Sim')}>
                <Text>Ativo</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectAtivoOption('Não')}>
                <Text>Sedentário</Text>
              </TouchableOpacity>
            </View>
          )}
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
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232323',
    width: '100%',
    
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
  inputFocused: {
    borderColor: '#8A2BE2',
  },
  inlineInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20, // Aumenta o espaçamento vertical
  },
  inlineInput: {
    width: '48%', 
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
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  optionsContainer: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#8A2BE2',
    borderRadius: 5,
    zIndex: 9999999,
  },
});
