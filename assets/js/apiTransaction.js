//Initial values
const API_KEY = "4e1ae7b7696237121285525a25ba8e49";
const url =
  "https://api.themoviedb.org/3/search/movie?api_key=4e1ae7b7696237121285525a25ba8e49";
const imageURL = "https://image.tmdb.org/t/p/w500";

function generateURL(path) {
  const url = `https://api.themoviedb.org/3${path}?api_key=4e1ae7b7696237121285525a25ba8e49`;
  return url;
}

async function movieRequest(url, onComplete, onError) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    //data is object with result array which has movie objects
    // renderSearchMovie(data);
    onComplete(data);
  } catch (err) {
    // console.error(`Error, ${err}`);
    onError(err);
  }
}

async function videoRequest(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    //data is object with result array which has movie objects
    const videos = data.results;
    return videos;
  } catch (err) {
    console.error(`Error, ${err}`);
  }
}

function searchMovie(value) {
  const path = "/search/movie";
  const newURL = generateURL(path) + "&query=" + value;
  movieRequest(newURL, renderSearchMovie, handleError);
}

function getUpcomingMovies() {
  const path = "/movie/upcoming";
  const newURL = generateURL(path);
  const render = renderMovies.bind({ title: "Upcoming Movies" });
  movieRequest(newURL, render, handleError);
}

function getTopRatedMovies() {
  const path = "/movie/top_rated";
  const newURL = generateURL(path);
  const render = renderMovies.bind({ title: "Top Rated Movies" });
  movieRequest(newURL, render, handleError);
}

function getPopularMovies() {
  const path = "/movie/popular";
  const newURL = generateURL(path);
  const render = renderMovies.bind({ title: "Popular Movies" });
  movieRequest(newURL, render, handleError);
}
