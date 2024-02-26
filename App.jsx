import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CadastroForm from './src/components/CadastroForm';
import BottomBar from './src/components/BottomBar';
import Home from './src/components/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <Home/>
      <BottomBar />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
