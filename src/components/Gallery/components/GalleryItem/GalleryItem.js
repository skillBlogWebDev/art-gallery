import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { getAuthorById, getLocationById } from '../../../../api'
import './styles.scss'

export const GalleryItem = ({ src, title, created, authorId, locationId }) => {
  const [author, setAuthor] = useState([])
  const [location, setLocation] = useState([])
  const shouldLoadPaintData = useRef(true)

  useEffect(() => {
    if (shouldLoadPaintData.current) {
      shouldLoadPaintData.current = false
      loadAuthor()
      loadLocation()
    }
  }, [])

  const loadAuthor = async () => {
    const name = await getAuthorById(authorId)

    setAuthor(name)
  }

  const loadLocation = async () => {
    const location = await getLocationById(locationId)

    setLocation(location)
  }

  return (
    <li className="gallery-item">
      <img
        className="gallery-item__img"
        src={`${process.env.REACT_APP_SERVER_URL}/${src}`}
        alt={title}
      />
      <div className="gallery-item__inner">
        <h3 className="gallery-item__title">{title}</h3>
        <p className="gallery-item-text">
          <span className="gallery-item-text__title">
            Author:
            <span className="gallery-item-text__description">{author}</span>
          </span>
          <span className="gallery-item-text__title">
            Created:
            <span className="gallery-item-text__description">{created}</span>
          </span>
          <span className="gallery-item-text__title">
            Location:
            <span className="gallery-item-text__description">{location}</span>
          </span>
        </p>
      </div>
    </li>
  )
}

GalleryItem.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  created: PropTypes.string,
  author: PropTypes.string,
  location: PropTypes.string,
  authorId: PropTypes.number,
  locationId: PropTypes.number,
}
