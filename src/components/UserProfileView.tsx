import { motion } from 'motion/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, Clock, MapPin, User, Mail, Phone, CheckCircle, XCircle, CalendarClock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

interface UserProfileViewProps {
  onNavigate: (view: string) => void;
  user: any;
}

export function UserProfileView({ onNavigate, user }: UserProfileViewProps) {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      date: '2025-11-05',
      time: '08:00 - 10:00',
      level: 'Intermedio',
      instructor: 'Ana Torres',
      status: 'confirmed',
      location: 'Playa Máncora',
      paymentMethod: 'Yape',
    },
    {
      id: 2,
      date: '2025-11-12',
      time: '10:30 - 12:30',
      level: 'Intermedio',
      instructor: 'Carlos Mendoza',
      status: 'confirmed',
      location: 'Playa Máncora',
      paymentMethod: 'Tarjeta',
    },
    {
      id: 3,
      date: '2025-11-20',
      time: '15:00 - 17:00',
      level: 'Avanzado',
      instructor: 'Diego Vargas',
      status: 'confirmed',
      location: 'Playa Máncora',
      paymentMethod: 'PayPal',
    },
  ]);

  const [pastBookings] = useState([
    {
      id: 101,
      date: '2025-10-15',
      time: '09:00 - 11:00',
      level: 'Principiante',
      instructor: 'María López',
      status: 'completed',
      location: 'Playa Máncora',
      paymentMethod: 'Plin',
    },
    {
      id: 102,
      date: '2025-10-22',
      time: '08:00 - 10:00',
      level: 'Intermedio',
      instructor: 'Ana Torres',
      status: 'completed',
      location: 'Playa Máncora',
      paymentMethod: 'Yape',
    },
    {
      id: 103,
      date: '2025-10-28',
      time: '14:00 - 16:00',
      level: 'Intermedio',
      instructor: 'Carlos Mendoza',
      status: 'cancelled',
      location: 'Playa Máncora',
      paymentMethod: 'Tarjeta',
    },
  ]);

  const userInfo = user || {
    name: 'Usuario',
    email: 'usuario@email.com',
    phone: '+51 999 999 999',
    level: 'Principiante',
    classesCompleted: 0,
  };

  const handleCancelBooking = (bookingId: number) => {
    setBookings(bookings.filter(b => b.id !== bookingId));
    toast.success('Reserva cancelada exitosamente', {
      description: 'Te hemos enviado la confirmación por email y WhatsApp.',
    });
  };

  const handleReschedule = (bookingId: number) => {
    toast.info('Redirigiendo a reprogramación...', {
      description: 'Selecciona tu nuevo horario preferido.',
    });
    setTimeout(() => {
      onNavigate('booking');
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-600 text-white">Confirmada</Badge>;
      case 'completed':
        return <Badge className="bg-blue-600 text-white">Completada</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-600 text-white">Cancelada</Badge>;
      default:
        return <Badge className="bg-gray-600 text-white">Pendiente</Badge>;
    }
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
            Mi Perfil
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Gestiona tus reservas y revisa tu historial de clases
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* User Info Card */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24">
              <CardHeader className="bg-gradient-to-r from-[#004080] to-[#2E86C1] text-white">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Nombre</p>
                  <p className="font-semibold text-gray-900">{userInfo.name}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4 text-[#2E86C1]" />
                  <span className="text-sm">{userInfo.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-[#2E86C1]" />
                  <span className="text-sm">{userInfo.phone}</span>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500">Nivel actual</p>
                  <Badge className="bg-[#1B6FA8] text-white mt-1">{userInfo.level}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Clases completadas</p>
                  <p className="text-2xl font-bold text-[#004080]">{userInfo.classesCompleted}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bookings Section */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="upcoming">Próximas Clases</TabsTrigger>
                <TabsTrigger value="history">Historial</TabsTrigger>
              </TabsList>

              {/* Upcoming Bookings */}
              <TabsContent value="upcoming" className="space-y-4">
                {bookings.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <CalendarClock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-gray-600 mb-2" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                        No tienes clases programadas
                      </h3>
                      <p className="text-gray-500 mb-6">
                        ¡Reserva tu próxima clase y sigue mejorando!
                      </p>
                      <Button
                        onClick={() => onNavigate('booking')}
                        className="bg-[#2E86C1] hover:bg-[#004080] text-white"
                      >
                        Reservar Clase
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  bookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card className="border-l-4 border-l-[#2E86C1] hover:shadow-lg transition-all">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="text-gray-900" style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                                  Clase de {booking.level}
                                </h3>
                                {getStatusBadge(booking.status)}
                              </div>
                              
                              <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-[#2E86C1]" />
                                  <span>{new Date(booking.date).toLocaleDateString('es-PE', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-[#2E86C1]" />
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-[#2E86C1]" />
                                  <span>{booking.instructor}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-[#2E86C1]" />
                                  <span>{booking.location}</span>
                                </div>
                              </div>

                              <div className="text-xs text-gray-500">
                                Pago: {booking.paymentMethod}
                              </div>
                            </div>

                            <div className="flex md:flex-col gap-2">
                              <Button
                                onClick={() => handleReschedule(booking.id)}
                                variant="outline"
                                className="flex-1 md:flex-none border-[#2E86C1] text-[#2E86C1] hover:bg-[#2E86C1] hover:text-white"
                                size="sm"
                              >
                                Reprogramar
                              </Button>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="flex-1 md:flex-none border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                    size="sm"
                                  >
                                    Cancelar
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>¿Cancelar reserva?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Esta acción cancelará tu clase del {new Date(booking.date).toLocaleDateString('es-PE')}.
                                      Se te enviará una confirmación por email y WhatsApp.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>No, mantener</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleCancelBooking(booking.id)}
                                      className="bg-red-500 hover:bg-red-600"
                                    >
                                      Sí, cancelar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </TabsContent>

              {/* History */}
              <TabsContent value="history" className="space-y-4">
                {pastBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className={`border-l-4 ${
                      booking.status === 'completed' ? 'border-l-blue-500' : 'border-l-gray-400'
                    } hover:shadow-lg transition-all`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="text-gray-900" style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                                Clase de {booking.level}
                              </h3>
                              {getStatusBadge(booking.status)}
                            </div>
                            
                            <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span>{new Date(booking.date).toLocaleDateString('es-PE', { 
                                  weekday: 'long', 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span>{booking.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gray-500" />
                                <span>{booking.instructor}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span>{booking.location}</span>
                              </div>
                            </div>
                          </div>

                          {booking.status === 'completed' && (
                            <div className="flex items-center gap-2 text-blue-600">
                              <CheckCircle className="w-5 h-5" />
                              <span className="text-sm font-medium">Completada</span>
                            </div>
                          )}
                          {booking.status === 'cancelled' && (
                            <div className="flex items-center gap-2 text-red-600">
                              <XCircle className="w-5 h-5" />
                              <span className="text-sm font-medium">Cancelada</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
