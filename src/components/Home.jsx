import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MinhaDieta from "./MinhaDieta";
import { auth, db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Navigation from "../navigation/Navigation";

export default function Home({ navigation }) {
  const motivationalQuotes = [
    "A persistência é o caminho do êxito.",
    "Só existe um êxito: a capacidade de levar a vida que se quer.",
    "O sucesso é ir de fracasso em fracasso sem perder o entusiasmo.",
    // Outras citações motivacionais aqui
  ];

  const [motivationalQuote, setMotivationalQuote] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getRandomQuote();
    fetchUserData(); // Chama a função para recuperar os dados do usuário ao montar o componente
  }, []);

  

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setMotivationalQuote(motivationalQuotes[randomIndex]);
  };

  const usuario = auth.currentUser;


  //get usuario data from firestore

  const fetchUserData = async () => {
    try {
      const usuario = auth.currentUser; // Obter o usuário atual
      if (usuario) {
        const userData = await getUserData(usuario.uid); // Passar o uid do usuário
        setUser(userData); // Atualizar o estado do usuário
      }
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error.message);
    }
  };


async function getUserData(userId) {
  try {
    console.log(`Fetching user with ID: ${userId}`); // Log the user ID
    const docRef = doc(db, "users", userId);
    console.log(`Document path: ${docRef.path}`); // Log the document path
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data(); // Return the user data
    } else {
      console.log("No such document!");
      return null; // Return null if no document is found
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
    throw error; // Re-throw the error to ensure it's caught by any calling function
  }
}

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Desloga o usuário
      // navigation.navigate("LoginForm"); // Redireciona para a tela de login após o logout
      navigation.navigate("CadastroForm"); // Redireciona para a tela de login após o logout
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => setDropdownVisible(!dropdownVisible)} // Toggle para mostrar/ocultar o menu suspenso
      >
        <Ionicons name="person" size={24} color="#8A2BE2" />
      </TouchableOpacity>

      {/* Menu Suspenso */}
      {dropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.dropdownOption}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.title}>Bem-vindo {usuario.displayName} !</Text>

      <View style={styles.additionalContent}>
        <Text style={styles.additionalTitle}>Dicas Rápidas:</Text>
        <Text style={styles.additionalText}>
          Beber água regularmente ajuda a manter o corpo hidratado e a pele
          saudável.
        </Text>
      </View>

      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>{motivationalQuote}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("TreinoForm")}
        >
          <Text style={styles.buttonText}>Seu Treino</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)} // Abre o modal ao pressionar
        >
          <Text style={styles.buttonText}>Sua Dieta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Academias")}
        >
          <Text style={styles.buttonText}>Academias Próximas</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Minha Dieta */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <MinhaDieta onClose={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232323",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    color: "#8A2BE2",
    fontWeight: "bold",
    marginBottom: "20%",
  },
  profileIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  quoteContainer: {
    backgroundColor: "#232323",
    borderWidth: 3,
    borderColor: "#8A2BE2",
    borderRadius: 5,
    width: "80%",
    marginBottom: 20,
    padding: 10,
  },
  quoteText: {
    fontSize: 18,
    color: "#FFF",
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    width: "80%",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#8A2BE2",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    activeOpacity: 0.8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  additionalContent: {
    width: "80%",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#8A2BE2",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  additionalTitle: {
    fontSize: 20,
    color: "#8A2BE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  additionalText: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
  },
  dropdown: {
    position: "absolute",
    top: 40, // Ajuste conforme necessário
    right: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#8A2BE2",
    paddingVertical: 5,
    paddingHorizontal: 10,
    zIndex: 1, // Para ficar na frente de outros elementos
  },
  dropdownOption: {
    fontSize: 16,
    color: "#000",
    paddingVertical: 5,
  },
});
