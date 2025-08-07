import { useReducer } from 'react'
import { CartContext, reducer , initialState } from './store'
import './App.css'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = { state, dispatch }; 
  return (
    <>
       <CartContext.Provider  value={contextValue}>
          <h1>hi</h1>
       </CartContext.Provider>
    </>
  )
}

export default App
