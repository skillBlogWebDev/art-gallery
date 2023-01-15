import PropTypes from 'prop-types'
import { useState } from 'react'
import { resetNavPage } from '../../../../utils'
import { CreatedSelectOption } from './components/CreatedSelectOption/CreatedSelectOption'
import './styles.scss'

export const CreatedSelect = ({
  setPaintings,
  setSpinner,
  setPageCount,
  setFilteredPaintings,
  mode,
}) => {
  const [selectOpen, setSelectOpen] = useState(false)

  const toggleSelect = async () => {
    setSelectOpen(!selectOpen)
    resetNavPage(() => {}, setPageCount, setPaintings, setFilteredPaintings)
  }

  return (
    <div className="gallery-created-select">
      <div
        className={`gallery-created-select__inner ${selectOpen ? 'open' : ''} ${
          mode === 'dark' ? 'dark-mode' : ''
        }`}
        onClick={toggleSelect}
      >
        <span className="gallery-created-select__text">Created</span>
        <span
          className={`gallery-created-select__arrow ${
            selectOpen ? 'open' : ''
          } ${mode === 'dark' ? 'dark-mode' : ''}`}
        >
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.36609e-08 1.09203 0L8.90797 6.7345e-07C9.87892 7.57111e-07 10.3652 1.15702 9.67861 1.8337Z" />
          </svg>
        </span>
      </div>
      {selectOpen && (
        <CreatedSelectOption
          selectOpen={selectOpen}
          setPaintings={setPaintings}
          setSpinner={setSpinner}
          setPageCount={setPageCount}
          setFilteredPaintings={setFilteredPaintings}
          mode={mode}
        />
      )}
    </div>
  )
}

CreatedSelect.propTypes = {
  setPaintings: PropTypes.func,
  setSpinner: PropTypes.func,
  setPageCount: PropTypes.func,
  setFilteredPaintings: PropTypes.func,
  mode: PropTypes.string,
}
