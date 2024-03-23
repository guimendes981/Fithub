import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigation = useNavigation(); // Obter a função de navegação

  const handleLogin = () => {
    if (!email || !password) {
      setLoginError('Preencha todos os campos.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setLoginError('Email inválido. Por favor, insira um email válido.');
      return;
    }

    // Aqui você pode adicionar a lógica de autenticação
    // Por exemplo, chamar uma função que verifica as credenciais do usuário

    // Após a autenticação bem-sucedida, navegue para a tela Home
    navigation.navigate('Home');

    // Limpar os campos após o login
    setEmail('');
    setPassword('');
    setLoginError('');
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person-outline" size={90} color="#3DEC63" />
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Text style={styles.title}>Senha</Text>
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <Text style={styles.errorText}>{loginError}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  errorText: {
    color: 'red',
    marginTop: 10,
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
});
