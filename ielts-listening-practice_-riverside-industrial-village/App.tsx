
import React, { useState, useCallback } from 'react';
import { QUESTIONS, AUDIO_LINK, MAP_IMAGE_URL } from './constants';
import { UserAnswer, Feedback } from './types';
import InputSection from './components/InputSection';

const App: React.FC = () => {
  const [answers, setAnswers] = useState<UserAnswer>({});
  const [feedback, setFeedback] = useState<Feedback>({});
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = useCallback((id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
    // Reset feedback when user types again
    if (submitted) {
      setFeedback(prev => ({ ...prev, [id]: null }));
    }
  }, [submitted]);

  const checkAnswers = () => {
    let correctCount = 0;
    const newFeedback: Feedback = {};

    QUESTIONS.forEach((q) => {
      const userAnswer = (answers[q.id] || '').trim().toLowerCase();
      const isCorrect = q.answerKey.some(key => key.toLowerCase() === userAnswer);
      
      newFeedback[q.id] = isCorrect ? 'correct' : 'incorrect';
      if (isCorrect) correctCount++;
    });

    const finalScore = (10 * correctCount) / QUESTIONS.length;
    setScore(Number(finalScore.toFixed(1)));
    setFeedback(newFeedback);
    setSubmitted(true);
    
    // Smooth scroll to results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetTest = () => {
    setAnswers({});
    setFeedback({});
    setScore(null);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-blue-600">IELTS Listening Practice</h1>
            <p className="text-sm text-slate-500 font-medium">Riverside Industrial Village</p>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href={AUDIO_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold hover:bg-blue-200 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Audio
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        {/* Score Board */}
        {score !== null && (
          <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-blue-100 flex flex-col items-center animate-in fade-in duration-500">
            <span className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Your Band Score Equivalent</span>
            <div className="text-5xl font-black text-blue-600 mb-2">{score} <span className="text-xl text-slate-400">/ 10</span></div>
            <p className="text-slate-600 text-center">
              {score >= 8 ? "Excellent! You have a great ear for detail." : 
               score >= 5 ? "Good job! Keep practicing to improve your accuracy." :
               "Keep going! Review the transcript and try again."}
            </p>
            <button 
              onClick={resetTest}
              className="mt-4 text-blue-600 font-semibold hover:underline"
            >
              Restart Practice
            </button>
          </div>
        )}

        {/* Part 1: Sentence Completion */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">Questions 11-13</h2>
            <p className="text-slate-600 text-sm">Complete the sentences below.</p>
            <p className="text-slate-600 text-sm font-semibold uppercase italic mt-1">
              Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-slate-700 leading-relaxed mb-4">
                <span className="font-bold">11.</span> Riverside Village was a good place to start an industry because it had water, raw materials and fuels such as 
                <span className="inline-block px-1 font-mono text-blue-600">__________</span>.
              </p>
              <InputSection 
                id="11"
                value={answers['11'] || ''}
                onChange={handleInputChange}
                feedback={feedback['11'] || null}
                placeholder="Example: wood, coal"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-slate-700 leading-relaxed mb-4">
                <span className="font-bold">12.</span> The metal industry was established at Riverside Village by 
                <span className="inline-block px-1 font-mono text-blue-600">__________</span> who lived in the area.
              </p>
              <InputSection 
                id="12"
                value={answers['12'] || ''}
                onChange={handleInputChange}
                feedback={feedback['12'] || null}
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-slate-700 leading-relaxed mb-4">
                <span className="font-bold">13.</span> There were over 
                <span className="inline-block px-1 font-mono text-blue-600">__________</span> water-powered mills in the area in the eighteenth century.
              </p>
              <InputSection 
                id="13"
                value={answers['13'] || ''}
                onChange={handleInputChange}
                feedback={feedback['13'] || null}
              />
            </div>
          </div>
        </section>

        {/* Part 2: Map Labeling */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">Questions 14-20</h2>
            <p className="text-slate-600 text-sm">Label the plan below.</p>
            <p className="text-slate-600 text-sm font-semibold uppercase italic mt-1">
              Write NO MORE THAN TWO WORDS for each answer.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-slate-100 rounded-xl p-2 border border-slate-200 shadow-inner">
                <img 
                  src={MAP_IMAGE_URL} 
                  alt="Riverside Industrial Village Map" 
                  className="w-full rounded-lg"
                />
              </div>
            </div>

            <div className="lg:w-1/3 space-y-2">
              <h3 className="font-bold text-slate-700 border-b pb-2 mb-4">Your Answers</h3>
              {QUESTIONS.filter(q => parseInt(q.id) >= 14).map((q) => (
                <InputSection 
                  key={q.id}
                  id={q.id}
                  value={answers[q.id] || ''}
                  onChange={handleInputChange}
                  feedback={feedback[q.id] || null}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-center mt-12 mb-20">
          <button
            onClick={checkAnswers}
            className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
          >
            Submit All Answers
          </button>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="fixed bottom-0 w-full bg-white/80 backdrop-blur-md border-t py-3 px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-slate-500 text-xs sm:text-sm">
          <p>© 2024 IELTS Training - Riverside Project</p>
          <div className="flex gap-4">
            <span>10 Questions Total</span>
            <span className="font-bold text-blue-600">Goal: Band 9.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
