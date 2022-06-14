const gameServices = () => {
    var form = document.getElementById("form")
var filtroG = document.getElementById("filtroG")
let gameData = JSON.parse(localStorage.getItem("features"));
let newGame = [];

function clearBox(elementID) { document.getElementById(elementID).innerHTML = ""; }

//Evento para filtrar
filtroG.addEventListener( "submit", function(event){
        let data = JSON.parse(localStorage.getItem("features"))

        event.preventDefault()
        //Borro mi vista de juegos
        let game = document.getElementById("games")
        //clearBox(game)

        //Genero a filtrar
        var generoF = document.getElementById("generoF")
        generoF = generoF.options[generoF.selectedIndex].text
        console.log("Soy newgame.genero" + data[1].genero)
        console.log("Soy generoF" + generoF)

        if(generoF === 'Sin filtro'){
                renderGame();
        } else{
                var newdata = data.filter( g => g.genero === generoF )
                console.log("Soy la vieja data"+data)
                console.log("Soy la nueva data"+newdata)
                localStorage.removeItem('filtroGenero');
                localStorage.setItem('filtroGenero', JSON.stringify(newdata))
                let dataN = JSON.parse(localStorage.getItem("filtroGenero"))
                renderGameF(dataN);
        }
})

//Renderizo juegos filtrados
function renderGameF(dataa){
        let data = dataa
        let game = document.getElementById("games")
        game.innerHTML = ''

        if(data){
                data.forEach( it =>{
                        let imgGame = document.createElement('img');
                        imgGame.className = "w-full h-full";
                        imgGame.src = it.urlImg;
                        imgGame.alt = "book picture";

                        let tituloGame = document.createElement('label');
                        tituloGame.className = "mx-3 font-semibold text-lg underline";
                        tituloGame.innerHTML = it.titulo;

                        let card = document.createElement('div');
                        card.className = "bg-white w-3/4 h-full rounded-lg flex flex-col items-center justify-center my-2 mx-2";
                        card.style = "background-color: #FEE440"
                        card.appendChild(imgGame);
                        card.appendChild(tituloGame);

                        game.appendChild(card);
                })
        }
}

//Renderizo los juegos
function renderGame(){
        let data = JSON.parse(localStorage.getItem("features"))
        let game = document.getElementById("games")
        game.innerHTML = ''

        if(data){
                data.forEach( it =>{
                        let imgGame = document.createElement('img');
                        imgGame.className = "w-full h-full rounded-t-lg";
                        imgGame.src = it.urlImg;
                        imgGame.alt = "book picture";

                        let tituloGame = document.createElement('label');
                        tituloGame.className = "mx-3 font-semibold sm:text-sm md:text-sm lg:text-sm xl:text-base underline";
                        tituloGame.innerHTML = it.titulo;      

                        let card = document.createElement('div');
                        card.className = "bg-white w-3/4 h-full rounded-lg flex flex-col items-center justify-center my-2 mx-2";
                        card.style = "background-color: #FEE440"
                        card.appendChild(imgGame);
                        card.appendChild(tituloGame);

                        game.appendChild(card);
                })
        }
}

//Evento para agregar un juego
//Consumiendo API
form.addEventListener("submit", function(event){
        event.preventDefault()
        let titulo = document.getElementById("title").value
        var post = null

        fetch(`https://rawg-video-games-database.p.rapidapi.com/games?key=bb82783b860242fabe290f20cfb58723&search=${titulo}/`, {
                "method": "GET",
                "headers": {
                        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
                        "x-rapidapi-key": "e6f04d311cmsh17b45e1bec7d6e5p1b79f3jsn1ed261ab2fba"
                }
        })
        .then(res => res.json())
        .then(data => {
                post = data
                guardarDatos(post) 
        })
        .catch(err => console.log(err))
})

//Guardando un juego en el objeto
function guardarDatos(post){
        let titulo = document.getElementById("title").value
     
        var urlImg = ''

        urlImg = post['results'][0]['background_image']

        if (gameData) {
                newGame = [...gameData, { titulo, urlImg}];    
        }
        else
        newGame.push({ titulo, urlImg });
                
        localStorage.setItem('features', JSON.stringify(newGame));

        renderGame();
}

window.onload = () => {
        renderGame();
}
}

export default gameServices;