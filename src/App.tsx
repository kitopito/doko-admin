import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
  }, []);

  return (
    <>
      <div>
      </div>
      <Link to={"config"} state={1}>
        <Button>1</Button>
      </Link>
      <Link to={"config"} state={2}>
        <Button>2</Button>
      </Link>
      <Link to={"config"} state={3}>
        <Button>3</Button>
      </Link>
    </>
  )
}

export default App
