import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { X } from 'lucide-react';

export function GalleryView() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filters = [
    { id: 'all', label: 'Todo' },
    { id: 'classes', label: 'Clases' },
    { id: 'events', label: 'Eventos' },
    { id: 'nature', label: 'Naturaleza' },
    { id: 'moments', label: 'Momentos' },
  ];

  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1644773357253-86decfe52166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmaW5nJTIwb2NlYW4lMjB3YXZlc3xlbnwxfHx8fDE3NjE3NTY3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'nature',
      title: 'Olas perfectas',
    },
    {
      url: 'https://images.unsplash.com/photo-1606710402690-2d364a7c86ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmJTIwaW5zdHJ1Y3RvciUyMHRlYWNoaW5nfGVufDF8fHx8MTc2MTgyODE1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'classes',
      title: 'Aprendiendo con expertos',
    },
    {
      url: 'https://images.unsplash.com/photo-1633309680676-32ad550259d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmYm9hcmQlMjBiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3NjE3ODM3MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'moments',
      title: 'Atardeceres mágicos',
    },
    {
      url: 'https://images.unsplash.com/photo-1759050533223-61989087d922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmJTIwY29tcGV0aXRpb24lMjBldmVudHxlbnwxfHx8fDE3NjE4NDU2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'events',
      title: 'Competencias',
    },
    {
      url: 'https://images.unsplash.com/photo-1651065224193-6d738c9287c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGJlYWNoJTIwYWVyaWFsfGVufDF8fHx8MTc2MTg0NTYyNXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'nature',
      title: 'Vista aérea',
    },
    {
      url: 'https://images.unsplash.com/photo-1613495129702-594ef68625a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmaW5nJTIwYWN0aW9uJTIwc3BvcnR8ZW58MXx8fHwxNzYxODQ1NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'moments',
      title: 'Acción pura',
    },
    {
      url: 'https://images.unsplash.com/photo-1644773357253-86decfe52166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmaW5nJTIwb2NlYW4lMjB3YXZlc3xlbnwxfHx8fDE3NjE3NTY3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'classes',
      title: 'Práctica diaria',
    },
    {
      url: 'https://images.unsplash.com/photo-1606710402690-2d364a7c86ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmJTIwaW5zdHJ1Y3RvciUyMHRlYWNoaW5nfGVufDF8fHx8MTc2MTgyODE1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'events',
      title: 'Eventos especiales',
    },
    {
      url: 'https://images.unsplash.com/photo-1633309680676-32ad550259d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmYm9hcmQlMjBiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3NjE3ODM3MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'nature',
      title: 'Belleza natural',
    },
  ];

  const filteredImages =
    selectedFilter === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedFilter);

  return (
    <div className="min-h-screen py-32 bg-gradient-to-br from-[#F4F6F7] to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-[#004080] mb-4" style={{ fontSize: '3rem', fontWeight: 700 }}>
            Galería
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Revive los mejores momentos y experiencias de nuestra comunidad InkaWarrior
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`rounded-full px-6 py-2 transition-all ${
                selectedFilter === filter.id
                  ? 'bg-[#004080] text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-[#2E86C1] hover:text-white'
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05 * index }}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all"
              onClick={() => setSelectedImage(image.url)}
              whileHover={{ scale: 1.03 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                    {image.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for enlarged image */}
        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl p-0 overflow-hidden">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-50 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            {selectedImage && (
              <ImageWithFallback
                src={selectedImage}
                alt="Imagen ampliada"
                className="w-full h-auto max-h-[90vh] object-contain"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
