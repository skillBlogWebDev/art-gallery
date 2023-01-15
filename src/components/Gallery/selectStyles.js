const iconStyles = (base, state) => {
  const mode =
    JSON.parse(localStorage.getItem('mode')) || state.getValue()[0].mode

  return {
    ...base,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
    width: '10px',
    height: '6px',
    backgroundImage: `url(img/option-arrow${
      mode === 'dark' ? '-dark' : ''
    }.svg)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  }
}

const controlStyles = (base, state, cursor = 'pointer') => {
  const mode =
    JSON.parse(localStorage.getItem('mode')) || state.getValue()[0].mode

  return {
    ...base,
    cursor,
    backgroundColor: 'transparent',
    border: state.selectProps.menuIsOpen
      ? `1px solid ${mode === 'dark' ? '#ffffff' : '#000000'}`
      : '1px solid rgba(0, 0, 0, 0.3)',
    borderColor:
      mode === 'dark'
        ? '#fff !important'
        : state.selectProps.menuIsOpen
        ? '#000'
        : 'rgba(0, 0, 0, 0.3) !important',
    borderBottomRightRadius: state.selectProps.menuIsOpen ? '0' : '8px',
    borderBottomLeftRadius: state.selectProps.menuIsOpen ? '0' : '8px',
    paddingLeft: '5px',
    paddingRight: '16px',
    fontSize: '13px',
    '& .css-1dimb5e-singleValue': {
      color: mode === 'dark' ? '#fff' : '#000',
    },
    borderRadius: '8px',
    height: '45px',
    '&:hover': {
      borderColor: 'none',
    },
    boxShadow: 'none',
  }
}

const menuStyles = (base, state) => {
  const mode =
    JSON.parse(localStorage.getItem('mode')) || state.getValue()[0].mode

  return {
    ...base,
    boxShadow: 'none',
    borderRadius: '0',
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '8px',
    height: 'auto',
    overflow: 'hidden',
    border: `1px solid ${mode === 'dark' ? '#fff' : '#000'}`,
    borderTop: '1px solid rgba(0, 0, 0, 0.3)',
    marginTop: '-2px',
  }
}

const optionStyles = (base, state) => {
  const mode =
    JSON.parse(localStorage.getItem('mode')) || state.getValue()[0].mode
  const backgroundHoverForLightMode = state.isSelected
    ? state.isSelected
      ? '#000'
      : '#fff'
    : state.isSelected
    ? '#fff'
    : '#000'
  const colorHoverForLightMode = state.isSelected
    ? state.isSelected
      ? '#fff'
      : '#000'
    : state.isSelected
    ? '#000'
    : '#fff'
  const backgroundHoverForDarkMode = state.isSelected
    ? state.isSelected
      ? '#fff'
      : '#000'
    : state.isSelected
    ? '#000'
    : '#fff'
  const colorHoverForDarkMode = state.isSelected
    ? state.isSelected
      ? '#000'
      : '#fff'
    : state.isSelected
    ? '#fff'
    : '#000'

  return {
    ...base,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor:
        mode === 'dark'
          ? backgroundHoverForDarkMode
          : backgroundHoverForLightMode,
      color: mode === 'dark' ? colorHoverForDarkMode : colorHoverForLightMode,
    },
    backgroundColor:
      mode === 'dark'
        ? state.isSelected
          ? '#fff'
          : '#000'
        : state.isSelected
        ? '#000'
        : '#fff',
    color:
      mode === 'dark'
        ? state.isSelected
          ? '#000'
          : '#fff'
        : state.isSelected
        ? '#fff'
        : '#000',
    fontWeight: '500',
    fontSize: '16px',
    padding: '6px 12px',
    margin: 0,
  }
}

const menuListStyles = (base, state) => {
  const mode =
    JSON.parse(localStorage.getItem('mode')) || state.getValue()[0].mode

  return {
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: mode === 'dark' ? '#000' : '#fff',
    '::-webkit-scrollbar': {
      width: '9px',
      height: '0px',
    },
    '::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '10px',
    },
  }
}

export const defaultStyles = {
  control: (base, state) => ({
    ...controlStyles(base, state),
    color: 'red',
  }),
  indicatorSeparator: () => ({
    border: 'none',
  }),
  dropdownIndicator: (base, state) => ({
    ...iconStyles(base, state),
  }),
  option: (base, state) => ({
    ...optionStyles(base, state),
  }),
  menu: (base, state) => ({
    ...menuStyles(base, state),
  }),
  menuList: (base, state) => ({
    ...menuListStyles(base, state),
  }),
}
