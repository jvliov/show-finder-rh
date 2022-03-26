import axios from "axios"
import { showKeys } from './config'

let showList = undefined

let genre_ids = {
    10759: "Action & Adventure",
    28: "action"
}


export function getList(updateList = false) {
    if (!showList || updateList) {
        //create with axios with actual pull data
        showList = []
    }
    return showList
}

export function getShow(id) {
    //axios id
    // let resp = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${showKeys.tmdb}`)

    //return resp.data
    return { "adult": false, "backdrop_path": "/nDP33LmQwNsnPv29GQazz59HjJI.jpg", "genre_ids": [28, 12, 14], "id": 447404, "original_language": "en", "original_title": "Pokémon Detective Pikachu", "overview": "In a world where people collect pocket-size monsters (Pokémon) to do battle, a boy comes across an intelligent monster who seeks to be a detective.", "popularity": 123.376, "poster_path": "/wgQ7APnFpf1TuviKHXeEe3KnsTV.jpg", "release_date": "2019-05-03", "title": "Pokémon Detective Pikachu", "video": false, "vote_average": 7, "vote_count": 5505 }
}