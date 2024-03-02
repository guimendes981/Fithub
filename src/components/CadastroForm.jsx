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
  const [sexoOptionsVisible, setSexoOptionsVisible] = useState(false);

  const handleCadastro = () => {
    // Lógica de cadastro...
  };

  const toggleSexoOptions = () => {
    setSexoOptionsVisible(!sexoOptionsVisible);
  };

  const selectSexoOption = (selectedSexo) => {
    setSexo(selectedSexo);
    setSexoOptionsVisible(false);
  };

  return (
    <View style={styles.container}>
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
      <View style={[styles.inlineInputs, { marginBottom: 20 }]}> {/* Ajuste de margem inferior */}
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
    flex: 1,
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
  inlineInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
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
