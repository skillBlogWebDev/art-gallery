import PropTypes from 'prop-types'
import { getPaintingsByName } from '../../../../api'
import { debounce, resetNavPage } from '../../../../utils'
import './styles.scss'

export const NameInput = ({
  setPaintings,
  setSpinner,
  setPageCount,
  setFilteredPaintings,
  mode,
}) => {
  const handleInputValueChange = debounce(async (e) => {
    if (!e.target.value.trim()) {
      resetNavPage(setSpinner, setPageCount, setPaintings, setFilteredPaintings)
      return
    }

    const paintings = await getPaintingsByName(setSpinner, e.target.value)

    if (!paintings.length) {
      setPaintings([])
    }

    setFilteredPaintings(paintings)
    setPageCount(paintings.length)
  }, 3000)

  return (
    <input
      className={`gallery-input ${mode === 'dark' ? 'dark-mode' : ''}`}
      type="text"
      placeholder="Name"
      onChange={handleInputValueChange}
    />
  )
}

NameInput.propTypes = {
  setPaintings: PropTypes.func,
  setSpinner: PropTypes.func,
  setPageCount: PropTypes.func,
  setFilteredPaintings: PropTypes.func,
  mode: PropTypes.string,
}
