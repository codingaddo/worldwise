import { createContext, useEffect, useContext, useReducer, useCallback} from "react";
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
      return {...state,
        isLoading:false, 
        cities:action.payload
      }

    case 'city/loaded':
      return {...state,
        isLoading:false, 
        currentCity:action.payload
      }

    case 'city/created' :
      return{...state,
        isLoading:false, 
        cities:[...state.cities, action.payload],
        currentCity:action.payload
      }
    
    case 'city/deleted':
      return{...state,
        isLoading:false, 
        cities:state.cities.filter(city => city.id!==action.payload),
        currentCity:{}
      }
    
    case 'rejected' :
      return{...state,error:action.payload}

    default: throw new Error('Unknown action')      
  }
}

function CityProvider ({children}){
   
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

        
       const getCity = useCallback(
            async function getCity(id){
              if(Number(id)===createCity.id) return 
              dispatch({type:'loading'})        
              try{
              const res = await fetch(`${BASE_URL}/cities/${id}`)
              const data = await res.json()
              dispatch({type:'loading'})
              dispatch({type:'city/loaded', payload:data})
            }
            catch{
              dispatch({type:'rejected', payload:'There was an error getting data'})
            }
           
          },[])


          async function createCity(newCity){
            dispatch({type:'loading'})        
            try{
            const res = await fetch(`${BASE_URL}/cities`, {
              // Creating a post request to an API
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newCity),
              
            })
            const data = await res.json()
            dispatch({type:'city/created',payload:data})
          }
          catch{
            dispatch({type:'rejected', payload:'There was an error creating citiy'})
          }
         
        }
        

        async function deleteCity(id){
          dispatch({type:'loading'})        
          try{
             await fetch(`${BASE_URL}/cities/${id}`, {
            // Creating a post request to an API
            method: "DELETE",
            
          })
          dispatch({type:'city/deleted',payload: id}) 
        }
        catch{
          dispatch({type:'rejected', payload:'There was an error deleting city'})
        }
       
      }
      
  

    

    return <CityContext.Provider 
        value={{
            isLoading,
            cities,
            currentCity,
            error,
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
