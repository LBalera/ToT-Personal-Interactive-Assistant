import React, { useState, useEffect } from 'react';

const VoiceAssistant = () => {
    const [message, setMessage] = useState('');
    const [listening, setListening] = useState(false);
    const [synth, setSynth] = useState(window.speechSynthesis);
    const [voices, setVoices] = useState([]);

    // Ativar reconhecimento de voz
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error('Seu navegador não suporta Web Speech API');
            return;
        }
        const recognition = new SpeechRecognition();

        recognition.onstart = () => {
            setListening(true);
            console.log('Microfone ativado');
        };

        recognition.onresult = (event) => {
            const current = event.resultIndex;
            const transcript = event.results[current][0].transcript;
            setMessage(transcript);
            handleResponse(transcript);
        };

        recognition.onend = () => {
            setListening(false);
            console.log('Microfone desativado');
        };

        if (listening) {
            recognition.start();
        }

        return () => {
            recognition.abort();
        };
    }, [listening]);

    // Função para sintetizar voz com modulação
    const handleResponse = (message) => {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = "Resposta processada"; // Aqui você pode processar a resposta no backend

        // Ajustando a voz baseada na preferência do usuário
        const userPreferredVoice = voices.find((voice) => voice.name === "Google US English");
        utterance.voice = userPreferredVoice || voices[0]; // Voz adaptada ao perfil

        // Ajustar a taxa e o pitch com base no perfil do usuário
        utterance.rate = 1.2; // Pode ser ajustado conforme a necessidade do usuário
        utterance.pitch = 1.0; // Pitch modulado

        synth.speak(utterance);
    };

    // Carregar vozes disponíveis
    useEffect(() => {
        const availableVoices = synth.getVoices();
        setVoices(availableVoices);
    }, [synth]);

    return (
        <div>
            <button onClick={() => setListening(true)}>
                {listening ? 'Desativar Assistente' : 'Ativar Assistente'}
            </button>
            <p>{listening ? 'Ouvindo...' : 'Assistente Desativado'}</p>
            <p>Mensagem: {message}</p>
        </div>
    );
};

export default VoiceAssistant;

