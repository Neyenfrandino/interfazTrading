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
    btnModificar(tablaDeDatos, listaDatos)

    
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
  fila.id = 'nuevaFila';
  let camposRequeridos = {
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
  for (let titulo in camposRequeridos) {
    let celda = fila.insertCell();
    celda.textContent = datos[camposRequeridos[titulo]];
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
  let camposRequeridos = {
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

  for (let titulo in camposRequeridos) {
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

let datosModificados = {
  "punto_entrada": 77777
};

function neyen(){
  modificarDatosEntradas(1,datosModificados);
}


function btnModificar(elementoTablaInfo, listaDatos) {
  let celdasBtn = document.querySelectorAll('#CeldaCorrespondiente10');

  for (let celda of celdasBtn) {
    let btnGuardar = document.getElementById('btnGuardar');
    if (btnGuardar) {
      celda.removeChild(btnGuardar);
    }

    let btnModificar = document.createElement('button');
    btnModificar.id = 'btnModificar';
    btnModificar.classList.add('btn-modificar');
    celda.appendChild(btnModificar);
  }

  elementoTablaInfo.addEventListener('click', function (event) {
    let filaClickeada = event.target.closest('tr');
    let celdaClickeada = event.target.closest('td');
    let valorCeldaClick = celdaClickeada.textContent;

    // Verifica si el elemento clickeado es un input para evitar reemplazarlo
    if (event.target.tagName !== 'INPUT') {
      let inputCelda = document.createElement('input');
      inputCelda.value = valorCeldaClick;
      celdaClickeada.innerHTML = '';
      celdaClickeada.appendChild(inputCelda);
      inputCelda.addEventListener('click', function (e) {
        e.stopPropagation();
      });
      inputCelda.focus();

      // Agrega un evento blur para guardar los cambios cuando se pierde el enfoque del input
      inputCelda.addEventListener('blur', function () {
        let celdaCorrespondiente = filaClickeada.querySelector('#CeldaCorrespondiente9');
        console.log(celdaCorrespondiente.textContent)
        celdaClickeada.textContent = inputCelda.value;
        console.log(celdaClickeada.id,':', inputCelda.value, 'este es el valor actua;')
        let nuevoValor = inputCelda.value


        let encabezadoCorrespondiente = document.querySelector('td');
        let encabezadoo = encabezadoCorrespondiente;
        console.log(encabezadoo.id, 'este es el encabezado correeeeeeee')



        let camposRequeridos = {
          CeldaCorrespondiente1 : "punto_entrada",
          CeldaCorrespondiente2 : "stop_loss",
          CeldaCorrespondiente3 : "take_profit",
          CeldaCorrespondiente4: "riesgo_beneficio",
          CeldaCorrespondiente5: "cantidad_lotaje",
          CeldaCorrespondiente6: "fecha_creacion",
          CeldaCorrespondiente7: 'entrada_es_compra',
          CeldaCorrespondiente8: "entrada_ganada",
          CeldaCorrespondiente9: "id_entrada",
          CeldaCorrespondiente10: ""
        };

        for(let clave in camposRequeridos){
          if(clave == encabezadoo.id){
            console.log(camposRequeridos[clave])
            
            let datosModificados = {[camposRequeridos[clave]] : nuevoValor}
            
            console.log(datosModificados)
            


            modificarDatosEntradas(celdaCorrespondiente.textContent, datosModificados);

           



          }
        }
      
    

        



        // 
      
        
        // console.log (datosModificados, 'datos mmodificados')

      
       

      });
    }
  });
}



obtenerInformacion();

