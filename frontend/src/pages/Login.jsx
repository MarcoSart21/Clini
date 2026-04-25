import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../api'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm]     = useState({ username: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await auth.login(form.username, form.password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-panel login-panel--left">
        <div className="login-panel__bg" aria-hidden="true">
          <div className="login-orb login-orb--1" />
          <div className="login-orb login-orb--2" />
          <div className="login-orb login-orb--3" />
          <svg className="login-cross" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="28" y="0" width="24" height="80" rx="8" fill="white" fillOpacity="0.15"/>
            <rect x="0" y="28" width="80" height="24" rx="8" fill="white" fillOpacity="0.15"/>
          </svg>
        </div>
        <div className="login-panel__content">
          <div className="login-brand">
            <div className="login-brand__logo">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="14" fill="white" fillOpacity="0.2"/>
                <rect x="18" y="8" width="12" height="32" rx="5" fill="white"/>
                <rect x="8" y="18" width="32" height="12" rx="5" fill="white"/>
              </svg>
            </div>
            <h1 className="login-brand__name">Clínica Médica</h1>
            <p className="login-brand__tagline">Sistema Integral de Gestión</p>
          </div>
          <ul className="login-features">
            <li><span className="login-features__dot" />Gestión de pacientes y citas</li>
            <li><span className="login-features__dot" />Control de especialidades</li>
            <li><span className="login-features__dot" />Panel médico en tiempo real</li>
          </ul>
        </div>
      </div>

      <div className="login-panel login-panel--right">
        <div className="login-card">
          <div className="login-card__header">
            <div className="login-card__eyebrow">Bienvenido de vuelta</div>
            <h2 className="login-card__title">Inicia sesión</h2>
            <p className="login-card__sub">Accede con tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 20 20" fill="none">
                  <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" fill="currentColor"/>
                </svg>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  autoFocus
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Tu nombre de usuario"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 20 20" fill="none">
                  <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" fill="currentColor"/>
                </svg>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="login-error">
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn--primary login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="btn-spinner" />
                  Iniciando sesión...
                </>
              ) : 'Iniciar sesión →'}
            </button>
          </form>

          <p className="login-hint">
            Credenciales por defecto: <strong>admin</strong> / <strong>admin123</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
