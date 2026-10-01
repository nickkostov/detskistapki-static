import React, { useEffect, useState } from 'react';
import { Send, Mail, Phone, MapPin, RefreshCw } from 'lucide-react';
import { loadContactFormSettings, type ContactFormSettings } from '../config/contactForm';

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
  const [formSettings, setFormSettings] = useState<ContactFormSettings | null>(null);
  const [settingsFailed, setSettingsFailed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [captcha, setCaptcha] = useState(createCaptcha);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    loadContactFormSettings(controller.signal)
      .then((settings) => {
        if (!controller.signal.aborted) setFormSettings(settings);
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          console.error('Contact form settings could not be loaded:', error);
          setSettingsFailed(true);
        }
      });

    return () => controller.abort();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formSettings?.enabled) return;

    if (formSettings.captchaEnabled && Number(captchaAnswer) !== captcha.answer) {
      setCaptchaError(formSettings.captchaError);
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

  if (!formSettings) {
    return (
      <section id="contact" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center text-gray-700 sm:px-6 lg:px-8" role="status">
          {settingsFailed
            ? 'Информацията за контакт временно не е достъпна.'
            : 'Зареждане на информацията за контакт...'}
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {formSettings.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {formSettings.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Mail className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{formSettings.contact.emailLabel}</h3>
                {formSettings.contact.emails.map((email) => (
                  <p key={email} className="text-gray-600">{email}</p>
                ))}
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Phone className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{formSettings.contact.phoneLabel}</h3>
                <p className="text-gray-600">{formSettings.contact.phone}</p>
                <p className="text-gray-600">{formSettings.contact.hours}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <MapPin className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{formSettings.contact.addressLabel}</h3>
                {formSettings.contact.addressLines.map((line) => (
                  <p key={line} className="text-gray-600">{line}</p>
                ))}
              </div>
            </div>
          </div>

          {formSettings.enabled ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {formSettings.fields.name.label}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={formSettings.fields.name.placeholder}
                  maxLength={formSettings.fields.name.maxLength}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={formSettings.fields.name.required}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {formSettings.fields.email.label}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={formSettings.fields.email.placeholder}
                  maxLength={formSettings.fields.email.maxLength}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={formSettings.fields.email.required}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {formSettings.fields.message.label}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={formSettings.fields.message.placeholder}
                  maxLength={formSettings.fields.message.maxLength}
                  rows={formSettings.fields.message.rows}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={formSettings.fields.message.required}
                ></textarea>
              </div>

              {formSettings.captchaEnabled && (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <label htmlFor="captcha-answer" className="block text-sm font-medium text-gray-700 mb-2">
                    {formSettings.captchaQuestion.replace('{question}', captcha.question)}
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
                      aria-label={formSettings.captchaRefreshLabel}
                      title={formSettings.captchaRefreshLabel}
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
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center group"
              >
                {formSettings.submitLabel}
                <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </form>
          ) : (
            <p role="status" className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-gray-700">
              {formSettings.disabledMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
