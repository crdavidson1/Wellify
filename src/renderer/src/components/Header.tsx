import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <nav>
      <div>
        <button>
          <Link to="/">Home</Link>
        </button>
        <button>
          <Link to="/statistics">Statistics</Link>
        </button>
        <button>
          <Link to="/settings">Settings</Link>
        </button>
        <button>
          <Link to="/notifications">Notifications</Link>
        </button>
      </div>
    </nav>
  )
}

export default Header
