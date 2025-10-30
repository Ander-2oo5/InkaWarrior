import { motion, AnimatePresence } from 'motion/react';
import { Waves, Home, Clock, Image, Calendar, BookOpen, Phone, X, User, LogOut, LogIn } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface NavbarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  user: any;
  onLogout: () => void;
}

export function Navbar({ activeView, onNavigate, user, onLogout }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'schedule', label: 'Horarios', icon: Clock },
    { id: 'gallery', label: 'Galería', icon: Image },
    { id: 'events', label: 'Eventos', icon: Calendar },
    { id: 'booking', label: 'Agendar cita', icon: BookOpen },
    { id: 'contact', label: 'Contacto', icon: Phone },
  ];

  const handleMobileNavigate = (view: string) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => onNavigate('home')}
          >
            <Waves className="w-8 h-8 text-[#004080]" />
            <span className="text-[#004080] tracking-tight" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
              InkaWarrior
            </span>
          </motion.div>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#004080] text-white'
                      : 'text-gray-700 hover:bg-[#2E86C1] hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
            
            {/* User Menu */}
            {user ? (
              <div className="flex items-center gap-2 ml-2">
                <Button
                  onClick={() => onNavigate('profile')}
                  className={`flex items-center gap-2 ${
                    activeView === 'profile'
                      ? 'bg-[#004080]'
                      : 'bg-[#2E86C1] hover:bg-[#004080]'
                  } text-white`}
                  size="sm"
                >
                  <User className="w-4 h-4" />
                  {user.name.split(' ')[0]}
                </Button>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="text-gray-700 hover:text-red-600 hover:border-red-600"
                  size="sm"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => onNavigate('login')}
                className="ml-2 bg-[#2E86C1] hover:bg-[#004080] text-white"
                size="sm"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Iniciar Sesión
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-[#004080] mb-1"></div>
            <div className="w-6 h-0.5 bg-[#004080] mb-1"></div>
            <div className="w-6 h-0.5 bg-[#004080]"></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#004080] to-[#2E86C1]">
                <div className="flex items-center gap-2">
                  <Waves className="w-6 h-6 text-white" />
                  <span className="text-white" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                    InkaWarrior
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="p-4">
                <div className="space-y-2">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;

                    return (
                      <motion.button
                        key={item.id}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleMobileNavigate(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-[#004080] text-white'
                            : 'text-gray-700 hover:bg-[#F4F6F7]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span style={{ fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* User Section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-[#F4F6F7] rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#2E86C1] to-[#004080] rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleMobileNavigate('profile')}
                        className="w-full bg-[#2E86C1] hover:bg-[#004080] text-white"
                        size="sm"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Mi Perfil
                      </Button>
                      <Button
                        onClick={() => {
                          onLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        variant="outline"
                        className="w-full text-red-600 border-red-600 hover:bg-red-50"
                        size="sm"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleMobileNavigate('login')}
                      className="w-full bg-[#2E86C1] hover:bg-[#004080] text-white"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Iniciar Sesión
                    </Button>
                  )}
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-gray-500 mb-3" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                    Contacto Rápido
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📞 +51 999 123 456</p>
                    <p>✉️ contacto@inkawarrior.pe</p>
                    <p>📍 Playa Máncora, Piura</p>
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
