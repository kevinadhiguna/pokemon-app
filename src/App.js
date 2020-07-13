import React, {
  useState,
  useEffect
} from 'react';
import './App.css';
import axios from 'axios';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import { ClipLoader } from 'react-spinners';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [nextPageUrl, setNextPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios.get(currentPageUrl, {
        cancelToken: new axios.CancelToken(c => cancel = c)
      })
      .then(res => {
        setLoading(false);
        setPrevPageUrl(res.data.previous);
        setNextPageUrl(res.data.next);
        setPokemon(res.data.results.map(p => p.name));
      })

    return () => cancel();

  }, [currentPageUrl]);

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  if (loading) return (
    <div>
      <p>loading...</p>
      <ClipLoader />
    </div>
  );

  return ( 
    <div className = "App" >
      <PokemonList pokemon = {pokemon}
      /> 
      <Pagination 
        goToPrevPage = {prevPageUrl ? goToPrevPage : null}
        goToNextPage = {nextPageUrl ? goToNextPage : null}
      />
    </div>
  );
}

export default App;
