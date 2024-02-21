import React, { useEffect, useState } from 'react'
import styles from './Map.module.css'
import { MapContainer,TileLayer,Marker,Popup, useMap, useMapEvent } from 'react-leaflet'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCity } from '../context/CityContext'
import { latLng } from 'leaflet'

const Map = () => {
  const {cities}= useCity()
  const [mapPosition,setMapPosition] = useState([40, 0])
  const [searchParams] = useSearchParams()
  const mapLat = searchParams.get('lat')
  const mapLng = searchParams.get('lng')

  useEffect(()=>{
    if(mapLat && mapLng) setMapPosition([mapLat,mapLng])
  },[mapLat,mapLng])

  return (
    <div className={styles.mapContainer}>
        <MapContainer 
        className={styles.map}
         center={mapPosition} 
         zoom={6}
          scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {
      cities.map((city)=>(

        <Marker 
        position={[city.position.lat, city.position.lng]}
        key={city.id}
        >
        <Popup>
          <span>{city.emji}</span> <span>{city.cityName}</span>
        </Popup>
      </Marker>
      ))
    }
   <ChangeCenter position={mapPosition}/>
   <DetectClick/>
  </MapContainer>
    </div>
  )
}

function ChangeCenter({position}){
  const map = useMap()
  map.setView(position)
  return null;

}

function DetectClick(){
  const navigate = useNavigate()

  useMapEvent({
    click: (e) =>{
      console.log(e)
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    },
  }
  )


}

export default Map