import PropTypes from 'prop-types'
import { useState, useRef } from 'react'
import { getPaintings } from '../../../../../../api'
import {
  getPaintingsGraterThan,
  getPaintingsInRange,
  getPaintingsLessThan,
  resetNavPage,
  isValidInputValue,
} from '../../../../../../utils'
import './styles.scss'

export const CreatedSelectOption = ({
  selectOpen,
  setPaintings,
  setSpinner,
  setPageCount,
  setFilteredPaintings,
  mode,
}) => {
  const [fromValue, setFromValue] = useState('')
  const [beforeValue, setBeforeValue] = useState('')
  const fromInputRef = useRef()
  const beforeInputRef = useRef()

  const handleFromInputValueChange = async (e) => {
    if (!e.target.value && !beforeInputRef.current.value) {
      resetNavPage(setSpinner, setPageCount, setPaintings, setFilteredPaintings)
      setFromValue('')
      return
    }

    if (!isValidInputValue(e, setFromValue)) {
      return
    }

    const paintings = await getPaintings(setSpinner)

    if (e.target.value && !beforeInputRef.current.value) {
      const createdFrom = getPaintingsGraterThan(e.target.value, paintings)

      if (!createdFrom.length) {
        setPaintings([])
      }

      setFilteredPaintings(createdFrom)
      setPageCount(createdFrom.length)
      return
    }

    if (!e.target.value && beforeInputRef.current.value) {
      const createdBefore = getPaintingsLessThan(
        beforeInputRef.current.value,
        paintings,
      )

      if (!createdBefore.length) {
        setPaintings([])
      }

      setFilteredPaintings(createdBefore)
      setPageCount(createdBefore.length)
      return
    }

    const createdInRange = getPaintingsInRange(
      fromInputRef.current.value,
      beforeInputRef.current.value,
      paintings,
    )
    setFilteredPaintings(createdInRange)
    setPageCount(createdInRange.length)
  }

  const handleBeforeInputValueChange = async (e) => {
    if (!e.target.value && !fromInputRef.current.value) {
      resetNavPage(setSpinner, setPageCount, setPaintings, setFilteredPaintings)
      setBeforeValue('')
      return
    }

    if (!isValidInputValue(e, setBeforeValue)) {
      return
    }

    const paintings = await getPaintings(setSpinner)

    if (e.target.value && !fromInputRef.current.value) {
      const createdBefore = getPaintingsLessThan(e.target.value, paintings)

      if (!createdBefore.length) {
        setPaintings([])
      }

      setFilteredPaintings(createdBefore)
      setPageCount(createdBefore.length)
      return
    }

    if (!e.target.value && fromInputRef.current.value) {
      const createdFrom = getPaintingsGraterThan(
        fromInputRef.current.value,
        paintings,
      )

      if (!createdFrom.length) {
        setPaintings([])
      }

      setFilteredPaintings(createdFrom)
      setPageCount(createdFrom.length)
      return
    }

    const createdInRange = getPaintingsInRange(
      fromInputRef.current.value,
      beforeInputRef.current.value,
      paintings,
    )
    setFilteredPaintings(createdInRange)
    setPageCount(createdInRange.length)
  }

  return (
    <div
      className={`created-select-option ${selectOpen ? 'open' : ''} ${
        mode === 'dark' ? 'dark-mode' : ''
      }`}
    >
      <input
        onChange={handleFromInputValueChange}
        value={fromValue}
        className="created-select-option__input created-select-option__input--from"
        placeholder="from"
        type="text"
        ref={fromInputRef}
      />
      <span className="created-select-option__border created-select-option__before" />
      <input
        onChange={handleBeforeInputValueChange}
        value={beforeValue}
        className="created-select-option__input"
        placeholder="before"
        type="text"
        ref={beforeInputRef}
      />
    </div>
  )
}

CreatedSelectOption.propTypes = {
  selectOpen: PropTypes.bool,
  setPaintings: PropTypes.func,
  setSpinner: PropTypes.func,
  setPageCount: PropTypes.func,
  setFilteredPaintings: PropTypes.func,
  mode: PropTypes.string,
}
