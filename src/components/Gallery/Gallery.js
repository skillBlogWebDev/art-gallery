import { useEffect, useRef, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import PropTypes from 'prop-types'
import { Pagination } from 'fwt-internship-uikit'
import { GalleryItem } from './components/GalleryItem/GalleryItem'
import { getPaintingsByPage } from '../../api'
import { AuthorSelect } from './components/AuthorSelect/AuthorSelect'
import { LocationSelect } from './components/LocationSelect/LocationSelect'
import { NameInput } from './components/NameInput/NameInput'
import { CreatedSelect } from './components/CreatedSelect/CreatedSelect'
import { resetNavPage } from '../../utils'
import './styles.scss'

export const Gallery = ({ mode }) => {
  const [spinner, setSpinner] = useState(false)
  const [paintings, setPaintings] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredPaintings, setFilteredPaintings] = useState([])
  const shouldLoadPaintings = useRef(true)
  const currentPaintings = filteredPaintings.length
    ? filteredPaintings
    : paintings

  useEffect(() => {
    if (shouldLoadPaintings.current) {
      shouldLoadPaintings.current = false
      loadPaintings()
    }
  }, [])

  const loadPaintings = () =>
    resetNavPage(setSpinner, setPageCount, setPaintings, setFilteredPaintings)

  const handlePageClick = async (currentPage) => {
    if (filteredPaintings.length) {
      setPaintings(filteredPaintings)
      setCurrentPage(currentPage)
      return
    }

    const paintings = await getPaintingsByPage(setSpinner, currentPage)

    setCurrentPage(currentPage)
    setPaintings(paintings)
  }

  return (
    <section className="gallery">
      <div className="container gallery__container">
        <div className="gallery-top">
          <NameInput
            setPaintings={setPaintings}
            setSpinner={setSpinner}
            setPageCount={setPageCount}
            setFilteredPaintings={setFilteredPaintings}
            mode={mode}
          />
          <AuthorSelect
            setPaintings={setPaintings}
            setSpinner={setSpinner}
            setPageCount={setPageCount}
            setFilteredPaintings={setFilteredPaintings}
            mode={mode}
          />
          <LocationSelect
            setPaintings={setPaintings}
            setSpinner={setSpinner}
            setPageCount={setPageCount}
            setFilteredPaintings={setFilteredPaintings}
            mode={mode}
          />
          <CreatedSelect
            setPaintings={setPaintings}
            setSpinner={setSpinner}
            setPageCount={setPageCount}
            setFilteredPaintings={setFilteredPaintings}
            mode={mode}
          />
        </div>
        <div className="gallery-bottom">
          {spinner ? (
            <ClipLoader color={mode === 'dark' ? '#fff' : '#000'} />
          ) : currentPaintings.length ? (
            <ul className="gallery-bottom__list">
              {currentPaintings.map((item) => (
                <GalleryItem
                  key={item.id}
                  title={item.name}
                  created={item.created}
                  src={item.imageUrl}
                  authorId={item.authorId}
                  locationId={item.locationId}
                />
              ))}
            </ul>
          ) : (
            <span>Список картин пуст...</span>
          )}
        </div>
        <Pagination
          pagesAmount={Math.ceil(pageCount / 10)}
          onChange={handlePageClick}
          currentPage={currentPage}
          className={`gallery-pag-controls ${
            mode === 'dark' ? 'dark-mode' : ''
          }`}
          isDarkTheme={true}
        />
      </div>
    </section>
  )
}

Gallery.propTypes = {
  mode: PropTypes.string,
}
