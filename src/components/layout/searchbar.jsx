import { Link, useParams } from 'react-router-dom'
import { MagnifyingGlassIcon, UserIcon, ShoppingCartIcon, HomeIcon, HeartIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'

export const SearchBar = ({cart, setSearch, setExpand}) => {
	const params = useParams()
	return(
		<div className="absolute w-full flex top-0 justify-between secondary items-center p-3 z-30 h-20">

		  <div className="flex items-center space-x-4 md:space-x-0 w-4/5">
		  	<div className="flex md:hidden justify-center items-center h-20">
                <Link className='flex justify-center drop-shadow-lg primary rounded' to='/'>
                <img src="/logo.png" className="w-10 md:w-14 h-8 md:h-12" alt="" />
                </Link>
          	</div>

	          <div className='flex items-center px-3 py-2 quaternary rounded-3xl w-full md:w-3/5'>
	              <MagnifyingGlassIcon className='white w-5 h-5 mr-2'/>
	              <input  onChange={(e) => setSearch(e.target.value)} className="focus:outline-none quaternary text-sm w-full text-gray-500 font-light" type="text" placeholder="Search..."/>
	          </div>
		  </div>

          <div className="flex items-center space-x-4 px-2">

        	<Link className={`flex items-center block md:hidden
            ${params == 'favorites' ? 'bg-gray-200' : ''}`} to='/user/favorites'>
             <UserIcon className='white w-6 h-6'/>
          </Link>

          <button onClick={() => setExpand(prev => !prev)} className={ cart.length > 0 ?
          'duration-150 tertiary coursor-pointer hover:shadow-lg flex items-center white px-2 py-1 rounded-3xl'
          :
          'duration-150 flex items-center coursor-pointer white px-2 rounded-3xl'}>
                    
            {cart.length > 0 && 
            <span className='text-lg px-1 cartNumber'> {cart.length} </span>
            }
            
            
            <ShoppingCartIcon className='w-7 h-7'/>
                    

          </button>
          </div>

        </div>
	)
}