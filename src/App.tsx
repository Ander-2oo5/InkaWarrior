import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ScheduleView } from './components/ScheduleView';
import { GalleryView } from './components/GalleryView';
import { EventsView } from './components/EventsView';
import { BookingView } from './components/BookingView';
import { ContactView } from './components/ContactView';
import { UserProfileView } from './components/UserProfileView';
import { LoginView } from './components/LoginView';
import { ChatBox } from './components/ChatBox';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [user, setUser] = useState<any>(null);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('inkawarrior_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('inkawarrior_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('inkawarrior_user');
    setActiveView('home');
    // Import toast
    const { toast } = require('sonner@2.0.3');
    toast.info('Sesión cerrada', {
      description: '¡Hasta pronto! Te esperamos en las olas 🌊',
    });
  };

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView onNavigate={setActiveView} />;
      case 'schedule':
        return <ScheduleView onNavigate={setActiveView} />;
      case 'gallery':
        return <GalleryView />;
      case 'events':
        return <EventsView />;
      case 'booking':
        return <BookingView user={user} onNavigate={setActiveView} />;
      case 'contact':
        return <ContactView />;
      case 'login':
        return <LoginView onLogin={handleLogin} onNavigate={setActiveView} />;
      case 'profile':
        if (!user) {
          setActiveView('login');
          return <LoginView onLogin={handleLogin} onNavigate={setActiveView} />;
        }
        return <UserProfileView onNavigate={setActiveView} user={user} />;
      default:
        return <HomeView onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeView={activeView} onNavigate={setActiveView} user={user} onLogout={handleLogout} />
      
      <motion.main
        key={activeView}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderView()}
      </motion.main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#004080] to-[#2E86C1] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* About */}
            <div>
              <h3 className="mb-4" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                InkaWarrior
              </h3>
              <p className="text-white/80">
                La mejor escuela de surf en Perú. Vive la fuerza del mar y siente el espíritu Inka.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-4" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                Contacto
              </h3>
              <ul className="space-y-2 text-white/80">
                <li>📞 +51 999 123 456</li>
                <li>✉️ contacto@inkawarrior.pe</li>
                <li>📍 Playa Máncora, Piura</li>
                <li>🕐 Lun - Dom: 7:00 AM - 8:00 PM</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80">
            <p>© 2025 InkaWarrior. Todos los derechos reservados.</p>
            <p className="mt-2 text-sm">Diseñado con ❤️ para los amantes del surf</p>
          </div>
        </div>
      </footer>

      {/* Chat Box */}
      <ChatBox />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
