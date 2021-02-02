const inputElement = document.querySelector("#inputValue");
const buttonElement = document.querySelector("#search");
const API_KEY = "4e1ae7b7696237121285525a25ba8e49";
const movieSearchable = document.querySelector("#movie-searchable");

const url =
  "https://api.themoviedb.org/3/search/movie?api_key=4e1ae7b7696237121285525a25ba8e49";

const imageURL = "https://image.tmdb.org/t/p/w500";

buttonElement.addEventListener("click", function (e) {
  e.preventDefault();
  const value = inputElement.value;
  const newURL = url + `&query=${value}`;
  movieRequest(newURL);
  inputElement.value = "";
});

async function movieRequest(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    //data is object with result array which has movie objects
    renderSearchMovie(data);
  } catch (err) {
    console.error(`Error, ${err}`);
  }
}

function renderSearchMovie(data) {
  movieSearchable.innerHTML = "";
  const movies = data.results;
  console.log(movies);
  const movieBlock = createMovieContainer(movies);
  movieSearchable.appendChild(movieBlock);
}

function createMovieContainer(movies) {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");

  const movieTemplate = `
    <section class="section">
        ${movieSection(movies)}
    </section>
    <div class="content">
        <p class="content-close">X</p>
    </div>
    `;

  movieElement.innerHTML = movieTemplate;
  return movieElement;
}

function movieSection(movies) {
  let movieSectionHTML = "";
  movies.map((movie) => {
    if (movie.poster_path)
      movieSectionHTML += `
          <img src='${imageURL + movie.poster_path}' data-movie-id='${
        movie.id
      }'/>
          `;
  });
  return movieSectionHTML;
}

// imageElement.addEventListener("click", function (e) {
//   console.log("img was clicked");
// });

//Event delegation
movieSearchable.addEventListener("click", function (e) {
  const target = e.target;
  console.log(target.dataset.movieId);
});
