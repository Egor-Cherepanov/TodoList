import PropTypes from "prop-types"
import { useState } from "react"

export const FilterTodos = ({ onChange }) => {
  const [value, setValue] = useState('');

  return (
    <form>
      <input
        type="search"
        value={value}
        onChange={({ target }) => {
          const value = target.value;
          setValue(value);
          onChange(value);
        }}
        placeholder="Введите задачу..."
      />
    </form>
  )
}

FilterTodos.propTypes = {
  onChange: PropTypes.func.isRequired
}
