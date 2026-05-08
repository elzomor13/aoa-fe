'use client';

import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { MessageCircle, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { EASE } from '@/lib/animations';
import { cn } from '@/lib/utils';

const API_BASE = process.env.NEXT_PUBLIC_CHATBOT_API_URL ?? 'http://localhost:8000';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  type?: 'session-limit';
}

interface ChatVariables {
  question: string;
  sessionId: string | null;
  assistantId: string;
  onToken: (token: string) => void;
  onSessionId: (id: string) => void;
  onDone: (answered: boolean, fallback?: string) => void;
}

interface RateLimitError extends Error {
  rateLimitType: 'ip' | 'session';
}

function isRateLimitError(e: unknown): e is RateLimitError {
  return e instanceof Error && 'rateLimitType' in e;
}

export default function Chatbot() {
  const t = useTranslations('chatbot');
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isIPRateLimited, setIsIPRateLimited] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      if (messages.length === 0) {
        setMessages([{ id: 'greeting', role: 'assistant', content: t('greeting') }]);
      }
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, t]);

  const mutation = useMutation({
    mutationFn: async ({ question, sessionId, onToken, onSessionId, onDone }: ChatVariables) => {
      const res = await fetch(`${API_BASE}/api/chatbot/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, ...(sessionId ? { session_id: sessionId } : {}) }),
      });

      if (res.status === 429) {
        const { error: errMsg } = await res.json() as { error: string };
        const err = new Error(errMsg) as RateLimitError;
        err.rateLimitType = errMsg === 'Session message limit reached' ? 'session' : 'ip';
        throw err;
      }

      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = JSON.parse(line.slice(6));

          if (payload.session_id) onSessionId(payload.session_id);
          else if (payload.token) onToken(payload.token);
          else if (payload.done) onDone(payload.answered, payload.fallback);
        }
      }
    },
    onError: (error, variables) => {
      if (isRateLimitError(error)) {
        if (error.rateLimitType === 'ip') {
          setIsIPRateLimited(true);
          setMessages(prev => prev.filter(m => m.id !== variables.assistantId));
        } else {
          setSessionId(null);
          setMessages(prev => [
            ...prev.filter(m => m.id !== variables.assistantId),
            {
              id: `session-limit-${Date.now()}`,
              role: 'assistant',
              content: t('rateLimitSession'),
              type: 'session-limit',
            },
          ]);
        }
      } else {
        setMessages(prev =>
          prev.map(m =>
            m.id === variables.assistantId ? { ...m, content: t('error'), isStreaming: false } : m
          )
        );
      }
    },
  });

  const startNewChat = () => {
    setMessages([{ id: 'greeting', role: 'assistant', content: t('greeting') }]);
  };

  const sendMessage = () => {
    if (!input.trim() || mutation.isPending || isIPRateLimited) return;

    const question = input.trim();
    setInput('');

    const userMsgId = `user-${Date.now()}`;
    const assistantId = `assistant-${Date.now()}`;
    let streamedContent = '';

    setMessages(prev => [
      ...prev,
      { id: userMsgId, role: 'user', content: question },
      { id: assistantId, role: 'assistant', content: '', isStreaming: true },
    ]);

    mutation.mutate({
      question,
      sessionId,
      assistantId,
      onToken: (token) => {
        streamedContent += token;
        setMessages(prev =>
          prev.map(m => m.id === assistantId ? { ...m, content: streamedContent } : m)
        );
      },
      onSessionId: (id) => setSessionId(id),
      onDone: (answered, fallback) => {
        const finalContent = answered ? streamedContent : (fallback ?? streamedContent);
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId ? { ...m, content: finalContent, isStreaming: false } : m
          )
        );
      },
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed bottom-24 z-[90] inset-x-3 sm:inset-x-auto sm:end-6 sm:w-96 bg-charcoal rounded-2xl shadow-2xl flex flex-col border border-white/10 overflow-hidden"
            style={{ maxHeight: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40 shrink-0">
              <span className="font-dm-sans text-sm font-medium text-white tracking-wide">
                {t('title')}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label={t('close')}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex',
                    msg.role === 'user'
                      ? isRTL ? 'justify-start' : 'justify-end'
                      : isRTL ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] px-3 py-2 rounded-xl text-sm font-dm-sans leading-relaxed break-words',
                      msg.role === 'user'
                        ? cn('bg-crimson text-white', isRTL ? 'rounded-bl-sm' : 'rounded-br-sm')
                        : cn('bg-black/50 text-white/90', isRTL ? 'rounded-br-sm' : 'rounded-bl-sm')
                    )}
                  >
                    {msg.role === 'assistant' ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                        components={{
                          p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc ps-4 mb-1.5 space-y-0.5">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal ps-4 mb-1.5 space-y-0.5">{children}</ol>,
                          li: ({ children }) => <li>{children}</li>,
                          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          code: ({ children }) => <code className="bg-white/10 px-1 py-0.5 rounded text-xs font-dm-mono">{children}</code>,
                          a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="underline text-crimson hover:text-white transition-colors">{children}</a>,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                    {msg.type === 'session-limit' && (
                      <button
                        onClick={startNewChat}
                        className="mt-1.5 block text-xs text-crimson hover:underline"
                      >
                        {t('newChat')}
                      </button>
                    )}
                    {msg.isStreaming && (
                      <span className="inline-block w-0.5 h-3.5 bg-white/60 animate-pulse align-middle ms-0.5" />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            {isIPRateLimited ? (
              <div className="px-4 py-3 border-t border-white/10 shrink-0 text-center">
                <p className="text-xs text-white/50 font-dm-sans">{t('rateLimitIP')}</p>
              </div>
            ) : (
              <div className="px-3 py-3 border-t border-white/10 flex items-center gap-2 shrink-0">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder={t('placeholder')}
                  disabled={mutation.isPending}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  className="flex-1 bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-crimson/50 font-dm-sans disabled:opacity-50 transition-colors"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || mutation.isPending}
                  aria-label={t('send')}
                  className="w-9 h-9 rounded-xl bg-crimson hover:bg-crimson-dark disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shrink-0"
                >
                  <Send size={15} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(o => !o)}
        aria-label={isOpen ? t('close') : t('title')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 end-6 z-[90] w-14 h-14 rounded-full bg-crimson hover:bg-crimson-dark text-white shadow-lg flex items-center justify-center transition-colors"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
