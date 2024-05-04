import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './style.css'

// import CourseItem from '../CourseItem'
import Header from '../Header'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {courseDetails: [], requestStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getCoursesItemDetails()
  }

  getCoursesItemDetails = async () => {
    this.setState({requestStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok) {
      const data = await response.json()
      const modifiedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      //   console.log(modifiedData)

      this.setState({
        requestStatus: apiStatusConstant.success,
        courseDetails: modifiedData,
      })
    } else {
      this.setState({requestStatus: apiStatusConstant.failure})
    }
  }

  onClickRetry = () => {
    this.getCoursesItemDetails()
  }

  renderErrorView = () => (
    <div className="error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="error-image"
      />
      <h1 className="error-text">Oops! Something Went Wrong</h1>
      <p className="error-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        onClick={this.onClickRetry}
        className="error-button"
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader
        type="ThreeDots"
        width="80"
        height="80"
        color="#7f00f7"
        radius={9}
      />
    </div>
  )

  renderHomePage = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails

    return (
      <div className="home-page-container">
        <div className="home-page-inner-container">
          <img src={imageUrl} alt={name} className="home-page-image" />
          <div className="home-page-text">
            <h2 className="home-page-name">{name}</h2>
            <p className="home-page-description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  successView = () => {
    const {requestStatus} = this.state

    switch (requestStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      case apiStatusConstant.success:
        return this.renderHomePage()
      case apiStatusConstant.failure:
        return this.renderErrorView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.successView()}
      </>
    )
  }
}

export default CourseItemDetails
