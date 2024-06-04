import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { auth, db } from "../services/firebaseConfig";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Card } from 'react-native-paper';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserData();
  }, []);
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
      }
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error.message);
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
{/* 
uid: userCredential.user.uid,
            nome,
            email,
            password,
            idade: parseInt(idade),
            altura: parseFloat(altura),
            peso: parseInt(peso),
            sexo,
            ativo: ativo === "Sim" ? true : false,
            horario,
            nivel,
            selectedDiasSemana,
            objetivo,
            treinou, */}

          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardContent}>
                <Text>Nome: {user.nome}</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Icon name="edit" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardContent}>
                <Text>Email: {user.email}</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Icon name="edit" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
            <Card style={styles.card}>
                <Card.Content>
                <View style={styles.cardContent}>
                    <Text>Idade: {user.idade}</Text>
                    <TouchableOpacity onPress={() => {}}>
                    <Icon name="edit" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                <View style={styles.cardContent}>
                    <Text>Altura: {user.altura}</Text>
                    <TouchableOpacity onPress={() => {}}>
                    <Icon name="edit" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                <View style={styles.cardContent}>
                    <Text>Peso: {user.peso}</Text>
                    <TouchableOpacity onPress={() => {}}>
                    <Icon name="edit" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                <View style={styles.cardContent}>
                    <Text>Sexo: {user.sexo}</Text>
                    <TouchableOpacity onPress={() => {}}>
                    <Icon name="edit" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                <View style={styles.cardContent}>
                    <Text>Ativo: {user.ativo}</Text>
                    <TouchableOpacity onPress={() => {}}>
                    <Icon name="edit" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                <View style={styles.cardContent}>
                    <Text>Horário: {user.horario}</Text>
                    <TouchableOpacity onPress={() => {}}>
                    <Icon name="edit" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                <View style={styles.cardContent}>
                    <Text>Nível: {user.nivel}</Text>
                    <TouchableOpacity onPress={() => {}}>
                    <Icon name="edit" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                <View style={styles.cardContent}>
                    <Text>Objetivo: {user.objetivo}</Text>
                    <TouchableOpacity onPress={() => {}}>
                    <Icon name="edit" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                <View style={styles.cardContent}>
                    <Text>Treinou: {user.treinou}</Text>
                    <TouchableOpacity onPress={() => {}}>
                    <Icon name="edit" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
                </Card.Content>
            </Card>
            
        </View>
      ) : null }
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
    top: 10,
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
});

// 