function OpenSearch() {
    const search = document.querySelector('#search');
    search.classList.remove('hidden');
}

const search1 = document.querySelector('.itemiconasearch');
search1.addEventListener('click', OpenSearch);

function CloseSearch() {
    const search = document.querySelector('#search');
    search.classList.add('hidden');
}

const search2 = document.querySelector('.flex-itemsearchclose');
search2.addEventListener('click', CloseSearch);

function OpenLogin() {
    const login = document.querySelector('#login');
    login.style.top = window.pageYOffset + 'px';
    login.classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

const login1 = document.querySelector('.itemiconalogin');
login1.addEventListener('click', OpenLogin);

function CloseLogin() {
    const login = document.querySelector('#login');
    document.body.classList.remove('no-scroll');
    login.classList.add('hidden');
}

const login2 = document.querySelector('.flex-itemcloselogin');
login2.addEventListener('click', CloseLogin);

function RedSearch1(event) {
    const image = event.currentTarget;
    image.src = 'search(red).png';
}

const searchred1 = document.querySelector('.itemiconasearch img');
searchred1.addEventListener('mouseover', RedSearch1);

function RedSearch2(event) {
    const image = event.currentTarget;
    image.src = 'search.png';
}

const searchred2 = document.querySelector('.itemiconasearch img');
searchred2.addEventListener('mouseout', RedSearch2);

function RedLogin1(event) {
    const image = event.currentTarget;
    image.src = 'login(red).png';
}

const loginred1 = document.querySelector('.itemiconalogin img');
loginred1.addEventListener('mouseover', RedLogin1);

function RedLogin2(event) {
    const image = event.currentTarget;
    image.src = 'login.png';
}

const loginred2 = document.querySelector('.itemiconalogin img');
loginred2.addEventListener('mouseout', RedLogin2);

function favoriteonoff(event) {
    event.stopPropagation();
    const currentContainer = event.currentTarget;
    const currentIndex = currentContainer.dataset.index;
    console.log(currentIndex);

    const favoriteicon = currentContainer.querySelector(".favoritebutton");
    if (currentContainer.dataset.liked === "true") {
        currentContainer.dataset.liked = "false";
        favoriteicon.src = 'favorite(off).png';
        console.log("favorite: off");
    }
    else {
        currentContainer.dataset.liked = "true";
        favoriteicon.src = 'favorite(on).png';
        console.log("favorite: on");
    }
}

const container_list = document.querySelectorAll("#flex-containerarticolo");
for (let container of container_list) {
    container.addEventListener("click", favoriteonoff);
}

function onJson1(json) {
    console.log('JSON ricevuto');
    console.log(json);
    const collezione = document.querySelector('#games-view');
    collezione.innerHTML = '';
    const results = json.count;
    let num_results = results;
    console.log(num_results);
    if (num_results > 12)
        num_results = 12;
    for (let i = 0; i < num_results; i++) {
        const nome = json.results[i].name;
        const rilascio = 'Rilascio: ' + json.results[i].released;
        const metacritic = 'Voto su Metacritic: ' + json.results[i].metacritic;
        const selected_image = json.results[i].background_image;
        const videogioco = document.createElement('div');
        videogioco.classList.add('game');
        const img = document.createElement('img');
        img.src = selected_image;
        const descrizione1 = document.createElement('span');
        descrizione1.textContent = nome;
        const descrizione2 = document.createElement('span');
        descrizione2.textContent = rilascio;
        const descrizione3 = document.createElement('span');
        descrizione3.textContent = metacritic;
        videogioco.appendChild(img);
        videogioco.appendChild(descrizione1);
        videogioco.appendChild(descrizione2);
        videogioco.appendChild(descrizione3);
        collezione.appendChild(videogioco);
    }
}

function onResponse1(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function searchgames(event) {
    event.preventDefault();
    const piattaforma_input = document.querySelector('#piattaforma');
    const piattaforma_value = encodeURIComponent(piattaforma_input.value);
    console.log('Eseguo ricerca: ' + piattaforma_value);
    rest_url = 'https://api.rawg.io/api/games?key=secret&platforms_count=1&platforms=' + piattaforma_value;
    console.log('URL: ' + rest_url);
    fetch(rest_url).then(onResponse1).then(onJson1);
}

const form = document.querySelector('#gamesform');
form.addEventListener('submit', searchgames)

function onJson2(json) {
    console.log('JSON ricevuto');
    console.log(json);
    const watchlist = document.querySelector('#anime-view');
    watchlist.innerHTML = '';
    const results = json.data;
    let num_results = results.length;
    console.log(num_results);
    if (num_results > 12)
        num_results = 12;
    for (let i = 0; i < num_results; i++) {
        const nome = json.data[i].title;
        const metacritic = 'Anno di uscita: ' + json.data[i].year;
        const selected_image = json.data[i].images.jpg.image_url;
        const animeconsigliato = document.createElement('div');
        animeconsigliato.classList.add('anime');
        const img = document.createElement('img');
        img.src = selected_image;
        const descrizione1 = document.createElement('span');
        descrizione1.textContent = nome;
        const descrizione2 = document.createElement('span');
        descrizione2.textContent = metacritic;
        animeconsigliato.appendChild(img);
        animeconsigliato.appendChild(descrizione1);
        animeconsigliato.appendChild(descrizione2);
        watchlist.appendChild(animeconsigliato);
    }
}

function onResponse2(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function searchanime(event) {
    event.preventDefault();
    const genereanime_input = document.querySelector('#genere');
    const genereanime_value = encodeURIComponent(genereanime_input.value);
    console.log('Eseguo ricerca: ' + genereanime_value);
    rest_url = 'https://api.jikan.moe/v4/anime?genres=' + genereanime_value + '&type=tv&order_by=popularity';
    console.log('URL: ' + rest_url);
    fetch(rest_url).then(onResponse2).then(onJson2);
}

const form2 = document.querySelector('#animeform');
form2.addEventListener('submit', searchanime);