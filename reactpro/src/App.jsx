
import { useState,useEffect} from "react"
import { Search } from "./component/search"
import { Spinner } from "./component/Spinner";
import {MovieCard} from './component/MovieCard'


const API_BASE_URL='https://api.themoviedb.org/3'
const API_KEY=import.meta.env.VITE_TMDB_API_KEY;
 const API_OPTIONS={
  method:'GET',
  headers:{
    accept:'application/json',
    Authorization:`Bearer ${API_KEY}`
  }
 }
const App = () => {
const[searchTerm, setSearchTerm]= useState(' ')
const [errorMessages,setErrorMessage]=useState('')
const[movieList,setMovieList]=useState([])
const[isloading,setIsLoading]=useState(false)

const fetchMovies = async()=>{
  setIsLoading(true);
  setErrorMessage('')
  try{
    const endpoint=`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

    const response=await fetch(endpoint,API_OPTIONS)
    alert()

  if(!response){
     throw new Error('failed to fetch movies');
  }

  const data =await response.json();
  if(data.Response==='false'){
    setErrorMessage(data.Error||'Failed to fetch movies')
    setMovieList ([])
    return;
  }
  
   setMovieList(data.results|| []);

    

  }catch(error){
    console.log(`Error Fetching Movies:${error}`)
    setErrorMessage('error fetching movie.please try again.')

  }
  finally{
  setIsLoading(false); 
}
} 



useEffect(() => {
  fetchMovies();
}, []);

  
  return (
    <main>
      <div className="pattern">
        
        <div className="wrapper">
          <header>
           
            <img src="/hero-img.png"  alt="Hero Banner" />
            <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy without
               the Hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          <h1 className="text-gradient">{searchTerm}</h1        >
          </header>
          
  
        </div>
        <section className="all-moves">
          <h2 className="mt-40px">All Movies</h2>
          

          {isloading ?(
          <Spinner/>

          ):errorMessages?(
            <p className="text-red-500">{errorMessages}</p>
          ):(
            <ul className="good">
              {movieList.map((movie)=>(
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
 
      </div>
    </main>
  ) 
}

export default App 