import React, { useEffect, useState } from 'react';
import MicrophoneStream from 'microphone-stream';
import * as tf from '@tensorflow/tfjs';

function App() {
  const [noiseLevel, setNoiseLevel] = useState(0);
  const [status, setStatus] = useState('Ambiente silencioso');

  // Função para capturar o áudio do microfone e analisar o ruído
  useEffect(() => {
    async function captureAudio() {
      try {
        // Solicitar permissão para usar o microfone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const micStream = new MicrophoneStream(stream);

        micStream.on('data', function(chunk) {
          const raw = MicrophoneStream.toRaw(chunk);
          if (raw == null) return;

          // Converter o áudio para tensor (TensorFlow.js)
          const audioTensor = tf.tensor(raw);

          // Calcular a média para determinar o nível de ruído
          const avgNoise = audioTensor.mean().dataSync();

          // Atualizar o estado do nível de ruído
          setNoiseLevel(avgNoise);

          // Ajustar o comportamento do assistente com base no nível de ruído
          if (avgNoise > 100) {
            setStatus('Ambiente barulhento, ajustando comportamento...');
            // Aqui você pode adicionar lógica para ajustar o comportamento do assistente
          } else {
            setStatus('Ambiente silencioso.');
          }
        });

        micStream.on('error', function(error) {
          console.error('Erro ao capturar o áudio:', error);
        });
      } catch (err) {
        console.error('Erro ao acessar o microfone:', err);
      }
    }

    captureAudio();
  }, []); // Chama o efeito uma vez quando o componente é montado

  return (
    <div className="App">
      <h1>ToT - Assistente Pessoal Interativo</h1>
      <p>Nível de ruído: {noiseLevel}</p>
      <p>Status: {status}</p>
    </div>
  );
}

export default App;

