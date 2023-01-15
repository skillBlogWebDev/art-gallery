import api from './axiosClient'

export const getAuthorById = async (authorId) => {
  try {
    const { data } = await api.get('/authors')

    return data.find((item) => item.id === authorId).name
  } catch (error) {
    console.error(error)
  }
}

export const getLocationById = async (locationId) => {
  try {
    const { data } = await api.get('/locations')

    return data.find((item) => item.id === locationId).location
  } catch (error) {
    console.error(error)
  }
}

export const getPaintings = async (event = () => {}) => {
  try {
    event(true)
    const { data } = await api.get('/paintings')

    return data
  } catch (error) {
    console.error(error)
  } finally {
    event(false)
  }
}

export const getLocations = async () => {
  try {
    const { data } = await api.get('/locations')

    return data
  } catch (error) {
    console.error(error)
  }
}

export const getAuthors = async () => {
  try {
    const { data } = await api.get('/authors')

    return data
  } catch (error) {
    console.error(error)
  }
}

export const getPaintingsByAuthorId = async (event, authorId) => {
  try {
    event(true)
    const { data } = await api.get(`/paintings?authorId=${authorId}`)

    return data
  } catch (error) {
    console.error(error)
  } finally {
    event(false)
  }
}

export const getPaintingsByLocationId = async (event, locationId) => {
  try {
    event(true)
    const { data } = await api.get(`/paintings?locationId=${locationId}`)

    return data
  } catch (error) {
    console.error(error)
  } finally {
    event(false)
  }
}

export const getPaintingsByName = async (event, name) => {
  try {
    event(true)
    const { data } = await api.get(`/paintings?q=${name}`)

    return data
  } catch (error) {
    console.error(error)
  } finally {
    event(false)
  }
}

export const getPaintingsByPage = async (event, page) => {
  try {
    event(true)
    const { data } = await api.get(`/paintings?_page=${page}`)

    return data
  } catch (error) {
    console.error(error)
  } finally {
    event(false)
  }
}
