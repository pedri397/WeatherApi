const api = {
    key: '6fa9bf538b033b05cb13df8cf57db921',
    url: `https://api.openweathermap.org/data/2.5/weather`
}

/** Todos los id */
let form__search = document.querySelector("#form__search")
let btsearch = document.getElementById("btsearch")
let search__txt = document.getElementById("search__txt")
let grados__m = document.getElementById("grados__m")
let grados__min__m = document.getElementById("grados__min__m")
let grados__max__m = document.getElementById("grados__max__m")
let actual__img = document.getElementById("actual__img")
let estado__cielo = document.getElementById("estado__cielo")
let nombre = document.getElementById("nombre")
let sensacion = document.getElementById("sensacion")
let nubosidad = document.getElementById("nubosidad")
let humedad = document.getElementById("humedad")
let amanecer = document.getElementById("amanecer")
let atardecer = document.getElementById("atardecer")
let viento = document.getElementById("viento")

/** Variables utilizadas */
let arrayFechas
let est__cielo 
let latitud
let longitud
let grados
let grados__max
let grados__min
let percepcion__temp
let actual__h = new Date()

hora = actual__h.getHours()
console.log(hora)



/** Si aceptas que la pagina utilice tu localizacion te genera automaticamente atraves de tu longitud y latitud el tiempo */
if(navigator.geolocation){
    let success = function(position){
    latitud = position.coords.latitude
    longitud = position.coords.longitude;
        console.log(longitud)
        console.log(latitud)
        fetch(`${api.url}?lat=${latitud}&lon=${longitud}&appid=${api.key}&lang=es`)
        .then(response => response.json())
        .then(data => mostrarDatos(data))
        .catch(error => console.log(error))
    }
    navigator.geolocation.getCurrentPosition(success, function(msg){
    console.error( msg )
    })
    }


    
/** Funcion para hacer las consulta con el nombre de una ciudad  */
const buscarConsulta =()=> {
    console.log(search__txt.value)

    fetch(`${api.url}?q=${search__txt.value}&appid=${api.key}&lang=es`)
    .then(response => response.json())
    .then(data => mostrarDatos(data))
    .catch(error => console.log(error))
}





/** Funcion para mostrar todos los datos  */

const mostrarDatos =(data)=> {
    console.log(data) 
    nombre.textContent = data.name
  
    console.log(arrayFechas)
    data.weather.forEach(e => {
      console.log(e.description)  
        est__cielo = e.description
    })
    estado__cielo.textContent = est__cielo.toString().toUpperCase()
    
    cambiarImagenTiem(est__cielo)

    console.log(data.main)
    grados = data.main.temp - 273,15 
    grados = grados.toString().slice(0,2)
    grados__m.textContent = grados + " º"

    grados__max = data.main.temp_max - 273,15
    grados__max = grados__max.toString().slice(0,2)
    grados__max__m.textContent = grados__max + " º"

    grados__min = data.main.temp_min - 273,15
    grados__min = grados__min.toString().slice(0,2)
    grados__min__m.textContent = grados__min + " º"


    percepcion__temp = data.main.feels_like - 273,15
    percepcion__temp = percepcion__temp.toString().slice(0,2)
    sensacion.textContent = percepcion__temp + " º"

    nubosidad.textContent = data.clouds.all + " %"
    humedad.textContent = data.main.humidity + " %"

    amanecer.textContent = convertirUnixHora(data.sys.sunrise)
    atardecer.textContent = convertirUnixHora(data.sys.sunset)

    direccionViento(data.wind.deg)


 
    console.log(grados__max + "Cº")  
    console.log(grados__min + "Cº")  
    console.log(percepcion__temp + "Cº")
  
}

/** Funcion para cambiar la imagen segun el estado en el que estemos */

const cambiarImagenTiem =(estado__cielo)=> {

    if(estado__cielo === "nubes"){
        actual__img.src = '../img/animated/cloudy.svg'
    }else if(estado__cielo === "cielo claro"){
        if(hora < 19 ){
            actual__img.src = '../img/animated/day.svg'
        }else if(hora > 19){
            actual__img.src = '../img/animated/night.svg'
        }
    }else if(estado__cielo === "muy nuboso" || est__cielo === "nubes"){
        actual__img.src = '../img/animated/cloudy.svg'
    }else if(estado__cielo === "lluvia moderada"){
        actual__img.src = '../img/animated/rainy-5.svg'
    }else if(estado__cielo === "nubes dispersas" || estado__cielo === "algo de nubes"){
        actual__img.src = '../img/animated/cloudy-day-3.svg'
    }else if(estado__cielo === "lluvia ligera"){
        actual__img.src = '../img/animated/rainy-3.svg'
    }
}

/** Funcion para combiar las horas en formato unix */

const convertirUnixHora =(unix)=> {
    let fecha = new Date(unix * 1000)
    let hora = fecha.getHours()
    let minuto = fecha.getMinutes() 
    return `${hora}:${minuto}`
}

/** Funcion para saber hacia que direcion va el viento segun grados Norte, Sur, Este y Oeste */

const direccionViento =(gradosViento)=> {
    // console.log(gradosViento)

    if(gradosViento < 30){
        viento.textContent = gradosViento + " N"
    }else if(gradosViento > 30 && gradosViento < 90){
        viento.textContent = gradosViento + " NE"
    }else if(gradosViento > 90 && gradosViento < 120){
        viento.textContent = gradosViento + " E"
    }else if(gradosViento > 120 && gradosViento < 150){
        viento.textContent = gradosViento + " SE"
    }else if(gradosViento > 150 && gradosViento < 180){
        viento.textContent = gradosViento + " SE"
    }else if(gradosViento > 180 && gradosViento < 210){
        viento.textContent = gradosViento + " S"
    }else if(gradosViento > 210 && gradosViento < 250){
        viento.textContent = gradosViento + " SO"
    }else if(gradosViento > 250 && gradosViento < 290){
        viento.textContent = gradosViento + " O"
    }else if(gradosViento > 290 && gradosViento < 330){
        viento.textContent = gradosViento + " NO"
    }else if(gradosViento > 330 && gradosViento < 360){
        viento.textContent = gradosViento + " N"
    }
}





btsearch.addEventListener("click", buscarConsulta)



