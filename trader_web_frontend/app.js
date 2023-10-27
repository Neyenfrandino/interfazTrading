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
    obtenerNuevosDatosUsuario(tablaDeDatos, listaDatos)

    
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
      botonGuardarInfonuevaFila(celda);
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

function botonGuardarInfonuevaFila(celda) {
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

function guardarCambios(IdFilaCorrespondiente, data){
  console.log(data, 'datos')

  let celdaCorrespondiente = IdFilaCorrespondiente.querySelector('#CeldaCorrespondiente9');
  console.log(celdaCorrespondiente, 'aquie EventSource;pkngre')
  let datosModificados = {}

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
  for (let campo of data) {
    for (let camposDataBase in camposRequeridos) {
      if (campo[0] == camposDataBase && !datosModificados[camposRequeridos[camposDataBase]]) {
        let nuevoValor = campo[1];
        console.log(nuevoValor);
  
        datosModificados[camposRequeridos[camposDataBase]] = nuevoValor;
      }
    }
  }
  
 modificarDatosEntradas(celdaCorrespondiente.textContent, datosModificados);
}

function eliminarEntrada(nroEntrada, celda){
  let btnEliminar = document.createElement('button')
  btnEliminar.className = 'btnEliminar'

  btnEliminar.addEventListener('click', function(){
    
    let respuestaUsuario = prompt('Si desea eliminar la entrada escriba "Si", de lo contrario escriba "No : ')

    if(respuestaUsuario == 'Si'){
      fetch('http://localhost:5000/delete/'+ nroEntrada,{
        method: "delete"
      })
      .then(respuesta => respuesta.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error))
    }
  })
  celda.appendChild(btnEliminar); 
}


function botonGuardar(i){
  let celdasBtn = i.querySelectorAll('#CeldaCorrespondiente10');
    for (let celda of celdasBtn) {
      let btnGuardar = document.getElementById('btnGuardar');
      if (btnGuardar) {
        celda.removeChild(btnGuardar);
      }
      let guardarcambiosYmodificar = document.createElement('button');
      guardarcambiosYmodificar.id = 'guardarcambiosYmodificar'
      guardarcambiosYmodificar.classList.add('btn-modificar');
      celda.appendChild(guardarcambiosYmodificar);
    

     

      let celdasID = i.querySelectorAll('#CeldaCorrespondiente9');
      for(let idCelda of celdasID){
        eliminarEntrada(idCelda.textContent,celda)
      }
    }
}

function obtenerNuevosDatosUsuario() {
  let nuevaFila = document.querySelectorAll('#nuevaFila');
  let nombreAgregadoId = 0;
  let guardarDatosEnArray = [];
  let celdasClickeadas = []; 
  let IdFilaCorrespondiente;

  for (let i of nuevaFila) {
    i.id = 'nuevaFila' + nombreAgregadoId;
    nombreAgregadoId++;
    botonGuardar(i);
   

    i.addEventListener('click', function(event) {
      let celdaClickeada = event.target.closest('td');
      let filaClickeada = event.target.closest('tr');
      let celdaCorrespondienteID = filaClickeada.querySelector('#CeldaCorrespondiente9');

      if (!celdasClickeadas.includes(celdaClickeada)) {
        celdasClickeadas.push(celdaClickeada);
        if (celdaClickeada.id != 'CeldaCorrespondiente10' 
                          && celdaClickeada.id != 'CeldaCorrespondiente9' 
                          && celdaClickeada.id != 'CeldaCorrespondiente8'
                          && celdaClickeada.id != 'CeldaCorrespondiente7' 
                          && celdaClickeada.id != 'CeldaCorrespondiente6'){
          filaClickeada.classList.add('filaSeleccionada')

          celdaClickeada.dataset.valorOriginal = celdaClickeada.textContent;
          celdaClickeada.contentEditable = true;
          celdaClickeada.addEventListener('blur', function() {
          let nuevoContenido = celdaClickeada.textContent;

            guardarDatosEnArray.push([celdaClickeada.id, nuevoContenido]);
            IdFilaCorrespondiente = filaClickeada
            
            celdaClickeada.contentEditable = false;
          });
        }
      }
    });
  }
  let guardarcambiosYmodificar = document.querySelectorAll('#guardarcambiosYmodificar');
  for(let btnCorrespondiente of guardarcambiosYmodificar){
    btnCorrespondiente.addEventListener('click', function() {
      console.log(IdFilaCorrespondiente, 'aqui fila click')
      guardarCambios(IdFilaCorrespondiente, guardarDatosEnArray);
    });
  }
  
}

function agregarPlanDeTrading(){
  let UlLista = document.getElementById('listaPlanTrading');
  let btnAgregarPlanDeTrading = document.getElementById('btnPlanTrading');

  btnAgregarPlanDeTrading.addEventListener('click', function(){
    let itemLista = document.createElement('li')
    itemLista.contentEditable = true
    UlLista.appendChild(itemLista);


    btnAgregarPlanDeTrading.addEventListener('click', function(){
      let nuevoContenido = itemLista.textContent
      console.log(nuevoContenido)


    })

  })

}



obtenerInformacion();
