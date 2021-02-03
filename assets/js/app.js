const inputElement = document.querySelector("#inputValue");
const buttonElement = document.querySelector("#search");
const movieSearchable = document.querySelector("#movie-searchable");
const moviesContainer = document.querySelector("#moviesContainer");

buttonElement.addEventListener("click", function (e) {
  e.preventDefault();
  const value = inputElement.value;

  searchMovie(value);
  inputElement.value = "";
});

function handleError(err) {
  console.error("Error: ", err);
}

function renderSearchMovie(data) {
  movieSearchable.innerHTML = "";
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  movieSearchable.appendChild(movieBlock);
}

function renderMovies(data) {
  const movies = data.results;
  const movieBlock = createMovieContainer(movies, this.title);
  moviesContainer.appendChild(movieBlock);
}

function createMovieContainer(movies, title = "") {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");

  const movieTemplate = `
    <h2>${title}</h2>
    <section class="section">
        ${movieSection(movies)}
    </section>
    <div class="content">
        <p id="content-close">X</p>
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
document.addEventListener("click", function (e) {
  const target = e.target;

  if (target.tagName.toLowerCase() === "img") {
    const movieId = target.dataset.movieId;
    const section = target.parentElement;
    const content = section.nextElementSibling;
    content.innerHTML = `<p id="content-close">X</p>`;
    content.classList.add("content-display");

    addIframe(movieId, content);
  }
  if (target.id === "content-close") {
    const content = target.parentElement;
    content.classList.remove("content-display");
  }
});

function createIframe(video) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  iframe.width = 600;
  iframe.height = 315;
  iframe.allowFullscreen = true;

  return iframe;
}

async function addIframe(movieId, content) {
  path = `/movie/${movieId}/videos`;
  const url = generateURL(path);
  //fetch movie videos
  let videos = await videoRequest(url);
  const length = videos.length > 2 ? 2 : videos.length;
  let iframeContainer = document.createElement("div");

  for (let i = 0; i < length; i++) {
    let video = videos[i];
    let iframe = createIframe(video);
    iframeContainer.appendChild(iframe);
    content.appendChild(iframeContainer);
  }
}

async function init() {
  getUpcomingMovies();
  getTopRatedMovies();
  getPopularMovies();
}

init();
