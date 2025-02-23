import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { thunk } from "redux-thunk"
import { todosReducer } from "./reducers/todos-reducer"

const reducer = combineReducers({
  todosState: todosReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)
