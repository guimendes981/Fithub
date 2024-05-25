import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { auth, db } from "../services/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

const MinhaDieta = ({ visible, onClose }) => {
  const [user, setUser] = useState({});
  const [treinos, setTreinos] = useState([]);

  const fetchUserData = async () => {
    try {
      const usuario = auth.currentUser; // Obter o usuário atual
      if (usuario) {
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
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Meu treino de hoje</Text>
          <FlatList
            data={treinos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.refeicaoText}>Exercício: {item.nome}</Text>
                <Text style={styles.descricaoText}>Peso: {item.peso}</Text>
                <Text style={styles.descricaoText}>Séries: {item.series}</Text>
                <Text style={styles.descricaoText}>Repetições: {item.repeticoes}</Text>
              </View>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 15,
  },
  refeicaoText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  descricaoText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#8A2BE2",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MinhaDieta;
