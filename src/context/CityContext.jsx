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


          async function createCity(newCity){
            try{
              setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`, {
              // Creating a post request to an API
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newCity),
              
            })
            const data = await res.json()
            setCities((cities)=>[...cities,data])
          }
          catch{
            alert('There was an error creating city...')
          }
          finally{
            setIsLoading(false)
          }
        }
        

        async function deleteCity(id){
          try{
            setIsLoading(true);
             await fetch(`${BASE_URL}/cities/${id}`, {
            // Creating a post request to an API
            method: "DELETE",
            
          })
          setCities((cities)=> cities.filter(city => city.id!==id))
        }
        catch{
          alert('There was an error deleting city...')
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
            createCity,
            deleteCity
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
