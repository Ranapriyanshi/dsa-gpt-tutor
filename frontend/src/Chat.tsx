import React, { useState } from "react";
import axios from "axios";

const Chat: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);

  const handleSend = async () => {
    const res = await axios.post("http://localhost:8000/generate-response", {
      usr_prompt: prompt,
    });
    setMessages([...messages, { user: prompt, bot: res.data.response }]);
    setPrompt("");
  };

  return (
    <div>
      <h2>DSA GPT Tutor</h2>
      <div>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <p>
              <b>You:</b> {msg.user}
            </p>
            <p>
              <b>Bot:</b> {msg.bot}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask a DSA question..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;

// const Chat: React.FC = () => {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     try {
//       const response = await axios.post("/api/chat", { message: input });
//       const botMessage = response.data;
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Chat with AI</h1>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index} className={msg.role}>
//             <strong>{msg.role}:</strong> {msg.content}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };
