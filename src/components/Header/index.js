import {withRouter, Link} from 'react-router-dom'
import './style.css'

const Header = () => (
  <Link to="/" className="link-item">
    <nav className="navBar">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="website-logo"
      />
    </nav>
  </Link>
)

export default withRouter(Header)
