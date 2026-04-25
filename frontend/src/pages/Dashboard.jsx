import { useState, useEffect } from 'react'
import { api } from '../api'
import { Users, Stethoscope, CalendarDays, Clock } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/citas/stats').then(setStats).catch(() => {})
  }, [])

  const cards = stats ? [
    {
      label: 'Pacientes',
      value: stats.pacientes,
      icon: Users,
      color: 'teal',
      description: 'Registrados en el sistema',
      trend: '+4 este mes'
    },
    {
      label: 'Doctores',
      value: stats.doctores,
      icon: Stethoscope,
      color: 'blue',
      description: 'Especialistas activos',
      trend: 'Disponibles hoy'
    },
    {
      label: 'Citas pendientes',
      value: stats.citas_pendientes,
      icon: Clock,
      color: 'amber',
      description: 'Por confirmar',
      trend: 'Requieren atención'
    },
    {
      label: 'Citas hoy',
      value: stats.citas_hoy,
      icon: CalendarDays,
      color: 'rose',
      description: 'Programadas para hoy',
      trend: 'Agenda del día'
    },
  ] : []

  const now = new Date()
  const dateStr = now.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <>
      <div className="dash-header">
        <div>
          <p className="dash-date">{dateStr}</p>
          <h2 className="dash-title">Panel de Control</h2>
        </div>
        <div className="dash-badge">
          <span className="dash-badge__dot" />
          Sistema activo
        </div>
      </div>

      {!stats ? (
        <div className="loader"><div className="spinner" /></div>
      ) : (
        <>
          <div className="stat-grid">
            {cards.map(c => (
              <div className={`stat-card stat-card--${c.color}`} key={c.label}>
                <div className="stat-card__top">
                  <div className="stat-card__icon-wrap">
                    <c.icon size={20} />
                  </div>
                  <span className="stat-card__trend">{c.trend}</span>
                </div>
                <div className="stat-card__value">{c.value}</div>
                <div className="stat-card__label">{c.label}</div>
                <div className="stat-card__desc">{c.description}</div>
                <div className="stat-card__bar">
                  <div className="stat-card__bar-fill" style={{ width: `${Math.min((c.value / 50) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="dash-summary">
            <div className="dash-summary__header">
              <h3>Resumen del día</h3>
              <span className="dash-summary__pill">Hoy</span>
            </div>
            <div className="dash-summary__body">
              <div className="dash-metric">
                <span className="dash-metric__label">Total de citas</span>
                <span className="dash-metric__value">{stats.citas_hoy + stats.citas_pendientes}</span>
              </div>
              <div className="dash-metric">
                <span className="dash-metric__label">Confirmadas</span>
                <span className="dash-metric__value dash-metric__value--ok">{stats.citas_hoy}</span>
              </div>
              <div className="dash-metric">
                <span className="dash-metric__label">Pendientes</span>
                <span className="dash-metric__value dash-metric__value--warn">{stats.citas_pendientes}</span>
              </div>
              <div className="dash-metric">
                <span className="dash-metric__label">Ocupación médica</span>
                <span className="dash-metric__value">{stats.doctores > 0 ? Math.round((stats.citas_hoy / stats.doctores) * 10) / 10 : 0} citas/doc</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
