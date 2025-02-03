import React from "react";

const SortButton = ({ isSorted, onClick }) => {
  const handleOnClick = () => {
    onClick?.();
  }

  return (
    <button onClick={handleOnClick}>
      {isSorted
        ? "Изначальная сортировка"
        : "Отсортировать задачи по алфавиту"}
    </button>
  )
}

export default SortButton;