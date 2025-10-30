import { motion } from 'motion/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CreditCard, Smartphone, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function BookingView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    level: '',
    paymentMethod: '',
    comments: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Simulación de envío de notificaciones
      toast.success('¡Reserva confirmada con éxito! 🌊', {
        description: 'Recibirás confirmación por correo y WhatsApp.',
      });
      
      // Simular notificaciones automáticas
      setTimeout(() => {
        toast.info('📧 Correo de confirmación enviado', {
          description: `Enviado a ${formData.email}`,
        });
      }, 1000);
      
      setTimeout(() => {
        toast.info('💬 Mensaje de WhatsApp enviado', {
          description: `Enviado a ${formData.phone}`,
        });
      }, 2000);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          level: '',
          paymentMethod: '',
          comments: '',
        });
      }, 5000);
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-32 bg-gradient-to-br from-[#F4F6F7] to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-[#004080] mb-4" style={{ fontSize: '3rem', fontWeight: 700 }}>
            Agendar Cita
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reserva tu clase de surf ahora y comienza tu aventura en las olas
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {isSuccess ? (
            <Card className="border-green-500 border-2">
              <CardContent className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                </motion.div>
                <h2 className="text-green-600 mb-4" style={{ fontSize: '2rem', fontWeight: 700 }}>
                  ¡Reserva Confirmada!
                </h2>
                <p className="text-gray-600 mb-4">
                  Hemos recibido tu solicitud de reserva. Recibirás confirmación por:
                </p>
                <div className="flex justify-center gap-8 mb-6">
                  <div className="flex items-center gap-2 text-[#2E86C1]">
                    <Mail className="w-5 h-5" />
                    <span>Email</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </div>
                </div>
                <p className="text-gray-500">
                  ¡Nos vemos en las olas! 🏄‍♂️
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="bg-gradient-to-r from-[#004080] to-[#2E86C1] text-white">
                <CardTitle>Formulario de Reserva</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      className="border-[#2E86C1]/30 focus:border-[#2E86C1]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      className="border-[#2E86C1]/30 focus:border-[#2E86C1]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+51 999 999 999"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                      className="border-[#2E86C1]/30 focus:border-[#2E86C1]"
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Fecha</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        required
                        className="border-[#2E86C1]/30 focus:border-[#2E86C1]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Hora</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleChange('time', e.target.value)}
                        required
                        className="border-[#2E86C1]/30 focus:border-[#2E86C1]"
                      />
                    </div>
                  </div>

                  {/* Level */}
                  <div className="space-y-2">
                    <Label htmlFor="level">Nivel de experiencia</Label>
                    <Select value={formData.level} onValueChange={(value) => handleChange('level', value)}>
                      <SelectTrigger className="border-[#2E86C1]/30">
                        <SelectValue placeholder="Selecciona tu nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Principiante</SelectItem>
                        <SelectItem value="intermediate">Intermedio</SelectItem>
                        <SelectItem value="advanced">Avanzado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-2">
                    <Label htmlFor="payment">Método de pago</Label>
                    <Select value={formData.paymentMethod} onValueChange={(value) => handleChange('paymentMethod', value)}>
                      <SelectTrigger className="border-[#2E86C1]/30">
                        <SelectValue placeholder="Selecciona método de pago" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Tarjeta de crédito/débito
                          </div>
                        </SelectItem>
                        <SelectItem value="yape">
                          <div className="flex items-center gap-2">
                            <Smartphone className="w-4 h-4" />
                            Yape
                          </div>
                        </SelectItem>
                        <SelectItem value="plin">
                          <div className="flex items-center gap-2">
                            <Smartphone className="w-4 h-4" />
                            Plin
                          </div>
                        </SelectItem>
                        <SelectItem value="paypal">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            PayPal
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Comments */}
                  <div className="space-y-2">
                    <Label htmlFor="comments">Comentarios adicionales</Label>
                    <Textarea
                      id="comments"
                      placeholder="¿Alguna solicitud especial o pregunta?"
                      value={formData.comments}
                      onChange={(e) => handleChange('comments', e.target.value)}
                      rows={4}
                      className="border-[#2E86C1]/30 focus:border-[#2E86C1]"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#2E86C1] hover:bg-[#004080] text-white py-6"
                    style={{ fontSize: '1.1rem', fontWeight: 600 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Procesando...
                      </div>
                    ) : (
                      'Reservar Ahora'
                    )}
                  </Button>

                  {/* Info */}
                  <p className="text-center text-sm text-gray-500">
                    Al reservar, aceptas nuestras políticas de cancelación y términos de servicio
                  </p>
                </form>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
