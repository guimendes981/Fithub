import React, { useState } from 'react';
import LoginForm from './src/components/LoginForm';
import Home from './src/components/Home';
import CadastroForm from './src/components/CadastroForm';
import TreinoForm from './src/components/TreinoForm';
import Navigation from './src/navigation/Navigation';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Navigation user={user} updateUser={setUser} />
  );
}