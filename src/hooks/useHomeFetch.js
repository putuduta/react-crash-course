// Custome hooks
import { useState, useEffect, useRef } from 'react';
// API
import apiSettings from '../API';

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};

export const useHomeFetch = () => {
       // Declare state
       const [state, setState] = useState(initialState);
       const [loading, setLoading] = useState(false);
       const [error, setError] = useState(false);
   
       // Fetch the movies
       const fetchMovies = async (page, searchTerm = '' ) => {
           try {
               setError(false);
               setLoading(true);
   
               const movies = await apiSettings.fetchMovies(searchTerm, page);
               console.log(movies);
   
               setState(prev => ({
                   ...movies, 
                   results:
                       page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
               }))
           } catch (error) {
               setError(true);
           }
   
           setLoading(false);
       };
   
       // Initial Render
       useEffect(() => {
           fetchMovies(1);
       }, []);
   
       // const state = useState();
       // [stateValue, setter for the state]

       return { state, loading, error };

   
}