const apiKey = "8afebab025ac78dd611c1e9208407d76";

const cityInput = document.querySelector('#city');
const btn = document.querySelector('button');
const container = document.querySelector('.container');
const spinner = document.querySelectorAll('.sk-circle');

const pHumedad = document.querySelector('.humedad');
const pTemperatura = document.querySelector('.temperatura');
const pDescripcion = document.querySelector('.descripcion');

const pIcono = document.querySelector('.icon') ;

const pPresion = document.querySelector('.presion');
const pViento = document.querySelector('.viento');
const pCoord = document.querySelector('.coordenadas');



cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {

        let city = e.target.value;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=sp&units=metric`)
                .then(response => response.json())
                .then(data => {

                    spinner.forEach(spin =>{
                        spin.style.display = "flex";
                        pHumedad.style.display = "none";
                        pTemperatura.style.display = "none";
                        pDescripcion.style.display = "none";
                        pIcono.style.display = "none";
                        pPresion.style.display = "none";
                        pViento.style.display = "none";
                        pCoord.style.display = "none";
                    });

                    setInterval(()=>{
                        spinner.forEach(spin =>{
                            spin.style.display = "none";
                            pHumedad.style.display = "flex";
                            pTemperatura.style.display = "flex";
                            pDescripcion.style.display = "flex";
                            pIcono.style.display = "flex";
                            pPresion.style.display = "flex";
                            pViento.style.display = "flex";
                            pCoord.style.display = "flex";
                        });
                    }, 1400);
                    
                    // Asignación del data a unas variables
                    let humedad = data.main.humidity;

                    let temperatura = data.main.temp;
                    temperatura = temperatura.toFixed(1);

                    let temperaturaMax = data.main.temp_max;
                    temperaturaMax = temperaturaMax.toFixed(1);

                    let temperaturaMin = data.main.temp_min;
                    temperaturaMin = temperaturaMin.toFixed(1);

                    let descripcion = data.weather[0].description;
                    descripcion = capitalizarPalabras(descripcion);

                    let icono = data.weather[0].icon;

                    let presion = data.main.pressure;
                    let viento = data.wind.speed;
                    let latitud = data.coord.lat;
                    let longitud = data.coord.lon;


                    // Asignación de valores al DOM
                    pHumedad.textContent = `${humedad}%`;

                    if(temperaturaMax === temperaturaMin){
                        pTemperatura.textContent = `${temperatura}º`;
                    } else{
                        pTemperatura.textContent = `${temperaturaMin}º - ${temperaturaMax}º`;
                    }
                    
                    pDescripcion.textContent = `${descripcion}`;

                    pIcono.src = `https://openweathermap.org/img/wn/${icono}@2x.png`;

                    pPresion.textContent = `${presion} mbar`;
                    pViento.textContent = `${viento}km/h`;
                    pCoord.innerHTML =  `${latitud} lat <br> ${longitud} lon`;


                    // Funciones
                    function capitalizarPalabras(frase) {
                    let palabras = frase.split(" ");
                    
                    for (let i = 0; i < palabras.length; i++) {
                        palabras[i] = palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1);
                    }
                    
                    return palabras.join(" ");
                    }
                })
                .catch(error => {
                    alert('No hemos encontrado la ciudad introducida', error);
                });
    }
  });


btn.addEventListener('click', (e)=>{
    let city = e.target.previousElementSibling.value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=sp&units=metric`)
            .then(response => response.json())
            .then(data => {
                spinner.forEach(spin =>{
                    spin.style.display = "flex";
                    pHumedad.style.display = "none";
                    pTemperatura.style.display = "none";
                    pDescripcion.style.display = "none";
                    pIcono.style.display = "none";
                    pPresion.style.display = "none";
                    pViento.style.display = "none";
                    pCoord.style.display = "none";
                });

                setInterval(()=>{
                    spinner.forEach(spin =>{
                        spin.style.display = "none";
                        pHumedad.style.display = "flex";
                        pTemperatura.style.display = "flex";
                        pDescripcion.style.display = "flex";
                        pIcono.style.display = "flex";
                        pPresion.style.display = "flex";
                        pViento.style.display = "flex";
                        pCoord.style.display = "flex";
                    });
                }, 1400);
                
                // Asignación del data a unas variables
                let humedad = data.main.humidity;
                let temperaturaMax = data.main.temp_max;
                temperaturaMax = temperaturaMax.toFixed(1);

                let temperaturaMin = data.main.temp_min;
                temperaturaMin = temperaturaMin.toFixed(1);

                let descripcion = data.weather[0].description;
                descripcion = capitalizarPalabras(descripcion);

                let icono = data.weather[0].icon;

                let presion = data.main.pressure;
                let viento = data.wind.speed;
                let latitud = data.coord.lat;
                let longitud = data.coord.lon;


                // Asignación de valores al DOM
                pHumedad.textContent = `${humedad}%`;
                pTemperatura.textContent = `${temperaturaMin}º - ${temperaturaMax}º`;
                pDescripcion.textContent = `${descripcion}`;

                pIcono.src = `https://openweathermap.org/img/wn/${icono}@2x.png`;

                pPresion.textContent = `${presion} mbar`;
                pViento.textContent = `${viento}km/h`;
                pCoord.innerHTML =  `${latitud} lat <br> ${longitud} lon`;


                // Funciones
                function capitalizarPalabras(frase) {
                let palabras = frase.split(" ");
                
                for (let i = 0; i < palabras.length; i++) {
                    palabras[i] = palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1);
                }
                
                return palabras.join(" ");
                }
            })
            .catch(error => {
                alert('No hemos encontrado la ciudad introducida', error);
            });
});

