import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
// import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store"

import { HomePage } from "./home-page"
// import { Test } from "./test"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* <Test /> */}
      <HomePage />
    </Provider>
    {/* <BrowserRouter>
      <HomePage />
    </BrowserRouter> */}
  </StrictMode>
)
