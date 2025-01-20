'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // Carga el historial de chats desde la base de datos al montar el componente
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch('/api/chat');
        if (!res.ok) throw new Error('Error al obtener chats');
        const data = await res.json();
        setChat(data.chats);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    const newChat = [...chat, { role: 'user', content: message }];
    setChat(newChat);
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }

      const data = await response.json();
      setChat([...newChat, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Error:', error);
      setChat([...newChat, { role: 'assistant', content: 'Error de conexión.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chat con OpenAI</h1>
      
      {/* Muestra el historial del chat */}
      <div className="mb-6">
        {chat.map((c, i) => (
          <div key={i} className="mb-2">
            <strong>{c.role === 'user' ? 'Tú' : 'IA'}:</strong> {c.content}
          </div>
        ))}
      </div>
      
      {/* Formulario para enviar mensajes */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Escribe tu mensaje..."
          className="w-full p-2 border rounded text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}
