const kelvin = 273.15;

const boton = document.getElementById("ciudad");
$('#spinner').hide()
const obtenerClima = () => {
  let ciudad = document.querySelector("#ciudad").value;

  if (ciudad.trim() == "") {
    mostrarError("#msj-error", "FALTA LLENAR CAMPOS");
    return;
  }
  consultarAPI(ciudad);    
};

const consultarAPI = async (ciudad) => {
  // !!!! NO ESTA EL APIKEY POR PRIVACIDAD!!! SI QUIERE PROBAR LA APP INGRESE A openweatermap y genere su apikey-----
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&appid=${apikey}`;

  const respuesta = await fetch(url);
  const resultado = await respuesta.json();
  console.log(resultado);
  
  if (resultado.cod == "404") {
    mostrarError("#msj-error", "NO HAY RESULTADOS");
    return;
  }
  const { name, main, sys, weather } = resultado;
  
  if (!name) {
    return null;
  }
  let divResultado = document.querySelector("#divResultado");

  const { icon } = weather[0];
  $('#spinner').show()
  setTimeout(() => {
    $('#spinner').hide()
    divResultado.innerHTML = `
        <div class="card text-white bg-dark">
            <img src="icons/${icon}.png" class="card-img-top" alt="...">
            <div class="card-body">
                <h2 class="text-center">El tiempo de ${name}, ${sys.country} es: </h2>
                <p class="temperatura__actual fs-1 text-center">
                Temp Actual: ${parseFloat(main.temp - kelvin, 10).toFixed(2)}
                <span> &#x2103;</span>
                </p>
                <p class="descripcion fs-1 text-center">
                Descripción: <br>${weather[0].description}
                </p>
                <p class="temperatura fs-4 text-center">
                Temp Máxima: ${parseFloat(main.temp_max - kelvin, 10).toFixed(
                  2
                )}<span> &#x2103;</span>
                </p>
                <p class="temperatura fs-4 text-center">
                Temp mínima: ${parseFloat(main.temp_min - kelvin, 10).toFixed(
                  2
                )}<span> &#x2103;</span>
                </p>
                <p class="temperatura fs-4 text-center">
                Humedad: ${parseFloat(main.humidity, 10).toFixed(
                  2
                )}<span>%</span>
                </p>
            </div>
        </div>
    `;
  }, 1500);
    
  
  
};

const mostrarError = (elemento, mensaje) => {
  divError = document.querySelector(elemento);
  divError.innerHTML = `<p class="alert alert-danger danger "> ${mensaje} </p>`;
  setTimeout(() => {
    divError.innerHTML = ``;
  }, 2000);
};
boton.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    document.getElementById("boton").click();
  }
});


