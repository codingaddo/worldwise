import { createContext, useEffect, useState, useContext} from "react";
const BASE_URL = 'http://localhost:9000'


const CityContext = createContext()

function CityProvider ({children}){

    const [cities,setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
  const [currentCity,setCurrentCity] = useState({})

  
    useEffect(()=>{
      async function fetchCities(){
        try{
          setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      }
      catch{
        alert('There was an error fetching data...')
      }
      finally{
        setIsLoading(false)
      }
    }
  
      fetchCities()
  
    },[])

        
        async function getCity(id){
              try{
                setIsLoading(true);
              const res = await fetch(`${BASE_URL}/cities/${id}`)
              const data = await res.json()
              setCurrentCity(data)
            }
            catch{
              alert('There was an error fetching data...')
            }
            finally{
              setIsLoading(false)
            }
          }
        
    

    return <CityContext.Provider 
        value={{
            isLoading,
            setIsLoading,
            cities,
            setCities,
            currentCity,
            getCity,
        }}
    >
        {children}
    </CityContext.Provider>
}

const useCity =()=>{
    const context = useContext(CityContext)
    if(context === undefined) throw new Error('CityContext was used outside the CityProvider')

    return context
}

export {CityProvider,useCity}
