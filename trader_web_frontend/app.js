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
    tablaDinamica(listaDatos); // Llamar a tablaDinamica con todos los datos
  } catch (error) {
    console.error('Ocurrió un error al obtener la información:', error);
  }
}

async function insertarDatos(
  cantidad_inicial_usdt,
  cantidad_lotaje,
  entrada_es_compra,
  entrada_ganada,
  fecha_actualizacion,
  fecha_creacion,
  id_entrada,
  nota_personal,
  plan_trading_detalle,
  plan_trading_inicio,
  punto_entrada,
  riesgo_beneficio,
  stop_loss,
  take_profit,
  trading_objetivo
) {

  objEntrada = {
    cantidad_inicial_usdt: cantidad_inicial_usdt,
    cantidad_lotaje: cantidad_lotaje,
    entrada_es_compra: entrada_es_compra,
    entrada_ganada: entrada_ganada,
    nota_personal: nota_personal,
    plan_trading_detalle: plan_trading_detalle,
    plan_trading_inicio: plan_trading_inicio,
    punto_entrada: punto_entrada,
    riesgo_beneficio: riesgo_beneficio,
    stop_loss: stop_loss,
    take_profit: take_profit,
    trading_objetivo: trading_objetivo,
  }

  try {
    let respuesta = await fetch('http://localhost:5000/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${auth.username}:${auth.password}`)}`
      },
      body: JSON.stringify(objEntrada)
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

function lili() {
  insertarDatos(
    10,
    1000,
    true,
    true,
    '',
    '',
    '',
    'nota de prueba',
    'detalle de prueba',
    '2023-10-15',
    1.234,
    2.0,
    1.200,
    1.300,
    'Objetivo de trading'
  );
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

          botonCrearFila.addEventListener('click', function(){
            console.log('funciona')
            crearFilaIngresarInformacion(elementoTabla)
          })
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
      celdaEntrada_es_compra: 'Compra o venta',
      celdaResultado: "entrada_ganada",
      celdaNumeroEntrada: "id_entrada",
      celdaBtn: ""
  };
  
  for (let titulo in camposExcluidos) {
      let celda = fila.insertCell();
      celda.textContent = datos[camposExcluidos[titulo]];
    if(titulo === 'celdaBtn'){
      botonGuardar(celda)
    }
  }
}

function crearFilaIngresarInformacion(elementoTabla){
  let fila = elementoTabla.insertRow();
  fila.id = 'filaID'
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
}
  for (let titulo in camposExcluidos) {
    let celda = fila.insertCell();
    celda.id = 'celdasID'
    if(titulo == 'celdaNumeroEntrada'){
      celda.textContent = ''
    }else if (titulo == 'celdaFecha'){
      celda.textContent = ''
    }else if(titulo == 'celdaBtn'){
      botonGuardar(celda)
    } else{
      input = document.createElement('input');
      celda.appendChild(input)
      input.id = 'entradaInput';
    }
  }
}
function botonGuardar(celda) {
  btnGuardar = document.createElement('button');
  btnGuardar.id = 'btnGuardar';
  btnGuardar.className = 'btnGuardar';
  celda.appendChild(btnGuardar);

  btnGuardar.addEventListener('click', function () {
    fila = document.getElementById('filaID');
    let inputs = fila.querySelectorAll('input');
    let valores = {};

    inputs.forEach(function (input) {
      let nombre = input.id; // Utilizar el ID del input como nombre de la propiedad
      let valor = input.value; // Obtener el valor del input
      valores[nombre] = valor; // Agregar el valor al objeto de valores
    });

    console.log(valores);

    // Ahora puedes pasar el objeto "valores" a tu función "insertarDatos"
    // Nota: Asegúrate de que los nombres de las propiedades coincidan con los parámetros de la función.
    insertarDatos(
      valores.celdaPuntoEntrada,
      valores.celdaLotage,
      valores.celdaEsCompra,
      valores.celdaGanancia,
      valores.celdaActualizacion,
      valores.celdaCreacion,
      valores.celdaEntrada,
      valores.notaPersonal,
      valores.detallePlan,
      valores.fechaPlan,
      valores.puntoEntrada,
      valores.riesgoBeneficio,
      valores.stopLoss,
      valores.takeProfit,
      valores.objetivoTrading
    );
  });
}


obtenerInformacion()


//  cantidad_inicial_usdt
//  cantidad_lotaje
//  entrada_es_compra
//  entrada_ganada
//  fecha_actualizacion
//  fecha_creacion
//  id_entrada
//  nota_personal
//  plan_trading_detalle
//  plan_trading_inicio
//  punto_entrada
//  riesgo_beneficio
//  stop_loss
//  take_profit
//  trading_objetivo