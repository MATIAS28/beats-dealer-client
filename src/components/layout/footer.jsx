import toast, {Toaster} from 'react-hot-toast'

export const Footer = () => {

    const  copyEmail = () => {
        navigator.clipboard.readText('matiasmunoz.dev@gmail.com')
        toast.success('email copiado', {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
              zIndex: 50
            }
          })
    }

    return(
        <div className="bg-green-500 m-0 p-0">
            <Toaster/>
            <div id="container" className="h-20 w-full">
                <div className="flex items-center justify-center h-20 backdrop-blur-[2px]">
                    <img src="/logo.png" className="w-16 h-16" alt=""/>
                    <h1 className="text-4xl font-bold">Beats Dealer</h1>
                </div>
            </div>

            <div className="flex items-center justify-between p-1 mx-1">
                <h4 className="font-semibold mr-3">©2023-Matias Muñoz</h4>
                
                <div className='flex items-center'>
                    <a target="_blanck" href="https://www.linkedin.com/in/matias-mu%C3%B1oz-00a7581b6/" role="button" >
                        <img src="/linkedin-logo.png" className="w-5 h-5 mr-2 duration-100 cursor-pointer hover:scale-105"/>
                    </a>
                    
                    <a target="_blanck" href="https://portafolio-pearl-chi.vercel.app/" role="button">
                        <img src="/web-logo.png" className="w-5 h-5 mr-2 duration-100 cursor-pointer hover:scale-105"/>
                    </a>

                    <button  onClick={copyEmail}>
                    <img src="/gmail-logo.png" className="w-5 h-5 duration-100 cursor-pointer hover:scale-105"/>
                    </button>
                </div>
            </div>

            <style>
            {`
                #container{
                    background-image: url('logo.png');
                    background-size: 2rem 2rem;
                    background-repeat: repeat;
                    transform-origin: center;
                }
            `}
            </style>
        </div>
    )
}