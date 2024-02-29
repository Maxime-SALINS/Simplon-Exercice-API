let form = document.querySelector('form');
let input = document.querySelector('#title');
let result = document.querySelector('.result');
let ApiKey = "5ae70743666449b1e8974bc0fcd234c2";
let search = "";
let genre = "";

const addDateFormat = date => date.split('-').reverse().join('/');

const addImg = el => {
  if(!el.backdrop_path && !el.poster_path) {
    return 'asset/img/defaultImg.jpg'
  } else if (el.backdrop_path) { 
    return `https://image.tmdb.org/t/p/original${el.backdrop_path}`
  } else {
    return `https://image.tmdb.org/t/p/original${el.poster_path}`
  }
};

form.addEventListener('submit', e => e.preventDefault());

input.addEventListener('input', e => {
    if (e.target.value.length > 2) {
        search = e.target.value;
    }
    fetchMovies();
})

const fetchMovies = async() => {
   await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&query=${search}&language=fr-FR`)
    .then(response => response.json())
    .then(data => addMovies(data))
    .catch(error => console.error(error));
}

const getStar = (value) => {
  let html = "";
  let nbr = 0;
  let valueRounded = (value / 2).toFixed(2)
  let valueArray = valueRounded.split('.')
  for (let i = 0; i < valueArray[0]; i++) {
    html += '<i class="bi bi-star-fill text-warning"></i>';
    nbr++;
  }
  if (nbr < 5) {
    if (valueArray[1] < 30) {
      html += '<i class="bi bi-star text-warning"></i>';
      nbr++;
    } else if (valueArray[1] > 75){
      html += '<i class="bi bi-star-fill text-warning"></i>';
      nbr++;
    } else  if (valueArray[1] < 75 && valueArray[1] > 30){
      html += '<i class="bi bi-star-half text-warning"></i>';
      nbr++;
    }
  }
  for (let i = 0; i <= 4-nbr; i++) {
    html += '<i class="bi bi-star text-warning"></i>';
  }
  return html;
};

const addMovies = data => {
  result.innerHTML = data.results.map(el =>
    // console.log(el))
    `
    <div class="card col-12 col-md-5 mt-3">
      <div class="card-body">
        <h5 class="card-title">${el.title}</h5>
        <p class="card-text h-25 overflow-auto" style="min-height: 72px;">${el.overview}</p>
        <p class="card-text"><small class="text-body-secondary">${addDateFormat(el.release_date)}</small></p>
        <div>${getStar(el.vote_average)}${el.vote_average.toFixed(2)}/10</div>
        <div class="col-12 d-flex justify-content-around mt-3">
           <div class="btn btn-primary"><i class="bi bi-envelope-paper-heart"></i> ${el.vote_count} votants</div>
           <div class="btn btn-primary"><i class="bi bi-flag"></i>  ${el.original_language}</div>
        </div>
      </div>
      <div class="justify-content-center overflow-hidden mb-3 rounded" style="max-height: 220px; object-fit: contain;">
        <img class="w-100" src="${addImg(el)}" alt="image du film ${el.title}"></img>
      </div>
    </div>`
  ).join('')
}

fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${ApiKey}&language=fr`)
.then(response => response.json())
.then(data => genre = data.genres);

console.log(genre);