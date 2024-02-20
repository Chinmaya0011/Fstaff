
import './App.css'
import Header from './Components/Header'
import AddStaff from './Components/AddStaff'
import Body from './Components/Body'
import { MyProvider } from './Context/MyContext'
function App() {

  return (
    <MyProvider>
    <Header/>
    <AddStaff/>
    <Body/>
    </MyProvider>
  )
}

export default App
