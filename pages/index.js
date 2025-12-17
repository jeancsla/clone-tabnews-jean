import { useState, useEffect } from "react"

export default function Home() {
  const [datingTime, setDatingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [marriageTime, setMarriageTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Timer Effect
  useEffect(() => {
    const datingStart = new Date("2019-05-30T00:00:00")
    const marriageStart = new Date("2024-11-23T00:00:00")

    const interval = setInterval(() => {
      const now = new Date()
      setDatingTime(calculateTime(now - datingStart))
      setMarriageTime(calculateTime(now - marriageStart))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Theme Effect
  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
    } else {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem("theme", newMode ? "dark" : "light")
  }

  function calculateTime(diff) {
    const seconds = Math.floor((diff / 1000) % 60)
    const minutes = Math.floor((diff / 1000 / 60) % 60)
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    return { days, hours, minutes, seconds }
  }

  return (
    <div className={`container ${isDarkMode ? "dark" : "light"}`}>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Alternar tema"
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>

      <div className="content">
        <h1>
          <span className="name">Lisandra</span>, amo você!
        </h1>
        <p className="subtitle">
          Sem você minha vida não teria graça. Obrigado por tudo!
        </p>

        <div className="counters">
          <div className="card">
            <h2>Namorando</h2>
            <div className="timer">
              <div className="time-unit">
                <span className="number">{datingTime.days}</span>
                <span className="label">dias</span>
              </div>
              <div className="separator">:</div>
              <div className="time-unit">
                <span className="number">
                  {String(datingTime.hours).padStart(2, "0")}
                </span>
                <span className="label">horas</span>
              </div>
              <div className="separator">:</div>
              <div className="time-unit">
                <span className="number">
                  {String(datingTime.minutes).padStart(2, "0")}
                </span>
                <span className="label">min</span>
              </div>
              <div className="separator">:</div>
              <div className="time-unit">
                <span className="number">
                  {String(datingTime.seconds).padStart(2, "0")}
                </span>
                <span className="label">seg</span>
              </div>
            </div>
            <p className="date-info">Desde 30 de Maio de 2019</p>
          </div>

          <div className="card">
            <h2>Casados</h2>
            <div className="timer">
              <div className="time-unit">
                <span className="number">{marriageTime.days}</span>
                <span className="label">dias</span>
              </div>
              <div className="separator">:</div>
              <div className="time-unit">
                <span className="number">
                  {String(marriageTime.hours).padStart(2, "0")}
                </span>
                <span className="label">horas</span>
              </div>
              <div className="separator">:</div>
              <div className="time-unit">
                <span className="number">
                  {String(marriageTime.minutes).padStart(2, "0")}
                </span>
                <span className="label">min</span>
              </div>
              <div className="separator">:</div>
              <div className="time-unit">
                <span className="number">
                  {String(marriageTime.seconds).padStart(2, "0")}
                </span>
                <span className="label">seg</span>
              </div>
            </div>
            <p className="date-info">Desde 23 de Novembro de 2024</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");

        :root {
          --bg-color-dark: #121214;
          --text-color-dark: #e1e1e6;
          --card-bg-dark: #202024;
          --card-border-dark: #323238;
          --subtitle-dark: #a8a8b3;
          --label-dark: #737380;

          --bg-color-light: #f0f2f5;
          --text-color-light: #121214;
          --card-bg-light: #ffffff;
          --card-border-light: #dcdce6;
          --subtitle-light: #737380;
          --label-light: #505059;

          --primary-pink: #ff4081;
          --primary-purple: #8257e5;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: "Inter", sans-serif;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          padding: 2rem;
          box-sizing: border-box;
          position: relative;
          transition: all 0.3s ease;
        }

        /* Dark Theme */
        .container.dark {
          background-color: var(--bg-color-dark);
          color: var(--text-color-dark);
        }
        .container.dark .card {
          background-color: var(--card-bg-dark);
          border-color: var(--card-border-dark);
        }
        .container.dark .subtitle {
          color: var(--subtitle-dark);
        }
        .container.dark .label,
        .container.dark .date-info {
          color: var(--label-dark);
        }
        .container.dark .number {
          color: #fff;
        }

        /* Light Theme */
        .container.light {
          background-color: var(--bg-color-light);
          color: var(--text-color-light);
        }
        .container.light .card {
          background-color: var(--card-bg-light);
          border-color: var(--card-border-light);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .container.light .subtitle {
          color: var(--subtitle-light);
        }
        .container.light .label,
        .container.light .date-info {
          color: var(--label-light);
        }
        .container.light .number {
          color: #121214;
        }

        .theme-toggle {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: transform 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .theme-toggle:hover {
          transform: scale(1.1);
          background-color: rgba(128, 128, 128, 0.1);
        }

        .content {
          text-align: center;
          max-width: 800px;
          animation: fadeIn 1.5s ease-out;
          width: 100%;
        }

        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .name {
          color: var(--primary-pink);
          background: -webkit-linear-gradient(
            45deg,
            var(--primary-pink),
            #f50057
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }

        .subtitle {
          font-size: 1.2rem;
          margin-bottom: 3rem;
          transition: color 0.3s;
        }

        .counters {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .card {
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid;
          min-width: 300px;
          transition: all 0.3s ease;
          flex: 1;
        }

        .card:hover {
          transform: translateY(-5px);
          border-color: var(--primary-pink) !important;
        }

        h2 {
          color: var(--primary-purple);
          margin-top: 0;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 1rem;
        }

        .timer {
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: monospace;
          gap: 0.5rem;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .time-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .number {
          font-weight: bold;
          font-size: 2.5rem;
        }

        .label {
          font-size: 0.8rem;
          text-transform: uppercase;
        }

        .separator {
          font-size: 2rem;
          color: var(--primary-pink);
          margin-bottom: 15px;
        }

        .date-info {
          font-size: 0.875rem;
          margin: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem;
          }
          .counters {
            flex-direction: column;
          }
          .card {
            width: 100%;
            min-width: auto;
          }
          .theme-toggle {
            top: 1rem;
            right: 1rem;
          }
        }
      `}</style>
    </div>
  )
}
