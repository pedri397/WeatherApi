const api = {
    key: '6fa9bf538b033b05cb13df8cf57db921',
    url: `https://api.openweathermap.org/data/2.5/weather`
}


let form__search = document.querySelector("#form__search")
let btsearch = document.getElementById("btsearch")
let search__txt = document.getElementById("search__txt")
let grados__m = document.getElementById("grados__m")
let grados__min__m = document.getElementById("grados__min__m")
let grados__max__m = document.getElementById("grados__max__m")
let actual__img = document.getElementById("actual__img")
let estado__cielo = document.getElementById("estado__cielo")
let nombre = document.getElementById("nombre")
let est__cielo 
let latitud
let longitud
let grados
let grados__max
let grados__min
let percepcion__temp


if(navigator.geolocation){
    let success = function(position){
    latitud = position.coords.latitude
    longitud = position.coords.longitude;
        console.log(longitud)
        console.log(latitud)
        fetch(`${api.url}?lat=${latitud}&lon=${longitud}&appid=${api.key}&lang=es`)
        .then(response => response.json())
        .then(data => ubicacionActual(data))
        .catch(error => console.log(error))

        const ubicacionActual =(data)=> {
            // console.log(data)
            nombre.textContent = data.name

            data.weather.forEach(e => {
                // console.log(e.description)  
                  est__cielo = e.description
              })
              estado__cielo.textContent = est__cielo.toString().toUpperCase()

            grados = data.main.temp - 273,15 
            grados = grados.toString().slice(0,2)
            grados__m.textContent = grados + " cº"

            grados__max = data.main.temp_max - 273,15
            grados__max = grados__max.toString().slice(0,2)
            grados__max__m.textContent = grados__max + " cº"

            grados__min = data.main.temp_min - 273,15
            grados__min = grados__min.toString().slice(0,2)
            grados__min__m.textContent = grados__min + " cº"

            actual__img.src = '../img/animated/cloudy.svg'

        }

        ubicacionActual()
    }
    navigator.geolocation.getCurrentPosition(success, function(msg){
    console.error( msg )
    })
    }






const buscarConsulta =()=> {
    console.log(search__txt.value)

    fetch(`${api.url}?q=${search__txt.value}&appid=${api.key}&lang=es`)
    .then(response => response.json())
    .then(data => mostrarDatos(data))
    .catch(error => console.log(error))
}


const mostrarDatos =(data)=> {
    console.log(data) 

    data.weather.forEach(e => {
      console.log(e.description)  
        est__cielo = e.description
    })
    estado__cielo.textContent = est__cielo.toString().toUpperCase()
    
    console.log(data.main)
    grados = data.main.temp - 273,15 
    grados = grados.toString().slice(0,2)
    grados__m.textContent = grados + " cº"

    grados__max = data.main.temp_max - 273,15
    grados__max = grados__max.toString().slice(0,2)
    grados__max__m.textContent = grados__max + " cº"

    grados__min = data.main.temp_min - 273,15
    grados__min = grados__min.toString().slice(0,2)
    grados__min__m.textContent = grados__min + " cº"


    percepcion__temp = data.main.feels_like - 273,15
 
    console.log(grados__max + "Cº")  
    console.log(grados__min + "Cº")  
    console.log(percepcion__temp + "Cº")
  
}







btsearch.addEventListener("click", buscarConsulta)



