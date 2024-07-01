import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ImageBackground,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "./NavBar";
import { auth, db } from "../services/firebaseConfig";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import MinhaDieta from "./MinhaDieta";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Home({ navigation }) {
  const motivationalQuotes = [
    "A persistência é o caminho do êxito.",
    "Só existe um êxito: a capacidade de levar a vida que se quer.",
    "O sucesso é ir de fracasso em fracasso sem perder o entusiasmo.",
    "O sucesso nasce do querer, da determinação e persistência em se chegar a um objetivo.",
    "O segredo do sucesso é a constância do propósito.",
    "Quem quer vencer um obstáculo deve armar-se da força do leão e da prudência da serpente.",
    "A coragem não é ausência do medo; é a persistência apesar do medo.",
    "Só é lutador quem sabe lutar consigo mesmo.",
  ];

  const [motivationalQuote, setMotivationalQuote] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [treinos, setTreinos] = useState([]);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
  const [imc, setImc] = useState(null);
  const [igc, setIgc] = useState(null);

  useEffect(() => {
    getRandomQuote();
    fetchUserData(); 

    Animated.timing(fadeAnim, {
      toValue: 1, 
      duration: 2000, 
      useNativeDriver: true, 
    }).start();
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setMotivationalQuote(motivationalQuotes[randomIndex]);
  };

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      const email = user.email;
      const displayName = user.displayName;
      const photoURL = user.photoURL;
      const peso = user.peso;
      console.log("Usuário logado:", uid);
    } else {
      console.log("Usuário deslogado");
    }
  });

  const fetchUserData = async () => {
    try {
      const usuario = auth.currentUser; 
      if (usuario) {
        // const docRef = doc(db, "users", usuario.uid);
        // const docSnap = await getDoc(docRef);

        // console.log("Dados do usuário:", docSnap);

        // if (docSnap.exists()) {
        //   setUser(docSnap.data());
        // } else {
        //   console.log("No such document!");
        // }

        onSnapshot(collection(db, "users"), (snapshot) => {
          snapshot.forEach((doc) => {
            if (usuario.uid === doc.data().uid) {
              console.log(doc.id, "=>", doc.data());

              setUser(doc.data());
            }
          });
        });

        onSnapshot(collection(db, "treinos"), (snapshot) => {
          const newTreinos = [];
          snapshot.forEach((doc) => {
            if (usuario.uid === doc.data().userId) {
              console.log(doc.id, "=>", doc.data());
              newTreinos.push({ id: doc.id, ...doc.data() });
            }
          });
          setTreinos(newTreinos);
        });
      }
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error.message);
    }

    //     import { collection, getDocs } from "firebase/firestore";

    // const querySnapshot = await getDocs(collection(db, "users"));
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    // });
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate("LoginForm"); 
      console.log("Usuário deslogado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

    const calculateIndices = (userData) => {
      const alturaMetros = userData.altura / 100; 
      const imcValue = userData.peso / (alturaMetros * alturaMetros); 
      const igcValue = 1.2 * imcValue + 0.23 * userData.idade - 10.8 * userData.sexo - 5.4;
      setImc(imcValue.toFixed(2));
      setIgc(igcValue.toFixed(2)); 
    };
    
  return (
    <ImageBackground
      source={require("../images/background1.jpg")}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <FontAwesome name="user" size={28} color="#FFF" />
      </TouchableOpacity>

      {/* Menu Suspenso */}
      {dropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.dropdownOption}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.dropdownOption}>Perfil</Text>
          </TouchableOpacity>
        </View>
      )}

      <Animated.Text style={{ ...styles.title, opacity: fadeAnim }}>
        Bem-vindo {user && user.nome} !
      </Animated.Text>

      <View style={{ height: 200, width: "80%", marginBottom: 20 }}>
        <WebView
          style={{ height: 200, width: "100%" }}
          source={{
            html: `
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/K9Ia1CVd0zY"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      `,
          }}
        />
      </View>
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>{motivationalQuote}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)} 
        >
          <Text style={styles.buttonText}>Seu treino de hoje</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.button}
          onPress={
            () => navigation.navigate("TreinoList", { user }) 
          }
        >
          <Text style={styles.buttonText}>Seus treinos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={
            () => navigation.navigate("TreinoForm", { user })
          }
        >
          <Text style={styles.buttonText}>Adicionar treino</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={
            () => navigation.navigate("Biblioteca", { user })
          }
        >
          <Text style={styles.buttonText}>Biblioteca de exercícios</Text>
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

      {/* <Navbar navigation={navigation} handleLogout={handleLogout} /> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232323",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: "20%",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  profileIcon: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  quoteContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
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
  dropdown: {
    position: "absolute",
    top: 80,
    right: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#8A2BE2",
    paddingVertical: 5,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  dropdownOption: {
    fontSize: 16,
    color: "#000",
    paddingVertical: 5,
  },
});
