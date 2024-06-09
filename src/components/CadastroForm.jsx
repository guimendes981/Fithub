import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../services/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export default function CadastroForm({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idade, setIdade] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [sexo, setSexo] = useState("");
  const [ativo, setAtivo] = useState("");
  const [horario, setHorario] = useState("");
  const [nivel, setNivel] = useState("");
  const [selectedDiasSemana, setSelectedDiasSemana] = useState([]);
  const [objetivo, setObjetivo] = useState("");
  const [treinou, setTreinou] = useState(false);
  const [cadastrarError, setCadastrarError] = useState("");
  const [sexoOptionsVisible, setSexoOptionsVisible] = useState(false);
  const [ativoOptionsVisible, setAtivoOptionsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleCadastro = () => {
    if (!isValidEmail(email)) {
      setCadastrarError("Email inválido");
      return;
    }
    if (!idade.match(/^\d+$/)) {
      setCadastrarError("Idade deve conter apenas números");
      return;
    }
    if (!altura.match(/^\d+(\.|,)?\d*$/) && !altura.match(/^\d+$/)) {
      setCadastrarError("Altura inválida");
      return;
    }
    if (!peso.match(/^\d+$/)) {
      setCadastrarError("Peso deve conter apenas números");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        try {
          await updateProfile(auth.currentUser, {
            displayName: nome,
            idade: idade,
            altura: altura,
            peso: peso,
            sexo: sexo,
            ativo: ativo === "Sim" ? true : false,
            horario: horario,
            nivel: nivel,
            selectedDiasSemana: selectedDiasSemana,
            objetivo: objetivo,
            treinou: treinou,
          });

          const docRef = await addDoc(collection(db, "users"), {
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
            treinou,
          });

          console.log("Document written with ID: ", docRef.id);

          navigation.navigate("LoginForm");
        } catch (error) {
          console.error("Error adding document: ", error);
          setCadastrarError("Erro ao cadastrar usuário");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setCadastrarError(errorMessage);
      });
      

      console.log(peso);
    };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const toggleSexoOptions = () => {
    setSexoOptionsVisible(!sexoOptionsVisible);
    setAtivoOptionsVisible(false); 
  };

  const toggleAtivoOptions = () => {
    setAtivoOptionsVisible(!ativoOptionsVisible);
    setSexoOptionsVisible(false);
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
    setNome(text.replace(/[^a-zA-Z\s]/g, ""));
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleIdadeChange = (text) => {
    setIdade(text.replace(/[^\d]/g, ""));
  };

  const handleAlturaChange = (text) => {
    setAltura(text.replace(/[^0-9.,]/g, ""));
  };

  const handlePesoChange = (text) => {
    setPeso(text.replace(/[^\d]/g, ""));
  };

  const handleDiaSemanaSelection = (dia) => {
    if (selectedDiasSemana.includes(dia)) {
      setSelectedDiasSemana(selectedDiasSemana.filter((item) => item !== dia));
    } else {
      setSelectedDiasSemana([...selectedDiasSemana, dia]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inscreva-se</Text>

      <Text style={styles.label}>Qual é o seu nome?</Text>
      <TextInput
        placeholder="Nome"
        style={[styles.input, focusedField === "nome" && styles.inputFocused]}
        onFocus={() => setFocusedField("nome")}
        onBlur={() => setFocusedField("")}
        onChangeText={handleNomeChange}
        value={nome}
      />

      <Text style={styles.label}>Qual é o seu email?</Text>
      <TextInput
        placeholder="Email"
        style={[styles.input, focusedField === "email" && styles.inputFocused]}
        onFocus={() => setFocusedField("email")}
        onBlur={() => setFocusedField("")}
        onChangeText={handleEmailChange}
        value={email}
      />

      <Text style={styles.label}>Insira sua senha</Text>
      <TextInput
        placeholder="Senha"
        style={[
          styles.input,
          focusedField === "password" && styles.inputFocused,
        ]}
        onFocus={() => setFocusedField("password")}
        onBlur={() => setFocusedField("")}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <Text style={styles.label}>Qual sua idade?</Text>
      <TextInput
        placeholder="Idade"
        style={[styles.input, focusedField === "idade" && styles.inputFocused]}
        onFocus={() => setFocusedField("idade")}
        onBlur={() => setFocusedField("")}
        onChangeText={handleIdadeChange}
        value={idade}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Qual é o sua altura em cm?</Text>
      <TextInput
        placeholder="Altura (cm)"
        style={[styles.input, focusedField === "altura" && styles.inputFocused]}
        onFocus={() => setFocusedField("altura")}
        onBlur={() => setFocusedField("")}
        onChangeText={handleAlturaChange}
        value={altura}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Qual é o peso?</Text>
      <TextInput
        placeholder="Peso"
        style={[styles.input, focusedField === "peso" && styles.inputFocused]}
        onFocus={() => setFocusedField("peso")}
        onBlur={() => setFocusedField("")}
        onChangeText={handlePesoChange}
        value={peso}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Qual é o seu sexo?</Text>
      <View
        style={[styles.input, focusedField === "sexo" && styles.inputFocused]}
      >
        <TouchableOpacity onPress={toggleSexoOptions}>
          <View style={styles.selectContainer}>
            <Text>{sexo || "Sexo (M/F)"}</Text>
            <Ionicons
              name={sexoOptionsVisible ? "chevron-up" : "chevron-down"}
              size={24}
              color="#000"
            />
          </View>
        </TouchableOpacity>
        {sexoOptionsVisible && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={() => selectSexoOption("Masculino")}>
              <Text>Masculino</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectSexoOption("Feminino")}>
              <Text>Feminino</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.label}>Pratica atividade física?</Text>
      <View
        style={[styles.input, focusedField === "ativo" && styles.inputFocused]}
      >
        <TouchableOpacity onPress={toggleAtivoOptions}>
          <View style={styles.selectContainer}>
            <Text>{ativo || "Ativo (Sim/Não)"}</Text>
            <Ionicons
              name={ativoOptionsVisible ? "chevron-up" : "chevron-down"}
              size={24}
              color="#000"
            />
          </View>
        </TouchableOpacity>
        {ativoOptionsVisible && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={() => selectAtivoOption("Sim")}>
              <Text>Ativo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectAtivoOption("Não")}>
              <Text>Sedentário</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.label}>Em qual horário pretende treinar?</Text>
      <TextInput
        placeholder="Horário"
        style={[
          styles.input,
          focusedField === "horario" && styles.inputFocused,
        ]}
        onFocus={() => setFocusedField("horario")}
        onBlur={() => setFocusedField("")}
        onChangeText={(text) => setHorario(text)}
        value={horario}
      />

      <Text style={styles.label}>Qual é o seu nível de treino?</Text>
      <TextInput
        placeholder="Nível"
        style={[styles.input, focusedField === "nivel" && styles.inputFocused]}
        onFocus={() => setFocusedField("nivel")}
        onBlur={() => setFocusedField("")}
        onChangeText={(text) => setNivel(text)}
        value={nivel}
      />

      <Text style={styles.label}>
        Selecione os dias da semana que irá treinar
      </Text>
      <View style={styles.selectContainer}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleDiaSemanaSelection("Segunda")}
        >
          <Ionicons
            name={
              selectedDiasSemana.includes("Segunda")
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={24}
            color="#FFF"
          />
          <Text style={styles.radioText}>Segunda</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleDiaSemanaSelection("Terça")}
        >
          <Ionicons
            name={
              selectedDiasSemana.includes("Terça")
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={24}
            color="#FFF"
          />
          <Text style={styles.radioText}>Terça</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleDiaSemanaSelection("Quarta")}
        >
          <Ionicons
            name={
              selectedDiasSemana.includes("Quarta")
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={24}
            color="#FFF"
          />
          <Text style={styles.radioText}>Quarta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleDiaSemanaSelection("Quinta")}
        >
          <Ionicons
            name={
              selectedDiasSemana.includes("Quinta")
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={24}
            color="#FFF"
          />
          <Text style={styles.radioText}>Quinta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleDiaSemanaSelection("Sexta")}
        >
          <Ionicons
            name={
              selectedDiasSemana.includes("Sexta")
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={24}
            color="#FFF"
          />
          <Text style={styles.radioText}>Sexta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleDiaSemanaSelection("Sábado")}
        >
          <Ionicons
            name={
              selectedDiasSemana.includes("Sábado")
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={24}
            color="#FFF"
          />
          <Text style={styles.radioText}>Sábado</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleDiaSemanaSelection("Domingo")}
        >
          <Ionicons
            name={
              selectedDiasSemana.includes("Domingo")
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={24}
            color="#FFF"
          />
          <Text style={styles.radioText}>Domingo</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Objetivo"
        style={[
          styles.input,
          focusedField === "objetivo" && styles.inputFocused,
        ]}
        onFocus={() => setFocusedField("objetivo")}
        onBlur={() => setFocusedField("")}
        onChangeText={(text) => setObjetivo(text)}
        value={objetivo}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <Text style={styles.errorText}>{cadastrarError}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#232323",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8A2BE2",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8A2BE2",
    marginBottom: 5,
    zIndex: -1,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#8A2BE2",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  inputFocused: {
    borderColor: "#8A2BE2",
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
    color: "#FFF",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  selectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 10,
  },
  radioText: {
    fontSize: 16,
    color: "#FFF",
    marginLeft: 5,
  },
  optionsContainer: {
    position: "absolute",
    top: "100%",
    width: "100%",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#8A2BE2",
    borderRadius: 5,
    zIndex: 9999, 
  },
});
