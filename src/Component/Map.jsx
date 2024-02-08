import React from 'react'
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Map = () => {
  const navigate = useNavigate()
  const [searchParams,setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  return (
    <div className={styles.mapContainer} onClick={()=>{navigate('form')}}>
        Position : {lat}, {lng}
        <button onClick={()=>setSearchParams({lat:20,lng:50})}>Change</button>
    </div>
  )
}

export default Map