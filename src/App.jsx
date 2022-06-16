import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Main from './components/Main'
import Pages from './Pages/Pages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Pages/>
  )
}

export default App
