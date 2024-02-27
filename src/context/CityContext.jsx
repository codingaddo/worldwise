import { createContext, useEffect, useState, useContext, useReducer} from "react";
const BASE_URL = 'http://localhost:9000'


const CityContext = createContext()

const initialState ={
  cities : [],
  isLoading:false,
  currentCity: {},
  error : ''
}

function reducerFunc(state,action){
  switch(action.type){
    case 'loading':
        return{...state,isLoading:true}

    case 'cities/loaded':
      return {...state,isLoading:false, cities:action.payload}

    case 'cities/created' :
      return{}
    
    case 'cities/deleted':
      return{}
    
    case 'rejected' :
      return{...state,error:action.payload}

    default: throw new Error('Unknown action')      
  }
}

function CityProvider ({children}){
    // const [cities,setCities] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [currentCity,setCurrentCity] = useState({})

    const [state,dispatch] = useReducer(reducerFunc,initialState)
    const {cities,isLoading,currentCity,error} = state



  
    useEffect(()=>{
      async function fetchCities(){
        dispatch({type:'loading'})
        try{
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({type :'cities/loaded', payload:data})
      }
      catch{
        dispatch({type:'rejected',payload:'There was an error fetching data...'})
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
