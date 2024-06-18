import AppRoutes from './app-routes'

import Navbar from './components/layout/navbar'
import BeatPlayer from './components/player/beatPlayer'
import Cart from './components/cart/cart'
import { SearchBar } from './components/layout/searchbar'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { hiddenPlayer } from './redux/slices/beatPlayer'
import { Search } from './components/search/search'
import { Footer } from './components/layout/footer'

import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux'


function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  const {cart} = useSelector((state) => state.cart)
  const [expand, setExpand] = useState(false)
  const [search, setSearch] = useState()

  useEffect(() => {
      dispatch(hiddenPlayer())
      setExpand(false)
  }, [location])

  return (
    <div className="flex relative">
      <Navbar setSearch={setSearch} setExpand={setExpand}/>
      
      <Cart setExpand={setExpand} expand={expand}/>

      <div className="relative w-full">

        <SearchBar cart={cart} setSearch={setSearch} setExpand={setExpand}/>

        <div className='relative overflow-y-auto h-screen w-full secondary p-4 py-24'>
        {!search ? 
          <AppRoutes/>
          :
          <Search search={search}/>  
        }
        </div>

        <div id='beatPlayer'>
        <BeatPlayer/>
        </div>

      </div>
    </div>
  )
}

export default App
