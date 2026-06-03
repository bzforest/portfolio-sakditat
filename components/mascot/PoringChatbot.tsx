'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

type Message = { id: number; role: 'bot' | 'user'; text: string; };

export default function PoringChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize state from sessionStorage if available
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('poring_chat');
      if (saved) return JSON.parse(saved);
    }
    return [{ id: 1, role: 'bot', text: "สวัสดีครับ นักผจญภัย! ผมคือ Poring ประจำตัวของ Best มีอะไรให้ผมช่วยแนะนำเกี่ยวกับพอร์ตโฟลิโอนี้ไหมครับ? ✦" }];
  });

  const presetQuestions = [
    "Tech Stack หลักที่ถนัดมีอะไรบ้าง ?",
    "ทำไมถึงเปลี่ยนสายจาก Video Editor?",
    "อยากดูโปรเจกต์ที่เน้น Frontend",
    "อยากดูโปรเจกต์ที่เน้น Backend",
    "อยากดูโปรเจกต์ที่เน้น FullStack",
    "โปรเจกต์ที่แนะนำมีอะไรบ้าง",
    "โปรเจกต์ล่าสุดที่ทำ"
  ];

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  // Save to sessionStorage on update
  useEffect(() => {
    sessionStorage.setItem('poring_chat', JSON.stringify(messages));
  }, [messages]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Auto-scroll to bottom on new messages and on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [messages.length, isOpen]);

  // Handle horizontal scroll on chips without scrolling the page
  useEffect(() => {
    const el = chipsRef.current;
    if (!el) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault(); // Stop the page from scrolling vertically
        el.scrollLeft += e.deltaY;
      }
    };
    
    // non-passive listener allows preventDefault
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [isOpen]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || inputText;
    if (!textToSend.trim() || isLoading) return;
    
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: textToSend }]);
    if (!overrideText) setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });
      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: 'ขออภัยด้วยครับ พลังเวทมนตร์ขาดการเชื่อมต่อชั่วคราว 💧' }]);
      }
    } catch {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: 'ขออภัยด้วยครับ พลังเวทมนตร์ขาดการเชื่อมต่อชั่วคราว 💧' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={chatRef} className="fixed bottom-4 right-4 z-50 md:bottom-8 md:right-8">
      {isOpen && (
        <div className="absolute bottom-28 md:bottom-40 right-0 w-80 sm:w-96 h-[28rem] bg-amber-50/95 dark:bg-slate-900/50 backdrop-blur-md border-2 border-ro-wood shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-2xl flex flex-col overflow-hidden origin-bottom-right animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-900 via-ro-wood to-amber-950 border-b-2 border-amber-950/50 shadow-md z-10">
            <h3 className="font-heading font-semibold text-amber-50 tracking-wide">✦ Poring Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-amber-200 hover:text-amber-50 transition-colors p-1 rounded-md">
              <X className="w-5 h-5 cursor-pointer" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto overscroll-contain flex flex-col gap-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {messages.map((msg) => (
              <div key={msg.id} className={`p-3 rounded-2xl w-fit max-w-[85%] text-sm shadow-sm ${
                msg.role === 'bot' 
                  ? 'bg-rose-100 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-slate-800 dark:text-rose-100 rounded-tl-none self-start' 
                  : 'bg-gradient-to-br from-amber-500 to-amber-600 dark:from-ro-wood dark:to-amber-900 text-white rounded-tr-none self-end border border-amber-700'
              }`}>
                <div className="space-y-4 flex flex-col">
                  <ReactMarkdown 
                    components={{
                      p: ({node, ...props}) => <p className="leading-relaxed" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-3" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-3" {...props} />,
                      li: ({node, ...props}) => <li className="leading-relaxed marker:text-amber-600 dark:marker:text-amber-400" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-amber-700 dark:text-amber-400" {...props} />,
                      a: ({node, children, href, ...props}) => {
                        const isInternal = href && href.startsWith('/');
                        const linkClasses = "inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-300 underline font-bold hover:text-amber-500 transition-colors group mt-1";
                        
                        if (isInternal) {
                          return (
                            <Link className={linkClasses} href={href as string}>
                              <span>{children}</span>
                              <img src="/image/chatbot/mock-poring.png" alt="bounce" className="w-4 h-4 animate-bounce group-hover:scale-125 transition-transform duration-300" />
                            </Link>
                          );
                        }
                        return (
                          <a href={href} className={linkClasses} target="_blank" rel="noopener noreferrer" {...props}>
                            <span>{children}</span>
                            <img src="/image/chatbot/mock-poring.png" alt="bounce" className="w-4 h-4 animate-bounce group-hover:scale-125 transition-transform duration-300" />
                          </a>
                        );
                      }
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="p-3 rounded-2xl w-fit max-w-[85%] text-sm shadow-sm bg-rose-100 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-slate-800 dark:text-rose-100 rounded-tl-none self-start">
                <div className="flex gap-1.5 items-center h-5">
                  <span className="w-2 h-2 bg-rose-400 dark:bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-rose-400 dark:bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-rose-400 dark:bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t-2 border-ro-wood/40 bg-amber-100/50 dark:bg-slate-950/80 flex flex-col gap-2">
            <div 
              ref={chipsRef}
              className="flex gap-2 overflow-x-auto pb-1 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            >
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="whitespace-nowrap px-3 py-1.5 bg-amber-100 dark:bg-slate-800 text-amber-800 dark:text-amber-200 text-xs rounded-full border border-amber-200 dark:border-slate-600 hover:bg-amber-200 dark:hover:bg-slate-700 transition-colors shadow-sm cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                disabled={isLoading}
                className="flex-1 bg-white dark:bg-slate-900 border border-amber-300 dark:border-slate-600 rounded-xl px-4 py-2 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-ro-wood transition-colors shadow-inner"
              />
              <button
                onClick={() => handleSend()}
                className="bg-ro-wood hover:bg-amber-800 text-amber-50 p-2.5 rounded-xl transition-colors shadow-md flex-shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group hover:brightness-110 transition-all active:scale-95 cursor-pointer block"
      >
        <div className="animate-poring-bounce origin-bottom">
          <img
            src="/image/chatbot/mock-poring.png"
            alt="Poring Assistant"
            className="w-20 h-20 md:w-32 md:h-32 drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)]"
          />
        </div>
      </button>
    </div>
  );
}
