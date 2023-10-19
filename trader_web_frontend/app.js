let auth = {
  username: "neyen",
  password: "jet_blanca"
};
 
async function obtenerInformacion() {
  try {
    let response = await fetch('http://localhost:5000/get', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${btoa(`${auth.username}:${auth.password}`)}`
      }
    });

    if (!response.ok) {
      throw new Error('No se pudo completar la solicitud');
    }

    let listaDatos = await response.json();
    let tablaDeDatos = tablaDinamica(listaDatos);
    btnModificar(tablaDeDatos)

    
  } catch (error) {
    console.error('Ocurrió un error al obtener la información:', error);
  }
}


async function insertarDatos(datos) {
  try {
    let respuesta = await fetch('http://localhost:5000/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${auth.username}:${auth.password}`)}`
      },
      body: JSON.stringify(datos)
    });

    if (!respuesta.ok) {
      throw new Error('Error en la solicitud ' + respuesta.statusText);
    }

    let data = await respuesta.json();
    console.log('Registro creado: ', data);
  } catch (error) {
    console.error('Algo salió mal al crear el registro: ', error);
  }
}

function tablaDinamica(listaDatos) {
  let contenedorDivTabla = document.getElementById('contenedorDivTabla');
  let elementoTabla = document.createElement('table');
  elementoTabla.className = 'tablaDeDatos';
  elementoTabla.id = 'tablaDeDatos';

  // Crear el encabezado de la tabla
  let crearEncabezadoElemento = document.createElement('tr');
  let encabezado = {
    encabezadoPuntoEntrada: 'Entrada(PE)',
    encabezadoSalidaPerdida: 'SalidaPerdida(SL)',
    encabezadoSalidaGanancia: 'SalidaGanancia(TP)',
    encabezadoRiesgoBeneficio: 'RiesgoBeneficio(RB)',
    encabezadoLotage: 'Cantidad(Lotage)',
    encabezadoFecha: 'Fecha Actual',
    entrada_es_compra: 'Compra o venta',
    encabezadoResultado: 'Resultado',
    encabezadoNumeroEntrada: 'Numero Entrada(id)',
    encabezadoBtnAgregarFila: ''
  };

  for (let titulo in encabezado) {
    let encabezadoCelda = document.createElement('th');

    if (titulo === "encabezadoBtnAgregarFila") {
      let botonCrearFila = document.createElement('button');
      botonCrearFila.id = 'btnAgregarFila';
      botonCrearFila.className = 'btnAgregarFila';
      botonCrearFila.textContent = '+';
      encabezadoCelda.appendChild(botonCrearFila);

      botonCrearFila.addEventListener('click', function () {
        console.log('funciona');
        crearFilaIngresarInformacion(elementoTabla);
      });
    } else {
      encabezadoCelda.textContent = encabezado[titulo];
    }
    crearEncabezadoElemento.appendChild(encabezadoCelda);
  }
  elementoTabla.appendChild(crearEncabezadoElemento);

  for (let datos of listaDatos) {
    AgregarInformacionATablaDeBaseDeDatos(elementoTabla, datos);
  }

  contenedorDivTabla.appendChild(elementoTabla);
  return elementoTabla

}

function AgregarInformacionATablaDeBaseDeDatos(elementoTabla, datos) {
  let fila = elementoTabla.insertRow();
  let camposExcluidos = {
    celdaPuntoEntrada: "punto_entrada",
    celdaSalidaPerdida: "stop_loss",
    celdaSalidaGanacia: "take_profit",
    celdaRiesgoBeneficio: "riesgo_beneficio",
    celdaLotage: "cantidad_lotaje",
    celdaFecha: "fecha_creacion",
    celdaEntrada_es_compra: 'entrada_es_compra',
    celdaResultado: "entrada_ganada",
    celdaNumeroEntrada: "id_entrada",
    celdaBtn: ""
  };

  let nombreId = 1;
  for (let titulo in camposExcluidos) {
    let celda = fila.insertCell();
    celda.textContent = datos[camposExcluidos[titulo]];
    celda.id = 'CeldaCorrespondiente' + nombreId;
    nombreId++

    if (titulo === 'celdaBtn') {
      botonGuardar(celda);
    }
    
  }
}

function crearFilaIngresarInformacion(elementoTabla) {
  let fila = elementoTabla.insertRow();
  fila.id = 'filaID';
  let camposExcluidos = {
    celdaPuntoEntrada: "",
    celdaSalidaPerdida: "",
    celdaSalidaGanacia: "",
    celdaRiesgoBeneficio: "",
    celdaLotage: "",
    celdaFecha: "",
    celdaEntrada_es_compra: '',
    celdaResultado: "",
    celdaNumeroEntrada: "",
    celdaBtn: ""
  };
  let nombreId = 1;

  for (let titulo in camposExcluidos) {
    let celda = fila.insertCell();
    celda.id = 'celdasID';

    if (titulo == 'celdaNumeroEntrada') {
      celda.textContent = '';
    } else if (titulo == 'celdaFecha') {
      celda.textContent = '';
    } else if (titulo == 'celdaBtn') {
      botonGuardar(celda);
    }else if (titulo === 'celdaEntrada_es_compra') {
    
      let select = document.createElement('select');
      select.id = 'select'; 
     

      let option1 = document.createElement('option');
      option1.value = true;
      option1.text = 'compra';
      
      let option2 = document.createElement('option');
      option2.value = false;
      option2.text = 'venta';
    
      select.appendChild(option1);
      select.appendChild(option2);
    

      celda.appendChild(select);
    }else if(titulo == 'celdaResultado'){
      
      let select = document.createElement('select');
      select.id = 'select1'; // 
    
      
      let option1 = document.createElement('option');
      option1.value = true;
      option1.text = 'Ganada';
    
      let option2 = document.createElement('option');
      option2.value = false;
      option2.text = 'Perdida';
    
      select.appendChild(option1);
      select.appendChild(option2);
    
      celda.appendChild(select);
    }
     else {
      let input = document.createElement('input');
      celda.appendChild(input);
      input.id = 'entradaInput' + nombreId;
      nombreId++;
    }
  }
}

function botonGuardar(celda) {
  btnGuardar = document.createElement('button');
  btnGuardar.id = 'btnGuardar';
  btnGuardar.className = 'btnGuardar';
  celda.appendChild(btnGuardar);
  
  btnGuardar.addEventListener('click', function () {    
  let selectElement1 = document.getElementById('select');
  let selectedValue1 = Boolean(selectElement1.value);
  console.log(selectedValue1)

  let selectElement2 = document.getElementById('select1');
  let selectedValue2 = Boolean(selectElement2.value);
  console.log(selectedValue2)
  
  let datos = {
    punto_entrada: parseFloat(document.getElementById('entradaInput1').value),
    stop_loss: parseFloat(document.getElementById('entradaInput2').value),
    take_profit: parseFloat(document.getElementById('entradaInput3').value),
    riesgo_beneficio: parseFloat(document.getElementById('entradaInput4').value),
    cantidad_lotaje: parseFloat(document.getElementById('entradaInput5').value),
    cantidad_inicial_usdt: 1000,
    entrada_es_compra: selectedValue1,
    entrada_ganada: selectedValue2, 
    nota_personal: "nota de prueba",
    plan_trading_detalle: "detalle de prueba",
    trading_objetivo: "Objetivo de trading"
  }
    console.log(datos)
    
    insertarDatos(datos)
  });

}
function modificarDatosEntradas(idEntrada, datosModificados) {
  fetch(`http://localhost:5000/update/${idEntrada}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${auth.username}:${auth.password}`)}`
    },
    body: JSON.stringify(datosModificados)
  })
    .then(respuesta => respuesta.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error', error));
}

