import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import Magnetic from './Magnetic';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm Apex AI, your digital agency assistant. How can I help you scale your web systems today?",
      sender: 'bot'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Alert bubble pulse on load
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setHasNewMessage(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const quickPrompts = [
    { text: "What services do you offer?", val: "services" },
    { text: "Show baseline pricing", val: "pricing" },
    { text: "How do I get a consultation?", val: "consultation" },
    { text: "What is your development stack?", val: "stack" }
  ];

  const getBotResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('service') || q.includes('capabilities') || q.includes('do you do') || q.includes('build')) {
      return "We develop premium websites, SaaS web applications, CRM solutions, school/institute management ERP tools, e-commerce marketplaces, and custom third-party integrations.";
    }
    if (q.includes('price') || q.includes('cost') || q.includes('pricing') || q.includes('charge') || q.includes('rate')) {
      return "Our Starter sites start at ₹8,000, Business portals at ₹15,000, E-Commerce platforms at ₹25,000, and customized CRM databases from ₹40,000. You can estimate your project costs directly using the calculator on our Pricing page!";
    }
    if (q.includes('contact') || q.includes('consult') || q.includes('meet') || q.includes('hire') || q.includes('call') || q.includes('book')) {
      return "You can get in touch with our development team by filling out the consultation form on our Contact page. We will assess your requirements and respond within 24 hours!";
    }
    if (q.includes('stack') || q.includes('tech') || q.includes('technology') || q.includes('react') || q.includes('node')) {
      return "We build robust, modern apps utilizing React, Vite, Node.js (Express), MongoDB, MySQL Database, and GSAP ScrollTrigger for hardware-accelerated animations.";
    }
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greetings')) {
      return "Hello! Hope you're having a great day. What project or business operations can I help you automate?";
    }
    return "That sounds interesting! To discuss specific requirements, custom modules, or API integrations, let's schedule a call. Please leave a message on our Contact page with your email address.";
  };

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      text: textToSend,
      sender: 'user'
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Trigger bot typing indicator
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        text: getBotResponse(textToSend),
        sender: 'bot'
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
      {/* 1. Collapsible Chat Window */}
      {isOpen && (
        <div className="chat-window glass">
          {/* Glowing background blob */}
          <div className="chat-bg-blob" />
          
          {/* Header */}
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div className="chat-avatar">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={16} />
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '0.92rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>Apex AI</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                  <span className="online-dot" />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Online Support</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="chat-close-btn" aria-label="Close Chat">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={16} />
              </div>
            </button>
          </div>

          {/* Messages Body */}
          <div className="chat-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}>
                <div className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message-row bot-row">
                <div className="chat-bubble bot-bubble typing-bubble">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Prompts */}
          <div className="chat-chips-container">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.text)}
                className="chat-chip"
              >
                {p.text}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="chat-footer"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Apex AI a question..."
              className="chat-input"
            />
            <button type="submit" className="chat-send-btn" aria-label="Send Message">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <Send size={14} style={{ display: 'block', transform: 'translate(1px, -1px)' }} />
              </div>
            </button>
          </form>
        </div>
      )}

      {/* 2. Floating Action Bubble Bubble */}
      <Magnetic>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasNewMessage(false);
          }}
          className={`chat-bubble-trigger ${isOpen ? 'active' : ''}`}
          aria-label="Open AI Assistant"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
          </div>
          {!isOpen && hasNewMessage && <span className="trigger-pulse-alert" />}
        </button>
      </Magnetic>

      {/* Styled Layouts */}
      <style>{`
        .chat-bubble-trigger {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: var(--gradient-primary);
          color: #fff;
          border: none;
          box-shadow: 0 8px 30px rgba(139, 92, 246, 0.4);
          display: flex;
          align-items: center;
          justifyContent: center;
          cursor: pointer;
          transition: transform var(--transition-fast), box-shadow var(--transition-normal);
          position: relative;
        }

        .chat-bubble-trigger:hover {
          transform: scale(1.06);
          box-shadow: 0 12px 35px rgba(139, 92, 246, 0.6);
        }

        .trigger-pulse-alert {
          position: absolute;
          top: 0;
          right: 0;
          width: 12px;
          height: 12px;
          background: var(--color-accent);
          border-radius: 50%;
          border: 2px solid var(--bg-main);
          animation: trigger-pulse-anim 1.8s infinite;
        }

        @keyframes trigger-pulse-anim {
          0% { transform: scale(0.9); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(0.9); opacity: 1; }
        }

        .chat-window {
          position: absolute;
          bottom: 4.8rem;
          right: 0;
          width: 345px;
          max-height: 480px;
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-main), 0 10px 40px rgba(139, 92, 246, 0.15);
          border: 1px solid var(--border-glass-glow);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: var(--bg-glass);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          animation: chat-open-anim 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          transform-origin: bottom right;
          z-index: 10;
        }

        .chat-bg-blob {
          position: absolute;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%);
          filter: blur(40px);
          top: 15%;
          left: 15%;
          z-index: -1;
          pointer-events: none;
          opacity: 0.35;
        }

        @keyframes chat-open-anim {
          from { opacity: 0; transform: scale(0.7) translate(20px, 20px); }
          to { opacity: 1; transform: scale(1) translate(0, 0); }
        }

        .chat-header {
          padding: 1rem 1.2rem;
          border-bottom: 1px solid var(--border-glass);
          display: flex;
          align-items: center;
          justifyContent: space-between;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(6, 182, 212, 0.12) 100%);
          z-index: 2;
        }

        .chat-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(139, 92, 246, 0.18);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justifyContent: center;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.2);
        }

        .online-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          display: inline-block;
          box-shadow: 0 0 6px #10b981;
        }

        .chat-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: color var(--transition-fast), transform var(--transition-fast);
          display: flex;
          align-items: center;
          justifyContent: center;
        }

        .chat-close-btn:hover {
          color: var(--text-main);
          transform: rotate(90deg);
        }

        .chat-body {
          flex: 1;
          padding: 1.2rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 240px;
          scrollbar-width: thin;
          z-index: 1;
        }

        .chat-message-row {
          display: flex;
          width: 100%;
        }

        .user-row {
          justify-content: flex-end;
        }

        .bot-row {
          justify-content: flex-start;
        }

        .chat-bubble {
          max-width: 80%;
          padding: 0.75rem 1rem;
          border-radius: 16px;
          font-size: 0.88rem;
          line-height: 1.45;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .user-bubble {
          background: var(--gradient-primary);
          color: #fff;
          border-bottom-right-radius: 4px;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.22);
        }

        .bot-bubble {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-main);
          border: 1px solid var(--border-glass);
          border-bottom-left-radius: 4px;
        }

        body.light-theme .bot-bubble {
          background: rgba(15, 23, 42, 0.04);
          border-color: rgba(15, 23, 42, 0.08);
        }

        /* Typing Dots */
        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 0.6rem 1rem;
        }

        .typing-bubble .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-muted);
          animation: typing-dot-anim 1.4s infinite both;
        }

        .typing-bubble .dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-bubble .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typing-dot-anim {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }

        .chat-chips-container {
          padding: 0.4rem 1.2rem 0.8rem 1.2rem;
          display: flex;
          gap: 0.4rem;
          overflow-x: auto;
          flex-wrap: nowrap;
          scrollbar-width: none;
          z-index: 2;
        }

        .chat-chips-container::-webkit-scrollbar {
          display: none;
        }

        .chat-chip {
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass);
          color: var(--text-muted);
          padding: 0.4rem 0.8rem;
          border-radius: 50px;
          font-size: 0.76rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        body.light-theme .chat-chip {
          background: rgba(15, 23, 42, 0.03);
          border-color: rgba(15, 23, 42, 0.08);
        }

        .chat-chip:hover {
          background: rgba(139, 92, 246, 0.08);
          border-color: var(--color-primary);
          color: var(--text-main);
          transform: translateY(-1px);
        }

        .chat-footer {
          padding: 0.8rem 1.2rem;
          border-top: 1px solid var(--border-glass);
          display: flex;
          gap: 0.5rem;
          align-items: center;
          background: rgba(3, 3, 3, 0.15);
          z-index: 2;
        }

        body.light-theme .chat-footer {
          background: rgba(255, 255, 255, 0.1);
        }

        .chat-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass);
          color: var(--text-main);
          padding: 0.6rem 0.8rem;
          border-radius: 8px;
          font-size: 0.85rem;
          outline: none;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        body.light-theme .chat-input {
          background: rgba(15, 23, 42, 0.03);
          border-color: rgba(15, 23, 42, 0.08);
        }

        .chat-input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.25);
        }

        .chat-send-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: var(--gradient-primary);
          color: #fff;
          border: none;
          padding: 0;
          display: flex;
          align-items: center;
          justifyContent: center;
          cursor: pointer;
          transition: transform var(--transition-fast);
        }

        .chat-send-btn:hover {
          transform: scale(1.05);
        }

        @media (max-width: 480px) {
          .chat-window {
            width: calc(100vw - 4rem);
            bottom: 4.8rem;
          }
        }
      `}</style>
    </div>
  );
}
