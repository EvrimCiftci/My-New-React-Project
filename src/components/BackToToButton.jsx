import react from 'react';
import { useEffect,useState } from 'react';
import { BsArrowUpCircleFill } from "react-icons/bs";

const BackToTopButton = () => {
  const [backToTopButton, setBackToTopButton] = useState(false)
  
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true)
      } else {
        setBackToTopButton(false)
      }
    });
  }, [])
  
  const scrollUp = () => {
     window.scrollTo({
       top: 0,
       behavior:'smooth'
     })
  }

  return (
    <div className='App'>

      {backToTopButton && (
        <button className='fixed	bottom-12 right-12 h-12 w-12 text-5xl	'
            onClick={scrollUp}>
          <BsArrowUpCircleFill className=' text-violet-800' />
         </button>
      )}
    </div>
  )
}

export default  BackToTopButton