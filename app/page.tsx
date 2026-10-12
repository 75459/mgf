'use client'

import { useState } from 'react'

const noMessages = ['Serio?', 'Naprawdę?', 'Jesteś pewien?', 'Pomyśl jeszcze raz…', 'Nie uciekaj od miłości', 'Ostatnia szansa!']
const hearts = Array.from({ length: 38 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 61) % 100}%`,
  size: 12 + ((index * 13) % 20),
  delay: `${(index % 9) * 0.55}s`,
  duration: `${5 + (index % 5)}s`,
  color: index % 3 === 0 ? 'heart-purple' : 'heart-red',
  opacity: 0.15 + ((index % 5) * 0.06),
}))

export default function Page() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [accepted, setAccepted] = useState(false)

  function escapeNo() {
    setMessageIndex((current) => Math.min(current + 1, noMessages.length - 1))
    setNoPosition({
      x: Math.round((Math.random() * 96 - 48)),
      y: Math.round((Math.random() * 56 - 28)),
    })
  }

  return (
    <main className="love-page">
      <div className="heart-field" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className={`floating-heart ${heart.color}`}
            style={{
              left: heart.left,
              top: heart.top,
              fontSize: heart.size,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              opacity: heart.opacity,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <section className="love-card" aria-live="polite">
        <div className="card-kicker"><span /> dla najważniejszej osoby <span /></div>
        <div className="main-heart" aria-hidden="true">♥</div>
        <h1>{accepted ? 'Wiedziałem!' : messageIndex === 0 ? 'Kochasz mnie?' : noMessages[messageIndex]}</h1>
        <p className="subtitle">
          {accepted ? 'To ja kocham Ciebie najbardziej.' : 'Mam nadzieję, że odpowiedź brzmi…'}
        </p>

        {accepted ? (
          <div className="yes-message">♥ <span>Ja Ciebie też!</span> ♥</div>
        ) : (
          <div className="actions">
            <button className="yes-button" onClick={() => setAccepted(true)}>Tak</button>
            <button
              className="no-button"
              onClick={escapeNo}
              style={{ transform: `translate(${noPosition.x}px, ${noPosition.y}px)` }}
            >
              Nie
            </button>
          </div>
        )}
        <p className="tiny-note">z całego serca</p>
      </section>
    </main>
  )
}
