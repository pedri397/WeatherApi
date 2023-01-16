/**Aqui la url de la api cambia para que me devuelva valores distintos a los que me devolvia antes */

const api = {
    key: '6fa9bf538b033b05cb13df8cf57db921',
    url: `https://api.openweathermap.org/data/2.5/forecast`
}

let semanal = document.getElementById("semanal")
let btsearchsemana = document.getElementById("btsearchsemana")

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

let fragment = document.createDocumentFragment()


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


 

    const mostrarDatos =(data)=> {
        console.log(data) 
        
        let fragment = document.createDocumentFragment()
        

        let arrayDias = data.list
        console.log(arrayDias)

        for (let i = 0; i < arrayDias.length; i++) {
            // console.log(i)
            let spanGrados
            let spanGradosMin
            let spanGradosMax

            let divSemaCaja = document.createElement("DIV")
            divSemaCaja.classList.add('actual__caja', 'semanal__caja')

            let h1Tit = document.createElement('H1')
            h1Tit.classList.add('actual__tit')
            h1Tit.classList.add('semana__tit')
            h1Tit.textContent = data.city.name

            let h2Fech = document.createElement('H2')
            h2Fech.classList.add('semana__tit')

            let divSemaImg = document.createElement('DIV')
            divSemaImg.classList.add('actual__img')

            let imgSema = document.createElement('IMG')
            imgSema.classList.add('actual__img--img')           
     

            let spanGra = document.createElement('SPAN')
            spanGra.classList.add('actual__temp')
            spanGra.classList.add('semana__temp')

            let spanEst = document.createElement('SPAN')
            spanEst.classList.add('actual__txt')

            let divGrad = document.createElement('DIV')
            divGrad.classList.add('actual__txt', 'actual__txt--mt')

            let spanGrM = document.createElement('SPAN')

            let imgTemAz = document.createElement('IMG')
            imgTemAz.src = '../img/termometroazul.png'
            imgTemAz.classList.add('termometro')

            let spanBarr = document.createElement('SPAN')
            spanBarr.textContent = " | "

            let spanGrMax = document.createElement('SPAN')

            let imgTemRj = document.createElement('IMG')
            imgTemRj.src = '../img/termometrorojo.png'
            imgTemRj.classList.add('termometro')
            

            // console.log(arrayDias[i])
            let dia = arrayDias[i]

            // console.log(dia.weather.main)
            dia.weather.forEach(tim => {
                spanEst.textContent = tim.description.toUpperCase()
                // console.log(spanEst.textContent)
                let estado = spanEst.textContent
                if(estado === "LLUVIA LIGERA"){
                    // console.log("entra")
                    imgSema.src = '../img/animated/rainy-4.svg'
                }else if(estado === "MUY NUBOSO" || estado === "NUBES" || estado === "ALGO DE NUBES"){
                    imgSema.src = '../img/animated/cloudy.svg'
                }else if(estado === "CIELO CLARO"){
                    imgSema.src = '../img/animated/day.svg'
                }else if(estado === "NUBES DISPERSAS"){
                    imgSema.src = '../img/animated/cloudy-day-2.svg'
                }else if(estado === "NEVADA LIGERA"){
                    imgSema.src = '../img/animated/snowy-3.svg'
                }
            })
         
                
            h2Fech.textContent = dia.dt_txt
            spanGrados = dia.main.temp - 273,15
            spanGra.textContent = spanGrados.toString().slice(0,2) + " º"

            spanGradosMin = dia.main.temp_min - 273,15
            spanGrM.textContent = spanGradosMin.toString().slice(0,2) + " º"

            spanGradosMax = dia.main.temp_max - 273,15
            spanGrMax.textContent = spanGradosMax.toString().slice(0,2) + " º"

            divSemaImg.appendChild(imgSema)
            divSemaImg.appendChild(spanGra)

            divGrad.appendChild(spanGrM)
            divGrad.appendChild(imgTemAz)
            divGrad.appendChild(spanBarr)
            divGrad.appendChild(spanGrMax)
            divGrad.appendChild(imgTemRj)
            
            divSemaCaja.appendChild(h1Tit)
            divSemaCaja.appendChild(h2Fech)  
            divSemaCaja.appendChild(divSemaImg)  
            divSemaCaja.appendChild(spanEst)
            divSemaCaja.appendChild(divGrad)

            fragment.appendChild(divSemaCaja)
        }

        semanal.appendChild(fragment)
      
    }

/** Intento de borrar las tarjetas y poner unas nuevas con el buscador, pero no me deja borrar el fragment,
 * solo me añade mas tarjetas.
 */

    const buscarConsulta =()=> {
        console.log(semanal.children)

        semanal.innerHTML = ""
    
        fetch(`${api.url}?q=${search__txt.value}&appid=${api.key}&lang=es`)
        .then(response => response.json())
        .then(data => mostrarDatos(data))
        .catch(error => console.log(error))
    }

   


    btsearchsemana.addEventListener("click", buscarConsulta)