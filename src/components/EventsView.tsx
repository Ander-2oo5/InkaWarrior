import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export function EventsView() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Campeonato InkaWarrior 2025',
      date: '15 de Noviembre, 2025',
  location: 'Playa Máncora',
      image: 'https://images.unsplash.com/photo-1759050533223-61989087d922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmJTIwY29tcGV0aXRpb24lMjBldmVudHxlbnwxfHx8fDE3NjE4NDU2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      participants: 50,
      description: 'Competencia anual de surf para todos los niveles. ¡Ven y demuestra tu habilidad!',
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Clase Especial: Surf al Amanecer',
      date: '10 de Noviembre, 2025',
  location: 'Playa Máncora',
      image: 'https://images.unsplash.com/photo-1633309680676-32ad550259d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmYm9hcmQlMjBiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3NjE3ODM3MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      participants: 20,
      description: 'Experimenta la magia de surfear durante el amanecer con nuestros instructores expertos.',
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'Workshop: Técnicas Avanzadas',
      date: '22 de Noviembre, 2025',
  location: 'Playa Máncora',
      image: 'https://images.unsplash.com/photo-1606710402690-2d364a7c86ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmJTIwaW5zdHJ1Y3RvciUyMHRlYWNoaW5nfGVufDF8fHx8MTc2MTgyODE1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      participants: 15,
      description: 'Aprende técnicas avanzadas de surf con campeones nacionales.',
      status: 'upcoming',
    },
    {
      id: 4,
      title: 'Fiesta de Verano InkaWarrior',
      date: '5 de Diciembre, 2025',
  location: 'Playa Máncora',
      image: 'https://images.unsplash.com/photo-1651065224193-6d738c9287c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGJlYWNoJTIwYWVyaWFsfGVufDF8fHx8MTc2MTg0NTYyNXww&ixlib=rb-4.1.0&q=80&w=1080',
      participants: 100,
      description: 'Celebra el verano con música, surf y mucha diversión. ¡Evento familiar!',
      status: 'upcoming',
    },
  ];

  const pastEvents = [
    {
      id: 5,
      title: 'Torneo de Primavera 2024',
      date: '20 de Septiembre, 2024',
  location: 'Playa Máncora',
      image: 'https://images.unsplash.com/photo-1613495129702-594ef68625a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmaW5nJTIwYWN0aW9uJTIwc3BvcnR8ZW58MXx8fHwxNzYxODQ1NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      participants: 45,
      status: 'past',
    },
    {
      id: 6,
      title: 'Limpieza de Playas InkaWarrior',
      date: '15 de Agosto, 2024',
  location: 'Playa Máncora',
      image: 'https://images.unsplash.com/photo-1644773357253-86decfe52166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmaW5nJTIwb2NlYW4lMjB3YXZlc3xlbnwxfHx8fDE3NjE3NTY3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      participants: 80,
      status: 'past',
    },
  ];

  const handleParticipate = (eventTitle: string) => {
    toast.success(`¡Inscripción iniciada para "${eventTitle}"!`, {
      description: 'Recibirás un correo de confirmación pronto.',
    });
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
            Eventos InkaWarrior
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Únete a nuestros eventos exclusivos y vive experiencias inolvidables con la comunidad surfista
          </p>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-[#004080] mb-8" style={{ fontSize: '2rem', fontWeight: 600 }}>
            Próximos Eventos
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                      Próximamente
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-[#004080]">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-[#2E86C1]" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-[#2E86C1]" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users className="w-4 h-4 text-[#2E86C1]" />
                        <span>{event.participants} participantes esperados</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleParticipate(event.title)}
                      className="w-full bg-[#2E86C1] hover:bg-[#004080] text-white"
                    >
                      Participar
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Past Events */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-[#004080] mb-8" style={{ fontSize: '2rem', fontWeight: 600 }}>
            Eventos Pasados
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-[#004080] mb-2" style={{ fontWeight: 600 }}>
                      {event.title}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
