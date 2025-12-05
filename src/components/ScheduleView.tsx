import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, Users } from 'lucide-react';
import { toast } from 'sonner';

interface ScheduleViewProps {
  onNavigate: (view: string) => void;
}

export function ScheduleView({ onNavigate }: ScheduleViewProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const levels = [
    { id: 'all', label: 'Todos los niveles', color: 'bg-gray-600' },
    { id: 'beginner', label: 'Principiante', color: 'bg-green-600' },
    { id: 'intermediate', label: 'Intermedio', color: 'bg-[#1B6FA8]' },
    { id: 'advanced', label: 'Avanzado', color: 'bg-[#003366]' },
  ];

  const scheduleData = [
    {
      day: 'Lunes',
      classes: [
        { time: '08:00 - 10:00', level: 'beginner', instructor: 'Carlos Mendoza', spots: 8 },
        { time: '10:30 - 12:30', level: 'intermediate', instructor: 'Ana Torres', spots: 6 },
        { time: '15:00 - 17:00', level: 'advanced', instructor: 'Diego Vargas', spots: 4 },
      ],
    },
    {
      day: 'Martes',
      classes: [
        { time: '09:00 - 11:00', level: 'beginner', instructor: 'María López', spots: 8 },
        { time: '14:00 - 16:00', level: 'intermediate', instructor: 'Carlos Mendoza', spots: 6 },
        { time: '16:30 - 18:30', level: 'advanced', instructor: 'Ana Torres', spots: 5 },
      ],
    },
    {
      day: 'Miércoles',
      classes: [
        { time: '08:00 - 10:00', level: 'intermediate', instructor: 'Diego Vargas', spots: 6 },
        { time: '10:30 - 12:30', level: 'beginner', instructor: 'María López', spots: 8 },
        { time: '15:00 - 17:00', level: 'advanced', instructor: 'Carlos Mendoza', spots: 4 },
      ],
    },
    {
      day: 'Jueves',
      classes: [
        { time: '09:00 - 11:00', level: 'beginner', instructor: 'Ana Torres', spots: 8 },
        { time: '14:00 - 16:00', level: 'advanced', instructor: 'Diego Vargas', spots: 4 },
        { time: '16:30 - 18:30', level: 'intermediate', instructor: 'María López', spots: 6 },
      ],
    },
    {
      day: 'Viernes',
      classes: [
        { time: '08:00 - 10:00', level: 'beginner', instructor: 'Carlos Mendoza', spots: 8 },
        { time: '10:30 - 12:30', level: 'intermediate', instructor: 'Ana Torres', spots: 6 },
        { time: '15:00 - 17:00', level: 'advanced', instructor: 'Diego Vargas', spots: 3 },
      ],
    },
    {
      day: 'Sábado',
      classes: [
        { time: '07:00 - 09:00', level: 'all', instructor: 'Clase grupal mixta', spots: 12 },
        { time: '09:30 - 11:30', level: 'beginner', instructor: 'María López', spots: 10 },
        { time: '14:00 - 16:00', level: 'intermediate', instructor: 'Carlos Mendoza', spots: 8 },
        { time: '16:30 - 18:30', level: 'advanced', instructor: 'Diego Vargas', spots: 5 },
      ],
    },
    {
      day: 'Domingo',
      classes: [
        { time: '07:00 - 09:00', level: 'all', instructor: 'Clase grupal mixta', spots: 12 },
        { time: '09:30 - 11:30', level: 'beginner', instructor: 'Ana Torres', spots: 10 },
        { time: '14:00 - 16:00', level: 'intermediate', instructor: 'Diego Vargas', spots: 8 },
      ],
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-600';
      case 'intermediate':
        return 'bg-[#1B6FA8]';
      case 'advanced':
        return 'bg-[#003366]';
      default:
        return 'bg-gray-600';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return 'Todos los niveles';
    }
  };

  const handleQuickBook = (day: string, time: string, level: string) => {
    toast.success(`¡Reserva iniciada para ${day} a las ${time}!`, {
      description: 'Serás redirigido al formulario de reserva.',
    });
    setTimeout(() => {
      onNavigate('booking');
    }, 1500);
  };

  const filteredSchedule = scheduleData.map(day => ({
    ...day,
    classes: day.classes.filter(c => selectedLevel === 'all' || c.level === selectedLevel || c.level === 'all')
  })).filter(day => day.classes.length > 0);

  return (
    <div className="min-h-screen py-32 bg-gradient-to-br from-[#F4F6F7] to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-[#004080] mb-4" style={{ fontSize: '3rem', fontWeight: 700 }}>
            Horarios de Clases
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Elige el horario que mejor se adapte a tu nivel y disponibilidad
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {levels.map((level) => (
            <Button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`rounded-full px-6 py-2 transition-all ${
                selectedLevel === level.id
                  ? `${level.color} text-white shadow-lg scale-105`
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {level.label}
            </Button>
          ))}
        </motion.div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredSchedule.map((daySchedule, dayIndex) => (
            <motion.div
              key={daySchedule.day}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * dayIndex }}
            >
              <Card className="h-full hover:shadow-xl transition-all border-t-4 border-t-[#2E86C1]">
                <CardHeader className="bg-gradient-to-r from-[#004080] to-[#2E86C1] text-white">
                  <CardTitle className="text-center">{daySchedule.day}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {daySchedule.classes.map((classItem, classIndex) => (
                    <div
                      key={classIndex}
                      className="bg-gradient-to-br from-[#E8F4F8] to-[#D6E9F5] p-4 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all border border-[#2E86C1]/20"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-[#2E86C1]" />
                        <span className="text-sm">{classItem.time}</span>
                      </div>
                      <Badge className={`${getLevelColor(classItem.level)} text-white mb-2`}>
                        {getLevelLabel(classItem.level)}
                      </Badge>
                      <p className="text-xs text-gray-600 mb-2">
                        Instructor: {classItem.instructor}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Users className="w-3 h-3" />
                          <span>{classItem.spots} cupos</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleQuickBook(daySchedule.day, classItem.time, classItem.level)}
                          className="bg-[#1B6FA8] hover:bg-[#003366] text-white shadow-md hover:shadow-lg transition-all"
                        >
                          Reservar
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-[#004080] to-[#2E86C1] text-white max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="mb-4" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                ¿No encuentras el horario perfecto?
              </h3>
              <p className="mb-6">
                Contáctanos y organizaremos una clase personalizada para ti
              </p>
              <Button
                onClick={() => onNavigate('contact')}
                className="bg-white text-[#004080] hover:bg-gray-100 px-8"
              >
                Contactar Ahora
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
