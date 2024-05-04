import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CourseItem from '../CourseItem'
import Header from '../Header'

import './style.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {courseList: [], requestStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({requestStatus: apiStatusConstant.inProgress})

    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok) {
      const data = await response.json()
      const modifiedData = data.courses.map(course => ({
        id: course.id,
        name: course.name,
        imageUrl: course.logo_url,
      }))
      //   console.log(modifiedData)

      this.setState({
        requestStatus: apiStatusConstant.success,
        courseList: modifiedData,
      })
    } else {
      this.setState({requestStatus: apiStatusConstant.failure})
    }
  }

  onClickRetry = () => {
    this.getCourses()
  }

  renderErrorView = () => (
    <div className="error-container">
      <img
        className="error-image"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="error-name">Oops! Something Went Wrong</h1>
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
    <div className="loader-container" data-testid="loader">
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
    const {courseList} = this.state

    return (
      <div className="home-page-container">
        <div className="text-container">
          <h1 className="home-page-heading">Courses</h1>
          <ul className="list-container">
            {courseList.map(course => (
              <CourseItem key={course.id} courseData={course} />
            ))}
          </ul>
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

export default Home
