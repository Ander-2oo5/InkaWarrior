import { motion } from 'motion/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Mail, Lock, Phone, Waves } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface LoginViewProps {
  onLogin: (userData: any) => void;
  onNavigate: (view: string) => void;
}

export function LoginView({ onLogin, onNavigate }: LoginViewProps) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    level: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulación de login
    setTimeout(() => {
      setIsLoading(false);
      
      // Datos de usuario simulados
      const userData = {
        name: 'Juan Pérez',
        email: loginData.email,
        phone: '+51 999 123 456',
        level: 'Intermedio',
        classesCompleted: 12,
        isAuthenticated: true,
      };

      onLogin(userData);
      toast.success('¡Bienvenido de vuelta! 🌊', {
        description: 'Has iniciado sesión correctamente.',
      });
      
      setTimeout(() => {
        onNavigate('profile');
      }, 1000);
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (registerData.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!registerData.level) {
      toast.error('Por favor selecciona tu nivel de experiencia');
      return;
    }

    setIsLoading(true);

    // Simulación de registro
    setTimeout(() => {
      setIsLoading(false);

      const userData = {
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        level: registerData.level,
        classesCompleted: 0,
        isAuthenticated: true,
      };

      onLogin(userData);
      
      toast.success('¡Cuenta creada exitosamente! 🎉', {
        description: 'Bienvenido a la familia InkaWarrior.',
      });

      // Enviar notificaciones de bienvenida
      setTimeout(() => {
        toast.info('📧 Email de bienvenida enviado');
      }, 1000);

      setTimeout(() => {
        onNavigate('profile');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-32 bg-gradient-to-br from-[#F4F6F7] to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Waves className="w-12 h-12 text-[#004080]" />
            <h1 className="text-[#004080]" style={{ fontSize: '3rem', fontWeight: 700 }}>
              InkaWarrior
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Inicia sesión o crea tu cuenta para comenzar tu aventura
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <Card className="shadow-xl">
            <CardContent className="p-6">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                  <TabsTrigger value="register">Registrarse</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Correo electrónico</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="tu@email.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          className="pl-10 border-[#2E86C1]/30 focus:border-[#2E86C1]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className="pl-10 border-[#2E86C1]/30 focus:border-[#2E86C1]"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <button
                        type="button"
                        className="text-[#2E86C1] hover:underline"
                        onClick={() => toast.info('Contacta a soporte para recuperar tu contraseña')}
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-blue-800">
                        💡 <strong>Modo demo:</strong> Usa cualquier email y contraseña para probar la aplicación
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#2E86C1] hover:bg-[#004080] text-white py-6"
                      style={{ fontSize: '1.1rem', fontWeight: 600 }}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Iniciando...
                        </div>
                      ) : (
                        'Iniciar Sesión'
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Nombre completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Tu nombre"
                          value={registerData.name}
                          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                          className="pl-10 border-[#2E86C1]/30 focus:border-[#2E86C1]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Correo electrónico</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="tu@email.com"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                          className="pl-10 border-[#2E86C1]/30 focus:border-[#2E86C1]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-phone">Teléfono</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="register-phone"
                          type="tel"
                          placeholder="+51 999 999 999"
                          value={registerData.phone}
                          onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                          className="pl-10 border-[#2E86C1]/30 focus:border-[#2E86C1]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-level">Nivel de experiencia</Label>
                      <Select
                        value={registerData.level}
                        onValueChange={(value: string) => setRegisterData({ ...registerData, level: value })}
                      >
                        <SelectTrigger className="border-[#2E86C1]/30">
                          <SelectValue placeholder="Selecciona tu nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Principiante">Principiante</SelectItem>
                          <SelectItem value="Intermedio">Intermedio</SelectItem>
                          <SelectItem value="Avanzado">Avanzado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="Mínimo 6 caracteres"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          className="pl-10 border-[#2E86C1]/30 focus:border-[#2E86C1]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password">Confirmar contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="register-confirm-password"
                          type="password"
                          placeholder="Repite tu contraseña"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                          className="pl-10 border-[#2E86C1]/30 focus:border-[#2E86C1]"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#2E86C1] hover:bg-[#004080] text-white py-6"
                      style={{ fontSize: '1.1rem', fontWeight: 600 }}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Creando cuenta...
                        </div>
                      ) : (
                        'Crear Cuenta'
                      )}
                    </Button>

                    <p className="text-center text-sm text-gray-500 mt-4">
                      Al registrarte, aceptas nuestros términos de servicio y política de privacidad
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <Button
              variant="ghost"
              onClick={() => onNavigate('home')}
              className="text-gray-600 hover:text-[#004080]"
            >
              ← Volver al inicio
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
