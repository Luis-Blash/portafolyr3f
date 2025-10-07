import './App.css'
import CanvasR3F from './components/CanvasR3F'
import { NavigationProvider } from './context/NavigationContext'

function App() {

  return (
    <>
      <NavigationProvider>
        <main className='w-dvw h-dvh'>
          <CanvasR3F />
        </main>
      </NavigationProvider>
    </>
  )
}

export default App
