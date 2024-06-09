import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Modal, TextInput } from "react-native";
import { auth, db } from "../services/firebaseConfig";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Card } from 'react-native-paper';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const usuario = auth.currentUser;
      if (usuario) {
        onSnapshot(collection(db, "users"), (snapshot) => {
          snapshot.forEach((doc) => {
            if (usuario.uid === doc.data().uid) {
              setUser({ id: doc.id, ...doc.data() });
            }
          });
        });
      }
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error.message);
    }
  };

  const handleEdit = (field, value) => {
    setEditField(field);
    setEditValue(value);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.id);
      await updateDoc(userDocRef, {
        [editField]: editValue,
      });
      setUser({ ...user, [editField]: editValue });
      setModalVisible(false);
    }
  };

  return (
    <ImageBackground
      source={require("../images/background1.jpg")}
      style={styles.container}
    >
      <View style={styles.topLeft}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="arrow-back" size={30} color="#8A2BE2" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Perfil do Usuário</Text>
      {user ? (
        <View style={styles.userInfo}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardContent}>
                <Text>Nome: {user.nome}</Text>
                <TouchableOpacity onPress={() => handleEdit("nome", user.nome)}>
                  <Icon name="edit" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardContent}>
                <Text>Email: {user.email}</Text>
                <TouchableOpacity onPress={() => handleEdit("email", user.email)}>
                  <Icon name="edit" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardContent}>
                <Text>Idade: {user.idade}</Text>
                <TouchableOpacity onPress={() => handleEdit("idade", user.idade)}>
                  <Icon name="edit" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardContent}>
                <Text>Altura: {user.altura}</Text>
                <TouchableOpacity onPress={() => handleEdit("altura", user.altura)}>
                  <Icon name="edit" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardContent}>
                <Text>Peso: {user.peso}</Text>
                <TouchableOpacity onPress={() => handleEdit("peso", user.peso)}>
                  <Icon name="edit" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardContent}>
                <Text>Sexo: {user.sexo}</Text>
                <TouchableOpacity onPress={() => handleEdit("sexo", user.sexo)}>
                  <Icon name="edit" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        </View>
      ) : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Editar {editField}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEditValue}
              value={editValue}
              placeholder={`Novo ${editField}`}
            />
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#8A2BE2" }}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#FF0000" }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topLeft: {
    position: "absolute",
    top: 30,
    left: 10,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userInfo: {
    width: '100%',
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    width: 200,
    paddingHorizontal: 10,
  },
  button: {
    padding: 10,
    margin: 10,
    height: 40,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
  },
});
