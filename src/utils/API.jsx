import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const KEY = '3dadf6538a102d5389e489b53cee1e6c';

const trendingToday = async () => {
    const result = await axios.get(`/trending/movie/day?api_key=${KEY}`)
    return await result.data
}

const searchMovie = async (query) => {
    const result = await axios.get(`/search/movie?api_key=${KEY}&query=${query}`)
    return await result.data
}

const detailedMovie = async (id) => {
    const result = await axios.get(`/movie/${id}?api_key=${KEY}`)
    return await result.data
}

const cast = async (id) => {
    const result = await axios.get(`/movie/${id}/credits?api_key=${KEY}`)
    return await result.data
}

const rewiev = async (id) => {
    const result = await axios.get(`/movie/${id}/reviews?api_key=${KEY}`)
    return await result.data
}

const movieAPI = {
    trendingToday,
    searchMovie,
    detailedMovie,
    cast,
    rewiev
}

export default movieAPI