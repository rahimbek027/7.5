import React, { useEffect, useState } from 'react'
import { useAxios } from '../hooks/useAxios'
import { API_KEY } from '../hooks/useEnv'
import CustomCard from '../components/CustomCard'


function NowPlaying() {
  const [product, setProduct] = useState([])
  const [visibleItems, setVisibleItems] = useState(6) 

  useEffect(() => {
    useAxios().get(`/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`).then(res => {
      setProduct(res.data.results)
    })
  },[])

 
  const showMoreItems = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 3) 
  }

  return (
    <div className='p-10 bg-slate-400'>
      <ul className="grid grid-cols-3 gap-4 justify-items-center">
        {product.slice(0, visibleItems).map(item => (
          <li key={item.id}>
            <CustomCard item={item} />
          </li>
        ))}
      </ul>

      
      {visibleItems < product.length && (
        <div className="text-center mt-4">
         <button 
  onClick={showMoreItems} 
  className="px-4 py-2 bg-blue-500 text-white border border-blue-500 rounded hover:bg-white hover:text-blue-500 hover:border-blue-500 transition duration-300"
>
  Show More
</button>

        </div>
      )}
    </div>
  )
}

export default NowPlaying
