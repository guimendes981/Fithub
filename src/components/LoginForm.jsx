import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";


const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [resetEmail, setResetEmail] = useState("");


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
        // Autenticado com sucesso
        const user = userCredential.user;
        // Obter os dados do usuário do Firestore
        const userDoc = doc(db, "users", user.uid);
        const userData = (await getDoc(userDoc)).data();
        // Armazenar os dados do usuário em algum estado ou contexto global
        setUser(userData); // Definir setUser como a função para atualizar o estado do usuário

        setLoading(false);
        console.log("Usuário autenticado:", user);
        navigation.navigate('Home', { userId: user.uid }); })
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
      Alert.alert("Please enter your email address.");
      return;
    }

    if (!isValidEmail(resetEmail)) {
      Alert.alert("Invalid email. Please enter a valid email.");
      return;
    }

    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        Alert.alert("Password reset email sent!");
        setResetEmail("");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  return (
   <>
   
      <View style={styles.container}>
  <Ionicons name="person-outline" size={90} color="#8A2BE2" />
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

      <TouchableOpacity onPress={() => Alert.prompt(
        "Password Reset",
        "Enter your email to receive a password reset link.",
        [
          { text: "Cancel" },
          { text: "Submit", onPress: (email) => { setResetEmail(email); handlePasswordReset(); } }
        ],
        "plain-text"
      )}>
        <Text style={styles.linkText}>Recuperar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("CadastroForm")}>
        <Text style={styles.linkText}>Cadastrar-se</Text>
      </TouchableOpacity>

    </View>
   </>  
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
});

export default LoginForm;