const datosModificados = {
  "punto_entrada": 88888
};

function neyen(){
  modificarDatosEntradas(valorCelda, datosModificados);
}


let inputActivo = false; // Variable para rastrear si el input está activo
let valorOriginal = null; // Variable para rastrear el valor original de la celda
let celdaActiva = null; // Variable para rastrear la celda activa en edición

function btnModificar(elemetoTablaInfo) {
  elemetoTablaInfo.addEventListener('click', function(event) {
    let filaClickeada = event.target.closest('tr');
    let celdaClickeada = event.target.closest('td');
    let celdaCorrespondiente = filaClickeada.querySelector('#CeldaCorrespondiente9');
    let valorID = celdaCorrespondiente.textContent;
    console.log(valorID +  'este')


    if (filaClickeada && celdaClickeada) {
        if (!inputActivo) { // Verifica si el input no está activo
          inputActivo = true; // Marca el input como activo
          celdaActiva = celdaClickeada; // Marca la celda actual como activa
          valorOriginal = celdaClickeada.textContent; // Guarda el valor original
          console.log('Valor original de la celda: ' + valorOriginal);

          // Crea el input y establece su valor
          let inputModificar = document.createElement('input');
          inputModificar.value = valorOriginal;
          celdaClickeada.innerHTML = ''; // Borra el contenido actual de la celda
          celdaClickeada.appendChild(inputModificar);

          // Agrega un manejador de eventos al input para detectar cambios o cancelaciones
          inputModificar.addEventListener('dblclick', function() {
            // Cuando el input pierde el enfoque (blur), se considera como finalización
            guardarCambios();
          });
        }
      
    }
  });

  function guardarCambios() {
    if (celdaActiva) {
      let inputModificar = celdaActiva.querySelector('input');
      if (inputModificar) {
        let valorCelda = inputModificar.value;
        celdaActiva.removeChild(inputModificar);
        celdaActiva.textContent = valorCelda;
        inputActivo = false; // Marca el input como no activo
        valorOriginal = null;
        celdaActiva = null;
      }
    }
  }
}


function Perro(nombre, edad){
  this.nombre = nombre;
  this.edad = edad;
}

let miPerro = Perro('agustin', 21)



obtenerInformacion();
