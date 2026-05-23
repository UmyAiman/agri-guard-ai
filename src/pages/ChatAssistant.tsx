import { useState } from "react";
import { Send, Mic, Globe, Bot, User } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import { cn } from "@/lib/utils";
import { sendChatMessage } from "@/lib/api";
import { useAuth } from "@/auth/AuthContext";
import { toast } from "sonner";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const initialMessages: Message[] = [
  { id: 1, text: "Hello! I'm your Agri Guard assistant. How can I help you with your crops today?", sender: "bot" },
];

const conversations = [
  { id: 1, title: "Tomato Blight Help", date: "Today" },
];

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { token } = useAuth();

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      const data = await sendChatMessage(currentInput, token);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: data.response,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      toast.error("Failed to get response from AI");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 h-screen flex">
        {/* Conversation List */}
        <div className="hidden md:flex flex-col w-72 glass-strong border-r border-border/30">
          <div className="p-4 border-b border-border/30">
            <h2 className="font-display font-semibold text-foreground text-sm">Conversations</h2>
          </div>
          <div className="flex-1 p-2 space-y-1 overflow-y-auto">
            {conversations.map((c, i) => (
              <button
                key={c.id}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl text-sm transition-all",
                  i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/30"
                )}
              >
                <p className="font-medium truncate">{c.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.date}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="glass-strong border-b border-border/30 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-sm">Agri Assistant</p>
                <p className="text-xs text-primary">Online</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-xs text-muted-foreground hover-neon">
              <Globe className="w-3 h-3" /> English
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex", msg.sender === "user" ? "justify-end" : "justify-start")}
              >
                <div className={cn("flex items-start gap-2 max-w-[80%]", msg.sender === "user" && "flex-row-reverse")}>
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    msg.sender === "bot" ? "bg-primary/10" : "bg-sky/10"
                  )}>
                    {msg.sender === "bot" ? <Bot className="w-4 h-4 text-primary" /> : <User className="w-4 h-4 text-sky" />}
                  </div>
                  <div className={cn(
                    "px-4 py-3 rounded-2xl text-sm",
                    msg.sender === "user"
                      ? "btn-glow text-accent-foreground rounded-tr-md"
                      : "glass text-foreground rounded-tl-md"
                  )}>
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-md text-sm glass text-muted-foreground italic">
                    AI is thinking...
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="glass-strong border-t border-border/30 p-4">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-4 py-3 rounded-xl bg-input/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Ask about plant diseases..."
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 rounded-xl btn-glow flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4 text-accent-foreground" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatAssistant;
