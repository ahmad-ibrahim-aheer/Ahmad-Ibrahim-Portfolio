import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot } from "lucide-react";

// ✅ Removed direct Gemini SDK imports - now handled server-side via /api/chat

type Message = {
  id: string;
  role: "user" | "model";
  content: string;
};

// ✅ SYSTEM_INSTRUCTION stays here - it will be used by your API route
const SYSTEM_INSTRUCTION = `
You are the personal AI assistant for Ahmad Ibrahim, a Web Developer (React + Node.js) and BS Computer Science student (2024-2028).
Act as a friendly, concise, and helpful representative of Ahmad.

Key Information you MUST know about Ahmad:
- Name: Ahmad Ibrahim
- Focus: Web Development (Frontend with React/Next.js, Backend with Node.js/Express)
- Degree: BS Computer Science from University of Sargodha (2024-2028)
- Current CGPA: 3.60
- Date of Birth: 26 September 2026
- College / Intermediate (FSc): Punjab College Taunsa Campus - Achieved 80% marks
- School / Matriculation: The Educators - Achieved 98% marks
- Contact Email: malikahmadibrahim332@gmail.com
- Current Skills: React.js, Next.js, Tailwind CSS, Node.js, Express, MongoDB.

Guidelines:
- Keep all answers concise, under 3-4 sentences.
- Use a friendly, professional tone. 
- If someone asks about academic history, schools, marks, or CGPA, eagerly provide the specific numbers and names accurately.
- If someone asks for contact info, directly provide the email above.
- If someone asks a question about Ahmad that is NOT covered by the information above, politely say you don't know and append EXACTLY this keyword at the very end of your message: [SHOW_WHATSAPP_BUTTON]
- You do not know unprovided information, politely decline if asked unrelated personal questions.
`;

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "model",
      content:
        "Hi! I'm Ahmad's personal AI assistant. What would you like to know about him?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // ✅ UPDATED: Now fetches from serverless API route instead of calling Gemini directly
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: userMessage },
    ]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.slice(1), // exclude initial greeting
          newMessage: userMessage,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "API request failed");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          content: data.reply,
        },
      ]);
    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(), // ✅ Fixed: was Edge.now() → Date.now()
          role: "model",
          content:
            "Oops! I encountered an error. Please email Ahmad directly! [SHOW_WHATSAPP_BUTTON]",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-colors z-50 flex items-center justify-center"
            aria-label="Open chat"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[90vw] max-w-[360px] h-[500px] max-h-[80vh] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-800"
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">
                    Ahmad's AI Bot
                  </h3>
                  <p className="text-xs text-zinc-500">Ask me anything!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => {
                const hasWhatsApp = msg.content.includes(
                  "[SHOW_WHATSAPP_BUTTON]",
                );
                const displayText = msg.content
                  .replace("[SHOW_WHATSAPP_BUTTON]", "")
                  .trim();

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "model" && (
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex-shrink-0 flex items-center justify-center text-blue-600 dark:text-blue-400 mt-1">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-sm"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-sm"
                      }`}
                    >
                      <div className="whitespace-pre-wrap leading-relaxed">
                        {displayText}
                      </div>
                      {hasWhatsApp && (
                        <div className="mt-3">
                          <a
                            href="https://wa.me/923086772082"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#20bd5a] transition-all shadow-sm"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                            </svg>
                            Contact on WhatsApp
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex-shrink-0 flex items-center justify-center mt-1">
                    <Bot className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                      className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        delay: 0.2,
                      }}
                      className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        delay: 0.4,
                      }}
                      className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900"
            >
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
