import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  Modal,
} from "react-native";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setLoginError("Preencha todos os campos.");
      return;
    }

    if (!isValidEmail(email)) {
      setLoginError("Email inválido. Por favor, insira um email válido.");
      return;
    }

    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userDoc = doc(db, "users", user.uid);
        const userData = (await getDoc(userDoc)).data();
        // setUser(userData); 

        setLoading(false);
        console.log("Usuário autenticado:", user);
        navigation.navigate("Home", { userId: user.uid });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoginError(errorMessage);
        setLoading(false);
      });
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handlePasswordReset = () => {
    if (!resetEmail) {
      Alert.alert("Por favor, insira seu endereço de e-mail.");
      return;
    }

    if (!isValidEmail(resetEmail)) {
      Alert.alert("Email inválido. Por favor, insira um email válido.");
      return;
    }

    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        Alert.alert("E-mail de recuperação de senha enviado!");
        setResetEmail("");
        setModalVisible(false); // Fecha o modal após o envio do e-mail
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../images/Logo.png")}
        style={{ width: 300, height: 200 }}
      />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.errorText}>{loginError}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.linkText}>Esqueceu a senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("CadastroForm")}>
        <Text style={styles.linkText}>Cadastrar-se</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Recuperar Senha</Text>
            <TextInput
              placeholder="Digite seu e-mail"
              style={styles.input}
              onChangeText={(text) => setResetEmail(text)}
              value={resetEmail}
            />
            <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.linkText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#232323",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8A2BE2",
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 10,
  },
  label: {
    color: "#8A2BE2",
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    marginTop: 10,
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
    color: "white",
    fontWeight: "bold",
  },
  linkText: {
    color: "#8A2BE2",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default LoginForm;
