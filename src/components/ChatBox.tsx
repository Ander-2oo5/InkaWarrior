import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! 🌊 Soy tu asistente InkaBot. ¿Quieres reservar una clase o conocer los horarios?',
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickReplies = [
    'Ver horarios',
    'Hacer reserva',
    'Información de eventos',
    'Contactar por WhatsApp',
  ];

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: message, sender: 'user' },
    ]);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = '';
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes('horario') || lowerMessage.includes('hora')) {
        botResponse = 'Tenemos clases todos los días de 7:00 AM a 8:00 PM. ¿Te gustaría ver el horario completo?';
      } else if (lowerMessage.includes('reserva') || lowerMessage.includes('reservar')) {
        botResponse = '¡Genial! Puedes hacer tu reserva directamente en nuestra sección de "Agendar cita". ¿Necesitas ayuda con algo más?';
      } else if (lowerMessage.includes('evento')) {
        botResponse = 'Tenemos varios eventos próximos. Te recomiendo visitar la sección de "Eventos" para ver toda la información.';
      } else if (lowerMessage.includes('precio') || lowerMessage.includes('costo')) {
        botResponse = 'Nuestras clases empiezan desde S/. 80. Contáctanos para más información sobre paquetes y descuentos.';
      } else if (lowerMessage.includes('whatsapp')) {
        botResponse = '¡Claro! Puedes escribirnos directamente al +51 999 123 456 o hacer clic aquí para abrir WhatsApp.';
      } else {
        botResponse = 'Gracias por tu mensaje. Un miembro de nuestro equipo te responderá pronto. ¿Puedo ayudarte con algo más?';
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: botResponse, sender: 'bot' },
      ]);
    }, 1000);

    setInputValue('');
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-[#2E86C1] to-[#004080] text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { scale: 0.9, opacity: 0 } : { scale: 1, opacity: 1 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#004080] to-[#2E86C1] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600 }}>InkaBot</h3>
                  <p className="text-xs text-white/80">En línea</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-[#F4F6F7]">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-[#2E86C1] text-white'
                        : 'bg-white text-gray-800 shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Quick Replies */}
              {messages.length <= 2 && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs text-gray-500 text-center">Respuestas rápidas:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className="bg-white text-[#004080] border border-[#2E86C1] rounded-lg px-3 py-2 text-xs hover:bg-[#2E86C1] hover:text-white transition-all"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex gap-2"
              >
                <Input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 border-[#2E86C1]/30 focus:border-[#2E86C1]"
                />
                <Button
                  type="submit"
                  className="bg-[#2E86C1] hover:bg-[#004080] text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
