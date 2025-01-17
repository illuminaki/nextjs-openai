import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newChat = [...chat, { role: "user", content: message }];
    setChat(newChat);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (response.ok) {
        setChat([...newChat, { role: "assistant", content: data.reply }]);
      } else {
        setChat([...newChat, { role: "assistant", content: "Hubo un error." }]);
      }
    } catch (error) {
      console.error(error);
      setChat([...newChat, { role: "assistant", content: "Error de conexión." }]);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Chat con OpenAI</h1>
      <div>
        {chat.map((c, i) => (
          <div key={i} style={{ margin: "10px 0" }}>
            <strong>{c.role === "user" ? "Tú" : "IA"}:</strong> {c.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <textarea
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={{ width: "100%", margin: "10px 0" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
