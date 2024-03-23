import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const MinhaDieta = ({ visible, onClose }) => {
  const [refeicoes, setRefeicoes] = useState([]);

  // Exemplo de dados de refeições (pode ser obtido de um banco de dados, API, etc.)
  const dadosRefeicoes = [
    { id: 1, refeicao: 'Café da Manhã', descricao: 'Pão integral, ovos, frutas' },
    { id: 2, refeicao: 'Almoço', descricao: 'Arroz, feijão, frango grelhado, salada' },
    { id: 3, refeicao: 'Lanche da Tarde', descricao: 'Iogurte natural, castanhas' },
    { id: 4, refeicao: 'Jantar', descricao: 'Peixe assado, batatas, legumes cozidos' },
  ];

  useEffect(() => {
    // Simula a obtenção de dados de refeições (pode ser uma chamada API, consulta ao banco de dados, etc.)
    setRefeicoes(dadosRefeicoes);
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
          <Text style={styles.title}>Minha Dieta</Text>
          <FlatList
            data={refeicoes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.refeicaoText}>{item.refeicao}</Text>
                <Text style={styles.descricaoText}>{item.descricao}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 15,
  },
  refeicaoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descricaoText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#8A2BE2',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MinhaDieta;
