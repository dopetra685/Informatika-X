import React, { useState } from 'react';
import './App.css';

const data = [
  { id: 1, name: 'Keyboard', type: 'hardware' },
  { id: 2, name: 'RAM', type: 'hardware' },
  { id: 3, name: 'Microsoft Word', type: 'software' },
  { id: 4, name: 'Printer', type: 'hardware' },
  { id: 5, name: 'Google Chrome', type: 'software' },
];

const questions = [
  {
    question: 'Apa fungsi utama dari RAM?',
    options: [
      'Menyimpan data permanen',
      'Memproses data sementara',
      'Mencetak dokumen',
      'Mengakses internet'
    ],
    answer: 1
  },
  {
    question: 'Contoh software sistem adalah:',
    options: [
      'Microsoft Word',
      'Windows 10',
      'Google Chrome',
      'Photoshop'
    ],
    answer: 1
  }
];

function App() {
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(0);
  const [dragged, setDragged] = useState(null);
  const [answers, setAnswers] = useState([]);

  const handleDragStart = (item) => {
    setDragged(item);
  };

  const handleDrop = (zoneType) => {
    if (!dragged) return;
    if (dragged.type === zoneType) setScore(score + 10);
    else setScore(score - 5);
    setAnswers([...answers, dragged.id]);
    setDragged(null);
  };

  const handleAnswer = (index) => {
    const current = questions[answers.length - data.length];
    if (index === current.answer) setScore(score + 10);
    else setScore(score - 5);
    if (answers.length - data.length + 1 < questions.length) {
      setAnswers([...answers, 'q' + (answers.length - data.length)]);
    } else {
      setStep(3);
    }
  };

  const resetGame = () => {
    setStep(1);
    setScore(0);
    setAnswers([]);
    setDragged(null);
  };

  const remainingItems = data.filter(item => !answers.includes(item.id));

  return (
    <div className="App">
      <h1>Game Informatika</h1>
      <p>Skor: {score}</p>

      {step === 1 && (
        <>
          <h2>Seret dan Lepaskan ke kategori yang benar</h2>
          <div className="items">
            {remainingItems.map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item)}
                className="draggable"
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className="zones">
            <div className="zone" onDragOver={e => e.preventDefault()} onDrop={() => handleDrop('hardware')}>
              <h3>Hardware</h3>
            </div>
            <div className="zone" onDragOver={e => e.preventDefault()} onDrop={() => handleDrop('software')}>
              <h3>Software</h3>
            </div>
          </div>
          {remainingItems.length === 0 && <button onClick={() => setStep(2)}>Lanjut</button>}
        </>
      )}

      {step === 2 && (
        <>
          <h2>Pilihan Ganda</h2>
          {questions[answers.length - data.length] && (
            <div>
              <p>{questions[answers.length - data.length].question}</p>
              {questions[answers.length - data.length].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(i)}>{opt}</button>
              ))}
            </div>
          )}
        </>
      )}

      {step === 3 && (
        <>
          <h2>Selesai!</h2>
          <p>Skor akhir kamu: {score}</p>
          <button onClick={resetGame}>Main Lagi</button>
        </>
      )}
    </div>
  );
}

export default App;
