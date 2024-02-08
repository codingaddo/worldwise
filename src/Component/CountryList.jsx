import React from 'react'
import styles from './CountryList.module.css'
import Spinner from './Spinner'
import CountryItem from './CountryItem'
import Message from './Message'

function CountryList ({cities,isLoading}) {
    if (isLoading) return <Spinner/>
    if (!cities.length) return <Message message={'Add your first city by clicking on a city on the map'}/>

    // Using the Array reduce  and includes methods to find the countries which includes the current cities
    const countries = cities.reduce((arr, city) => {
      if(!arr.map((el)=>el.country).includes(city.country))
        return [...arr, {country:city.country,emoji:city.emoji}];
       else return arr 
},[])

    
  return (
    <ul className={styles.countryList}>
        {countries.map(country=><CountryItem country={country} key={country.country}/>)}
    </ul>
  )
}

export default CountryList