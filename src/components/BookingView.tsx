import { motion } from 'motion/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { CreditCard, Smartphone, CheckCircle2, Mail, MessageCircle, QrCode, Wallet, LogIn, UserPlus, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface BookingViewProps {
  user?: any;
  onNavigate?: (view: string) => void;
}

export function BookingView({ user, onNavigate }: BookingViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    level: '',
    comments: '',
  });
  const [currentStep, setCurrentStep] = useState<'form' | 'payment' | 'success'>('form');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPayPalConfirmModal, setShowPayPalConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentMethodClick = (method: string) => {
    setSelectedPaymentMethod(method);
    if (method === 'paypal') {
      // Abrir PayPal en nueva pestaña y mostrar modal de confirmación
      window.open('https://www.paypal.com/checkout', '_blank');
      setShowPayPalConfirmModal(true);
    } else {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentComplete = () => {
    setShowPaymentModal(false);
    setIsSubmitting(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep('success');
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
        setCurrentStep('form');
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          level: '',
          comments: '',
        });
      }, 5000);
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getPrice = () => {
    switch (formData.level) {
      case 'beginner':
        return 50;
      case 'intermediate':
        return 70;
      case 'advanced':
        return 80;
      default:
        return 0;
    }
  };

  // Si no hay usuario, mostrar mensaje para iniciar sesión
  if (!user) {
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
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-2 border-[#2E86C1]">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2E86C1] to-[#004080] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-[#004080] mb-4" style={{ fontSize: '2rem', fontWeight: 700 }}>
                  ¡Inicia sesión para continuar!
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Para poder agendar una reserva debes iniciar sesión. Si eres nuevo, regístrate y comienza tu aventura en las olas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => onNavigate?.('login')}
                    className="bg-[#2E86C1] hover:bg-[#004080] text-white px-8 py-6 text-lg"
                    size="lg"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Iniciar Sesión
                  </Button>
                  <Button
                    onClick={() => onNavigate?.('login')}
                    variant="outline"
                    className="border-2 border-[#2E86C1] text-[#2E86C1] hover:bg-[#2E86C1] hover:text-white px-8 py-6 text-lg"
                    size="lg"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Registrarme
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

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
          {currentStep === 'success' ? (
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
          ) : currentStep === 'form' ? (
            <Card className="rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#004080] to-[#2E86C1] text-white rounded-t-2xl">
                <CardTitle>Formulario de Reserva</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleFormSubmit} className="space-y-6">
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
                    <Select value={formData.level} onValueChange={(value: string) => handleChange('level', value)}>
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
                    className="w-full bg-[#2E86C1] hover:bg-[#004080] text-white py-6"
                    style={{ fontSize: '1.1rem', fontWeight: 600 }}
                  >
                    Continuar con la Reserva
                  </Button>

                  {/* Info */}
                  <p className="text-center text-sm text-gray-500">
                    Al reservar, aceptas nuestras políticas de cancelación y términos de servicio
                  </p>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#004080] to-[#2E86C1] text-white rounded-t-2xl">
                <CardTitle>Método de pago</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {/* Resumen de precio */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Nivel seleccionado:</p>
                      <p className="text-lg font-semibold text-[#004080]">
                        {formData.level === 'beginner' && 'Principiante'}
                        {formData.level === 'intermediate' && 'Intermedio'}
                        {formData.level === 'advanced' && 'Avanzado'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total a pagar:</p>
                      <p className="text-2xl font-bold text-[#2E86C1]">S/ {getPrice()}.00</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Tarjeta de crédito/débito */}
                  <Button
                    onClick={() => handlePaymentMethodClick('card')}
                    className="w-full h-auto py-6 bg-white hover:bg-blue-50 text-gray-800 border-2 border-gray-200 hover:border-[#2E86C1] justify-start"
                    variant="outline"
                  >
                    <CreditCard className="w-6 h-6 mr-3 text-[#2E86C1]" />
                    <span className="text-lg font-semibold">Tarjeta de crédito/débito</span>
                  </Button>

                  {/* Yape */}
                  <Button
                    onClick={() => handlePaymentMethodClick('yape')}
                    className="w-full h-auto py-6 bg-white hover:bg-purple-50 text-gray-800 border-2 border-gray-200 hover:border-purple-500 justify-start"
                    variant="outline"
                  >
                    <Smartphone className="w-6 h-6 mr-3 text-purple-600" />
                    <span className="text-lg font-semibold">Yape</span>
                  </Button>

                  {/* Plin */}
                  <Button
                    onClick={() => handlePaymentMethodClick('plin')}
                    className="w-full h-auto py-6 bg-white hover:bg-pink-50 text-gray-800 border-2 border-gray-200 hover:border-pink-500 justify-start"
                    variant="outline"
                  >
                    <Wallet className="w-6 h-6 mr-3 text-pink-600" />
                    <span className="text-lg font-semibold">Plin</span>
                  </Button>

                  {/* PayPal */}
                  <Button
                    onClick={() => handlePaymentMethodClick('paypal')}
                    className="w-full h-auto py-6 bg-white hover:bg-blue-50 text-gray-800 border-2 border-gray-200 hover:border-blue-500 justify-start"
                    variant="outline"
                  >
                    <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
                    <span className="text-lg font-semibold">PayPal</span>
                  </Button>

                  <Button
                    onClick={() => setCurrentStep('form')}
                    variant="outline"
                    className="w-full mt-4"
                  >
                    Volver
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Payment Modals */}
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedPaymentMethod === 'card' && 'Pago con Tarjeta'}
                {selectedPaymentMethod === 'yape' && 'Pago con Yape'}
                {selectedPaymentMethod === 'plin' && 'Pago con Plin'}
              </DialogTitle>
            </DialogHeader>

            {/* Modal de Tarjeta */}
            {selectedPaymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-holder">Nombre del titular</Label>
                  <Input
                    id="card-holder"
                    type="text"
                    placeholder="Nombre como aparece en la tarjeta"
                    className="border-[#2E86C1]/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-number">Número de tarjeta</Label>
                  <Input
                    id="card-number"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="border-[#2E86C1]/30"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-expiry">Fecha de vencimiento</Label>
                    <Input
                      id="card-expiry"
                      type="text"
                      placeholder="MM/AA"
                      maxLength={5}
                      className="border-[#2E86C1]/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-cvv">CVV</Label>
                    <Input
                      id="card-cvv"
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      className="border-[#2E86C1]/30"
                    />
                  </div>
                </div>
                <Button
                  onClick={handlePaymentComplete}
                  className="w-full bg-[#2E86C1] hover:bg-[#004080] text-white mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Procesando...
                    </div>
                  ) : (
                    'Confirmar Pago'
                  )}
                </Button>
              </div>
            )}

            {/* Modal de Yape */}
            {selectedPaymentMethod === 'yape' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Realiza el pago desde tu aplicación Yape y luego ingresa los datos:
                </p>
                <div className="space-y-1">
                  <Label htmlFor="yape-phone">Número de teléfono</Label>
                  <Input
                    id="yape-phone"
                    type="tel"
                    placeholder="Ingresa tu número de teléfono"
                    className="border-purple-300 focus:border-purple-600"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="yape-code">Código de aprobación</Label>
                  <Input
                    id="yape-code"
                    type="text"
                    placeholder="Ingresa el código de aprobación"
                    className="border-purple-300 focus:border-purple-600"
                  />
                </div>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold"
                >
                  Realizar Pago en Yape
                </Button>
                <Button
                  type="button"
                  onClick={handlePaymentComplete}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Procesando...
                    </div>
                  ) : (
                    '✓ Confirmar Pago'
                  )}
                </Button>
              </div>
            )}

            {/* Modal de Plin */}
            {selectedPaymentMethod === 'plin' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Realiza el pago desde tu aplicación Plin y luego ingresa los datos:
                </p>
                <div className="space-y-1">
                  <Label htmlFor="plin-phone">Número de teléfono</Label>
                  <Input
                    id="plin-phone"
                    type="tel"
                    placeholder="Ingresa tu número de teléfono"
                    className="border-pink-300 focus:border-pink-600"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="plin-code">Código de aprobación</Label>
                  <Input
                    id="plin-code"
                    type="text"
                    placeholder="Ingresa el código de aprobación"
                    className="border-pink-300 focus:border-pink-600"
                  />
                </div>
                <Button
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 font-semibold"
                >
                  Realizar Pago en Plin
                </Button>
                <Button
                  type="button"
                  onClick={handlePaymentComplete}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Procesando...
                    </div>
                  ) : (
                    '✓ Confirmar Pago'
                  )}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de confirmación de PayPal */}
        <Dialog open={showPayPalConfirmModal} onOpenChange={setShowPayPalConfirmModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Confirmación de Pago PayPal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Se ha abierto una nueva ventana con PayPal. Una vez que hayas completado tu pago, confirma aquí:
              </p>
              <Button
                type="button"
                onClick={() => {
                  setShowPayPalConfirmModal(false);
                  handlePaymentComplete();
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-bold"
              >
                ✓ Pago Realizado
              </Button>
              <Button
                onClick={() => setShowPayPalConfirmModal(false)}
                variant="outline"
                className="w-full"
              >
                Cancelar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
