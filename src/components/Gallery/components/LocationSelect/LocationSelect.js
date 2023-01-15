import Select from 'react-select'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { getAuthors, getLocations } from '../../../../api'
import {
  createSelectOption,
  decreaseZIndexForCreatedSelect,
  increaseZIndexForCreatedSelect,
  resetNavPage,
  setNavPageByAuthors,
  setNavPageByLocations,
} from '../../../../utils'
import { defaultStyles } from '../../selectStyles'

export const LocationSelect = ({
  setPaintings,
  setSpinner,
  setPageCount,
  setFilteredPaintings,
  mode,
}) => {
  const [locationOption, setLocationOption] = useState(null)
  const [locations, setLocations] = useState([])
  const shouldLoadLocations = useRef(true)

  useEffect(() => {
    if (shouldLoadLocations.current) {
      shouldLoadLocations.current = false
      loadLocations()
    }
  }, [])

  const loadLocations = async () => {
    const locations = await getLocations()

    setLocations(locations)
  }

  const handleLocationOptionChange = async (selectedOption) => {
    setLocationOption(selectedOption)

    if (!selectedOption) {
      const selects = Array.from(
        document.querySelectorAll('.css-1dimb5e-singleValue'),
      )

      if (selects[0].textContent !== 'Author') {
        const authors = await getAuthors()

        setNavPageByAuthors(authors, selects[0].textContent, {
          setSpinner,
          setPageCount,
          setFilteredPaintings,
        })
      } else {
        resetNavPage(
          setSpinner,
          setPageCount,
          setPaintings,
          setFilteredPaintings,
        )
      }
      return
    }

    setNavPageByLocations(locations, selectedOption.value, {
      setSpinner,
      setPageCount,
      setFilteredPaintings,
    })
  }

  return (
    <Select
      isSearchable={false}
      options={locations.map((item) => createSelectOption(item.location))}
      value={locationOption || createSelectOption('Location', mode)}
      styles={defaultStyles}
      onChange={handleLocationOptionChange}
      isClearable={
        locationOption || createSelectOption('Location').value !== 'Location'
      }
      onMenuOpen={decreaseZIndexForCreatedSelect}
      onMenuClose={increaseZIndexForCreatedSelect}
    />
  )
}

LocationSelect.propTypes = {
  setPaintings: PropTypes.func,
  setSpinner: PropTypes.func,
  setPageCount: PropTypes.func,
  setFilteredPaintings: PropTypes.func,
  mode: PropTypes.string,
}
