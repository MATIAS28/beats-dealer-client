import AppRoutes from './app-routes'

import Navbar from './components/layout/navbar'
import BeatPlayer from './components/player/beatPlayer'
import Cart from './components/cart/cart'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { hiddenPlayer } from './redux/slices/beatPlayer'
import { Search } from './components/search/search'
import { Footer } from './components/layout/footer'

function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  const [expand, setExpand] = useState(false)
  const [search, setSearch] = useState()

  useEffect(() => {
      dispatch(hiddenPlayer())
      setExpand(false)
  }, [location])

  return (
    <>
      <Navbar setSearch={setSearch} setExpand={setExpand}/>
      
      <Cart setExpand={setExpand} expand={expand}/>

      <div className='min-h-screen relative top-16 z-10'>
      {!search ? 
        <AppRoutes/>
        :
        <Search search={search}/>  
      }
      </div>

      <div id='beatPlayer'>
      <BeatPlayer/>
      </div>

      <div className='relative z-20 top-12'>
      <Footer/>
      </div>
    </>
  )
}

export default App
