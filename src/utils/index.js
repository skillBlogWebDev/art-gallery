import {
  getPaintings,
  getPaintingsByAuthorId,
  getPaintingsByLocationId,
  getPaintingsByPage,
} from '../api'

export const createSelectOption = (value, mode = 'light') => ({
  value,
  label: value,
  mode,
})

export const debounce = (func, wait) => {
  let timeout

  return (...args) => {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const getPaintingsGraterThan = (value, array) =>
  array.filter((item) => +item.created >= +value)

export const getPaintingsLessThan = (value, array) =>
  array.filter((item) => +item.created <= +value)

export const getPaintingsInRange = (from, before, array) =>
  array.filter((item) => +item.created >= +from && +item.created <= before)

export const isValidInputValue = (e, event) => {
  const regexpNumber = /^\d+$/
  const regexpNumberLength = /^.{5,}$/

  if (!regexpNumber.test(e.target.value)) {
    if (e.target.value) {
      return false
    }

    event('')
    return false
  }

  if (regexpNumberLength.test(e.target.value)) {
    return false
  }

  event(e.target.value)
  return true
}

export const resetNavPage = async (
  setSpinner,
  setPageCount,
  setPaintings,
  setFilteredPaintings,
) => {
  const paintingsByPage = await getPaintingsByPage(setSpinner, 1)
  const allPaintings = await getPaintings(setSpinner)

  setPageCount(allPaintings.length)
  setPaintings(paintingsByPage)
  setFilteredPaintings([])
}

export const setNavPageByAuthors = async (array, value, events) => {
  const currentAuthor = array.find((item) => item.name === value)
  const paintingsOfCurrentAuthor = await getPaintingsByAuthorId(
    events.setSpinner,
    currentAuthor.id,
  )

  events.setFilteredPaintings(paintingsOfCurrentAuthor)
  events.setPageCount(paintingsOfCurrentAuthor.length)
}

export const setNavPageByLocations = async (array, value, events) => {
  const currentLocation = array.find((item) => item.location === value)
  const paintingsOfCurrentLocations = await getPaintingsByLocationId(
    events.setSpinner,
    currentLocation.id,
  )

  events.setFilteredPaintings(paintingsOfCurrentLocations)
  events.setPageCount(paintingsOfCurrentLocations.length)
}

export const decreaseZIndexForCreatedSelect = () =>
  (document.querySelector('.gallery-created-select__inner').style.zIndex = '-1')

export const increaseZIndexForCreatedSelect = () =>
  (document.querySelector('.gallery-created-select__inner').style.zIndex = '11')
