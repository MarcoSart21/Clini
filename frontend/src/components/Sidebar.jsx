import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Stethoscope, CalendarDays, Heart, LogOut } from 'lucide-react'
import { auth } from '../api'

const links = [
  { to: '/',               icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/pacientes',      icon: Users,           label: 'Pacientes' },
  { to: '/doctores',       icon: Stethoscope,     label: 'Doctores' },
  { to: '/citas',          icon: CalendarDays,    label: 'Citas' },
  { to: '/especialidades', icon: Heart,           label: 'Especialidades' },
]

export default function Sidebar() {
  const navigate  = useNavigate()
  const user      = auth.getUser()

  const handleLogout = () => {
    auth.logout()
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__brand-icon">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="18" y="6" width="12" height="36" rx="5" fill="white"/>
            <rect x="6" y="18" width="36" height="12" rx="5" fill="white"/>
          </svg>
        </div>
        <div className="sidebar__brand-text">
          <h1>Clínica</h1>
          <span>Sistema Médico</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        <div className="sidebar__section-label">Navegación</div>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
            }
          >
            <l.icon />
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        {user && (
          <div className="sidebar__user">
            <div className="sidebar__avatar">
              {(user.nombre || user.username).charAt(0).toUpperCase()}
            </div>
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">{user.nombre || user.username}</span>
              <span className="sidebar__user-rol">{user.rol}</span>
            </div>
          </div>
        )}
        <button className="sidebar__logout" onClick={handleLogout} title="Cerrar sesión">
          <LogOut size={15} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  )
}
