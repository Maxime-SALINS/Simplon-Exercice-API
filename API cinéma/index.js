let form = document.querySelector('form');
let input = document.querySelector('#title');
let result = document.querySelector('.result');
let ApiKey = "5ae70743666449b1e8974bc0fcd234c2";
let search = "";


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

const addMovies = data => {
    result.innerHTML = data.results.map(el => 
      // console.log(el))
      `
      <div class="card col-5 mt-3">
        <div class="card-body">
          <h5 class="card-title">${el.title}</h5>
          <p class="card-text">${el.overview}</p>
          <p class="card-text"><small class="text-body-secondary">${el.release_date.split('-').reverse().join('/')}</small></p>
        </div>
        <img src="${
          (!el.backdrop_path && !el.poster_path)
          ?
          'asset/img/defaultImg.jpg'
          :
            el.backdrop_path
            ?
            'https://image.tmdb.org/t/p/original' + el.backdrop_path
            :
            'https://image.tmdb.org/t/p/original' + el.poster_path
        }
        " alt="image du film ${el.title}"></img>
      </div>`
    ).join('')
  }