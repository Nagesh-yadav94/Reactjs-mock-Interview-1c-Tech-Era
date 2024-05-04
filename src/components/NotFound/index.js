import Header from '../Header'
import './style.css'

const NotFound = () => (
  <>
    <Header />
    <div className="error-container">
      <img
        className="error-image"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <h1 className="error-heading">Page Not Found</h1>
      <p className="error-description">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </>
)
export default NotFound
