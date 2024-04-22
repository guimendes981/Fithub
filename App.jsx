import React, { useState } from 'react';
import LoginForm from './src/components/LoginForm';
import Home from './src/components/Home';
import Navigation from './src/navigation/Navigation';
export default function App() {
  const [user, setUser] = useState(null);
  

  return !user ? <Navigation/> : <LoginForm setUser={setUser} />;
}
