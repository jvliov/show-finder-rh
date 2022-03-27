import axios from "axios"
import { showKeys } from './config'
import { getGenreMap, updateGenreMap } from './firebase'

let showList = undefined

export let genre_ids = {
    28: "Action",
    10759: "Action & Adventure",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    36: "History",
    27: "Horror",
    10762: "Kids",
    10402: "Music",
    9648: "Mystery",
    10763: "News",
    10764: "Reality",
    10749: "Romance",
    10765: "Sci-Fi & Fantasy",
    878: "Science Fiction",
    10766: "Soap",
    10767: "Talk",
    53: "Thriller",
    10752: "War",
    10768: "War & Politics",
    37: "Western"
}

export let reverse_genre_ids = {
    "Action": 28,
    "Action & Adventure": 10759,
    "Adventure": 12,
    "Animation": 16,
    "Comedy": 35,
    "Crime": 80,
    "Documentary": 99,
    "Drama": 18,
    "Family": 10751,
    "History": 36,
    "Horror": 27,
    "Kids": 10762,
    "Music": 10402,
    "Mystery": 9648,
    "News": 10763,
    "Reality": 10764,
    "Romance": 10749,
    "Sci-Fi & Fantasy": 10765,
    "Science Fiction": 878,
    "Soap": 10766,
    "Talk": 10767,
    "Thriller": 53,
    "TV Movie": 10770,
    "War": 10752,
    "War & Politics": 10768,
    "Western": 37
}


export async function getList(updateList = true) {
    let resp = await axios.get(`https://api.watchmode.com/v1/list-titles/?apiKey=${showKeys.watchmode}&source_ids=203,57&limit=20`)
    showList = resp.data
    return showList
}

export async function getShow(tmdb_id, type) {
    let resp = await axios.get(`https://api.themoviedb.org/3/${type}/${tmdb_id}?api_key=${showKeys.tmdb}`)
    return resp.data
}

export async function getServices(wm_id) {
    let services = []

    let resp = await axios.get(`https://api.watchmode.com/v1/title/${wm_id}/sources/?apiKey=${showKeys.watchmode}`)
    for (let i = 0; i < resp.data.length; i++) {
        if (!services.includes(resp.data[i].name)) services.push(resp.data[i].name)
    }

    return services
}

export async function decGenre(user, genre_num) {
    let genre_map = await getGenreMap(user)
    if (genre_num in genre_map) {
        genre_map[genre_num]--
    } else {
        genre_map[genre_num] = -1
    }

    console.log(genre_map)

    await updateGenreMap(user, genre_map)
}

export async function incGenre(user, genre_num) {
    let genre_map = await getGenreMap(user)

    console.log(genre_map)

    if (genre_num in genre_map) {
        genre_map[genre_num]++
    } else {
        genre_map[genre_num] = 1
    }

    await updateGenreMap(user, genre_map)
}