import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Phone, Mail, Clock, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('¡Mensaje enviado! 📧', {
      description: 'Te responderemos lo antes posible.',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      detail: '+51 962 324 614',
      action: 'tel:+51962324614',
    },
    {
      icon: Mail,
      title: 'Correo',
      detail: 'contacto@inkawarrior.pe',
      action: 'mailto:contacto@inkawarrior.pe',
    },
    {
      icon: Clock,
      title: 'Horario de Atención',
      detail: 'Lun - Dom: 7:00 AM - 8:00 PM',
      action: null,
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      detail: 'Playa Máncora, Piura, Perú',
      action: null,
    },
  ];

  return (
    <div className="min-h-screen py-32 bg-gradient-to-br from-[#F4F6F7] to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-[#004080] mb-4" style={{ fontSize: '3rem', fontWeight: 700 }}>
            Contacto
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Contáctanos por cualquier medio
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="text-center hover:shadow-xl transition-all hover:-translate-y-2">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2E86C1] to-[#004080] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-[#004080] mb-2" style={{ fontWeight: 600 }}>
                      {info.title}
                    </h3>
                    {info.action ? (
                      <a
                        href={info.action}
                        className="text-gray-600 hover:text-[#2E86C1] transition-colors"
                      >
                        {info.detail}
                      </a>
                    ) : (
                      <p className="text-gray-600">{info.detail}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Map and Form */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="overflow-hidden h-full">
              <CardContent className="p-0 h-full min-h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.3934883147887!2d-81.04934568523658!3d-4.109409096913385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9036a3c2b4d3a2e5%3A0x8e8e8e8e8e8e8e8e!2sM%C3%A1ncora%2C%20Peru!5e0!3m2!1sen!2sus!4v1635789012345!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '500px' }}
                  allowFullScreen
                  loading="lazy"
                  title="Ubicación InkaWarrior"
                ></iframe>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-8">
                <h2 className="text-[#004080] mb-6" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                  Envíanos un mensaje
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Nombre</Label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-[#2E86C1]/30 focus:border-[#2E86C1]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Correo electrónico</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-[#2E86C1]/30 focus:border-[#2E86C1]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Mensaje</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Escribe tu mensaje aquí..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      required
                      className="border-[#2E86C1]/30 focus:border-[#2E86C1]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#2E86C1] hover:bg-[#004080] text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>

                {/* WhatsApp Direct Link */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-center text-gray-600 mb-4">
                    ¿Prefieres contactarnos por WhatsApp?
                  </p>
                  <Button
                    onClick={() => window.open('https://wa.me/51962324614?text=Hola,%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20sus%20servicios%20y%20eventos.%20Gracias', '_blank')}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Abrir WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
