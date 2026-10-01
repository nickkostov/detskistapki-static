import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, RefreshCw } from 'lucide-react';

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const createCaptcha = () => {
  const first = randomInt(3, 7);
  const second = randomInt(2, 5);
  const third = randomInt(1, 3);

  return Math.random() < 0.5
    ? { question: `(${first} + ${second}) − ${third}`, answer: first + second - third }
    : { question: `(${first} × ${second}) + ${third}`, answer: first * second + third };
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [captcha, setCaptcha] = useState(createCaptcha);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Number(captchaAnswer) !== captcha.answer) {
      setCaptchaError('Неправилен отговор. Опитайте отново.');
      setCaptchaAnswer('');
      return;
    }

    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    setCaptcha(createCaptcha());
    setCaptchaAnswer('');
    setCaptchaError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Свържете се с Нас
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Имате въпроси или искате да запишете час? Ще се радваме да се свържем с Вас.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Mail className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Имейл</h3>
                <p className="text-gray-600">contact@example.com</p>
                <p className="text-gray-600">support@example.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Phone className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Телефон</h3>
                <p className="text-gray-600">+359 888 123 456</p>
                <p className="text-gray-600">Пон - Пет, 9:00 - 18:00</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <MapPin className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Адрес</h3>
                <p className="text-gray-600">ул. Примерна 123</p>
                <p className="text-gray-600">София, 1000</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Име
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Имейл
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Съобщение
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              ></textarea>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <label htmlFor="captcha-answer" className="block text-sm font-medium text-gray-700 mb-2">
                Проверка: колко е {captcha.question}?
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  id="captcha-answer"
                  name="captcha-answer"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  value={captchaAnswer}
                  onChange={(e) => {
                    setCaptchaAnswer(e.target.value);
                    setCaptchaError('');
                  }}
                  aria-invalid={Boolean(captchaError)}
                  aria-describedby={captchaError ? 'captcha-error' : undefined}
                  className="w-28 rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    setCaptcha(createCaptcha());
                    setCaptchaAnswer('');
                    setCaptchaError('');
                  }}
                  className="rounded-md p-2 text-gray-600 hover:bg-gray-200 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  aria-label="Нова задача"
                  title="Нова задача"
                >
                  <RefreshCw size={20} />
                </button>
              </div>
              {captchaError && (
                <p id="captcha-error" role="alert" className="mt-2 text-sm text-red-600">
                  {captchaError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center group"
            >
              Изпрати съобщение
              <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
