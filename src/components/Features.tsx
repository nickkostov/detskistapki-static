import React from 'react';
import { Zap, Shield, Layers, Users, BarChart, Clock } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      <div className="mb-4 w-12 h-12 rounded-md flex items-center justify-center transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Shield size={24} color="#3b82f6" />, // blue
      title: 'Доверие и Искреност',
      description: 'Доверете се на логопеда, бъдете искрени с него, той работи за Вас и Вашето дете. Не се притеснявайте да споделите тревогите си.'
    },
    {
      icon: <Clock size={24} color="#f59e0b" />, // amber
      title: 'Време и Търпение',
      description: 'Логопедът не използва вълшебства. Той ще направи всичко по силите си, но това отнема време и постоянство. Въоръжете се с търпение.'
    },
    {
      icon: <Users size={24} color="#10b981" />, // green
      title: 'Споделена Отговорност',
      description: 'Не прехвърляйте отговорността изцяло на логопеда. Топката е споделена и трябва отборно да я поддържаме във въздуха.'
    },
    {
      icon: <Layers size={24} color="#8b5cf6" />, // violet
      title: 'Последователност',
      description: 'Вслушвайте се в препоръките на логопеда. Колкото и да обича да говори, повечето неща, които казва, са от огромно значение.'
    },
    {
      icon: <BarChart size={24} color="#ec4899" />, // pink
      title: 'Редовност',
      description: 'Часовете са с точно начало и край. Терапията продължава целогодишно, независимо от сезона.'
    },
    {
      icon: <Zap size={24} color="#ef4444" />, // red
      title: 'Активно Участие',
      description: 'Детето Ви прекарва средно 120 минути седмично в логопедичния кабинет. Останалото време е Ваше – забавлявайте се заедно!'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Важно за Родителите
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Няколко ключови съвета за успешна логопедична терапия и развитие на Вашето дете
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
