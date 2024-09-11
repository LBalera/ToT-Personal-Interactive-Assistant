import React from 'react';
import VoiceAssistant from './VoiceAssistant'; // Importa o novo componente
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <VoiceAssistant /> {/* Adiciona o componente VoiceAssistant */}
      </header>
    </div>
  );
}

export default App;

