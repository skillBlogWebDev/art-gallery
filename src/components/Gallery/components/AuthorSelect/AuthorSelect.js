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

export const AuthorSelect = ({
  setPaintings,
  setSpinner,
  setPageCount,
  setFilteredPaintings,
  mode,
}) => {
  const [authorOption, setAuthorOption] = useState(null)
  const [authors, setAuthors] = useState([])
  const shouldLoadAuthors = useRef(true)

  useEffect(() => {
    if (shouldLoadAuthors.current) {
      shouldLoadAuthors.current = false
      loadAuthors()
    }
  }, [])

  const loadAuthors = async () => {
    const authors = await getAuthors()

    setAuthors(authors)
  }

  const handleAuthorOptionChange = async (selectedOption) => {
    setAuthorOption(selectedOption)

    if (!selectedOption) {
      const selects = Array.from(
        document.querySelectorAll('.css-1dimb5e-singleValue'),
      )

      if (selects[1].textContent !== 'Location') {
        const locations = await getLocations()

        setNavPageByLocations(locations, selects[1].textContent, {
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

    setNavPageByAuthors(authors, selectedOption.value, {
      setSpinner,
      setPageCount,
      setFilteredPaintings,
    })
  }

  return (
    <Select
      isSearchable={false}
      options={authors.map((item) => createSelectOption(item.name))}
      value={authorOption || createSelectOption('Author', mode)}
      styles={defaultStyles}
      onChange={handleAuthorOptionChange}
      isClearable={
        authorOption || createSelectOption('Author').value !== 'Author'
      }
      onMenuOpen={decreaseZIndexForCreatedSelect}
      onMenuClose={increaseZIndexForCreatedSelect}
    />
  )
}

AuthorSelect.propTypes = {
  setPaintings: PropTypes.func,
  setSpinner: PropTypes.func,
  setPageCount: PropTypes.func,
  setFilteredPaintings: PropTypes.func,
  mode: PropTypes.string,
}
