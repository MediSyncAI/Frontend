"use client";

export default function ChatbotButton() {
  const handleClick = () => {
    window.open("https://medisyncaibot-manzmtbpiv7jzk2ktqe6kk.streamlit.app/", "_blank"); 
    // _blank ensures new tab
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
    >
      MediSyncAI Chatbot
    </button>
  );
}