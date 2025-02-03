import { useState } from "react"
import { AlfabetSortTodos } from "./AlfabetSortTodos/AlfabetSortTodos"
import { FilterTodos } from "./FilterTodos/FilterTodos"

export const FilterAndSort = () => {
  const [isFiltered, setIsFiltered] = useState(false)

  return (
    <>
      {isFiltered ? (
        <FilterTodos />
      ) : (
        <AlfabetSortTodos setIsFiltered={setIsFiltered} />
      )}
    </>
  )
}
