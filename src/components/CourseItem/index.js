import {Link} from 'react-router-dom'

import './style.css'

const CourseItem = props => {
  const {courseData} = props
  const {id, name, imageUrl} = courseData

  return (
    <Link to={`/courses/${id}`} className="link-item">
      <li className="list-item">
        <img src={imageUrl} alt={name} className="list-image" />
        <p className="list-name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
