import { motion } from 'motion/react';
import { Award, Shield, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeViewProps {
  onNavigate: (view: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const features = [
    {
      icon: Users,
      title: 'Aprende con los mejores instructores',
      description: 'Profesionales certificados con años de experiencia en las olas peruanas',
    },
    {
      icon: Award,
      title: 'Equipos de alta calidad',
      description: 'Tablas y trajes de neopreno de última generación para tu seguridad',
    },
    {
      icon: Shield,
      title: 'Experiencia segura y divertida',
      description: 'Protocolos de seguridad y grupos reducidos para un aprendizaje óptimo',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[600px] overflow-hidden"
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1644773357253-86decfe52166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmaW5nJTIwb2NlYW4lMjB3YXZlc3xlbnwxfHx8fDE3NjE3NTY3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Surfista en acción"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#004080]/80 to-[#2E86C1]/60" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ fontWeight: 700, lineHeight: '1.2' }}
            >
              Vive la fuerza del mar, siente el espíritu Inka
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8 text-base sm:text-lg md:text-xl"
            >
              Descubre el surf auténtico en las mejores playas del Perú
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => onNavigate('booking')}
                className="bg-[#2E86C1] hover:bg-[#004080] text-white px-8 py-6 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
                style={{ fontSize: '1.1rem', fontWeight: 600 }}
              >
                Hacer Reserva
              </Button>
              <Button
                onClick={() => onNavigate('events')}
                variant="outline"
                className="bg-white/20 backdrop-blur-sm text-white border-white hover:bg-white hover:text-[#004080] px-8 py-6 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
                style={{ fontSize: '1.1rem', fontWeight: 600 }}
              >
                Ver próximos eventos
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }} className="text-[#004080] mb-4">
            ¿Por qué InkaWarrior?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Somos más que una escuela de surf, somos una familia que comparte la pasión por las olas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-2 border-none shadow-md">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#2E86C1] to-[#004080] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="mb-4 text-[#004080]" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* About Preview */}
      <div className="bg-[#F4F6F7] py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#004080] mb-6" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                Sobre InkaWarrior
              </h2>
              <p className="text-gray-700 mb-6" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Nacimos entre las olas para inspirar a la nueva generación de surfistas peruanos. 
                Con más de 10 años de experiencia, hemos formado a cientos de estudiantes que 
                ahora disfrutan del mar con confianza y seguridad.
              </p>
              <div className="bg-[#004080] text-white p-6 rounded-lg border-l-4 border-[#2E86C1] italic">
                "Nacimos entre las olas para inspirar a la nueva generación de surfistas peruanos."
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1606710402690-2d364a7c86ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmJTIwaW5zdHJ1Y3RvciUyMHRlYWNoaW5nfGVufDF8fHx8MTc2MTgyODE1Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Instructor de surf"
                className="w-full h-[500px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
