import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const logo = 'detskistapki_logo.svg';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 500, 0);
      const transform = `translateY(${scrollY * 0.3}px)`;
      heroRef.current.style.opacity = opacity.toString();
      heroRef.current.style.transform = transform;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const words = 'Фабрика за Думички с Детски Стъпки'.split(' ');

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Logo as background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.img
          src={logo}
          alt="Лого"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }} // Прозрачно
          transition={{ duration: 1.5 }}
          className="w-[80%] max-w-5xl h-auto object-contain"
        />
      </div>

      {/* Content */}
      <div
        ref={heroRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 transition-all duration-300 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight flex flex-wrap justify-center gap-2">
          {words.map((word, index) => (
            <motion.span
              key={index}
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
              initial={{ y: -100, scale: 2, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 20,
                delay: index * 0.2
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.h2
          className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: words.length * 0.2 }}
        >
          Създаваме Магия за Вашите Деца
        </motion.h2>

        <p className="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto mb-10 leading-relaxed">
          Открийте света на въображението с нашите иновативни образователни решения за деца.
        </p>

        <div className="flex justify-center">
          <a
            href="#contact"
            className="bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-8 rounded-md transition-colors flex items-center justify-center group shadow-md"
          >
            Свържете се с нас
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};
