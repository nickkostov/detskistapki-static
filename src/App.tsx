import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';

const consentKey = 'detskistapki-data-consent-v2';
type ConsentChoice = 'accepted' | 'declined' | null;

function App() {
  const [consentChoice, setConsentChoice] = useState<ConsentChoice>(() => {
    try {
      const savedChoice = localStorage.getItem(consentKey);
      return savedChoice === 'accepted' || savedChoice === 'declined' ? savedChoice : null;
    } catch {
      return null;
    }
  });

  const chooseConsent = (choice: Exclude<ConsentChoice, null>) => {
    try {
      localStorage.setItem(consentKey, choice);
    } catch {
      // Keep the choice for this visit when browser storage is unavailable.
    }
    setConsentChoice(choice);
  };

  return (
    <>
      <div className={`min-h-screen bg-white ${consentChoice === null ? 'pb-64 sm:pb-40' : ''}`}>
        <Navbar />
        <Hero />
        <Features />
        <Testimonials allowExternalImages={consentChoice === 'accepted'} />
        <Contact />
      </div>

      {consentChoice === null && (
        <section
          aria-labelledby="consent-title"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-h-[calc(100vh-2rem)] max-w-4xl overflow-y-auto rounded-xl border border-gray-200 bg-white p-5 shadow-2xl sm:p-6"
        >
          <h2 id="consent-title" className="text-lg font-bold text-gray-900">
            Вашите данни
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700 sm:text-base">
            Този сайт може да събира технически данни при посещението Ви. С Ваше съгласие
            се зареждат и изображения от външен доставчик. Можете да продължите и без съгласие.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => chooseConsent('declined')}
              className="rounded-md border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-800 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Не се съгласявам
            </button>
            <button
              type="button"
              onClick={() => chooseConsent('accepted')}
              className="rounded-md bg-blue-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Съгласявам се
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default App;
