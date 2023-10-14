
// listaElementos = [
//   {
//     "id_entrada": 1,
//     "fecha_creacion": "2023-10-13 09:41:40",
//     "fecha_actualizacion": "2023-10-13 09:41:40",
//     "objetivo": "Mi objetivo",
//     "plan_trading": "Mi plan",
//     "comienzo_nuevo_plan": "2023-10-15",
//     "entrada": 100.5,
//     "salida_perdida": 90.0,
//     "salida_ganacia": 110.0,
//     "riesgo_beneficio": 1.1,
//     "cantidad_lotaje": 1.0,
//     "cantidad_inicial_usdt": 1000.0,
//     "resultado": "Ganancia",
//     "nota_personal": "Comentario personal"
//   }
// ]
async function obtenerInformacion() {
  let auth = {
    username: "neyen",
    password: "jet_blanca"
  };

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
    
    // Realiza operaciones con la lista de datos aquí
    for (let datos of listaDatos) {
      if (datos) {
        console.log(datos);
      }else{
        console.log(datos.fecha_actualizacion)
      }
    }
  } catch (error) {
    console.error('Ocurrió un error al obtener la información:', error);
  }
}

async function AgregarNuevoElementoTabla(
  id_entrada,
  fecha_creacion,
  fecha_actualizacion,
  objetivo,
  plan_trading,
  comienzo_nuevo_plan,
  puntoEntrada,
  salida_perdida,
  salida_ganacia,
  riesgo_beneficio,
  cantidad_lotaje,
  cantidad_inicial_usdt,
  resultado,
  nota_personal
) {
  let auth = {
    username: "neyen",
    password: "jet_blanca"
  };

  try {
    let nuevoElemento = {
      id_entrada: id_entrada,
      fecha_creacion: fecha_creacion,
      fecha_actualizacion: fecha_actualizacion,
      objetivo: objetivo,
      plan_trading: plan_trading,
      comienzo_nuevo_plan: comienzo_nuevo_plan,
      entrada: puntoEntrada,
      salida_perdida: salida_perdida,
      salida_ganacia: salida_ganacia,
      riesgo_beneficio: riesgo_beneficio,
      cantidad_lotaje: cantidad_lotaje,
      cantidad_inicial_usdt: cantidad_inicial_usdt,
      resultado: resultado,
      nota_personal: nota_personal
    };

    let respuesta = await fetch('http://localhost:5000/insert', {
      method: "POST",
      headers: {
        'Authorization': `Basic ${btoa(`${auth.username}:${auth.password}`)}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoElemento)
    });

    if (respuesta.ok) {
      let resultado = await respuesta.json();
      console.log("Elemento agregado:", resultado);
    } else {
      console.error("Error al agregar elemento:", respuesta.status, respuesta.statusText);
    }
  } catch (error) {
    console.error('Ocurrió un error al agregar el nuevo elemento:', error);
  }
}




AgregarNuevoElementoTabla(
  1,
  '2023-10-13 09:41:40', // Fecha de creación
  '2023-10-13 09:41:40', // Fecha de actualización
  'Soy rentable',
  'ganar más de lo que gasto',
  '2023-10-10', // Comienzo de nuevo plan
  100,
  50, // Salida pérdida
  150, // Salida ganancia
  1.3, // Riesgo beneficio
  0.05, // Cantidad lotaje
  150, // Cantidad inicial USDT
  'ganada', // Resultado
  'eres un ganador' // Nota personal
);


function tablaDinamica() {
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
    encabezadoResultado: 'Resultado',
    encabezadoNumeroEntrada: 'Numero Entrada(id)',
    encabezadoBtnAgregarFila: 'valor'
  };

  for (let titulo in encabezado) {
    let celda = document.createElement('th');
    
    if (titulo == 'encabezadoBtnAgregarFila') {
      let botonGuardar = document.createElement('button');
      botonGuardar.id = 'btnAgregar';
      botonGuardar.textContent = '+';
      botonGuardar.className = 'btnGuardar';
      botonGuardar.addEventListener('click', function () {
        agregarInformacionTabla();
      });
      celda.appendChild(botonGuardar);
    } else {
      celda.textContent = encabezado[titulo];
    }

    crearEncabezadoElemento.appendChild(celda);
  }

  elementoTabla.appendChild(crearEncabezadoElemento);

  let contenedorDivTabla = document.getElementById('contenedorDivTabla');
  contenedorDivTabla.appendChild(elementoTabla);
}


  function agregarInformacionTabla() {
    let elementoTabla = document.getElementById('tablaDeDatos'); // Obtén la tabla existente
    let fila = document.createElement('tr');
    let celdas = {
      celdaPuntoEntrada : "valor1",
      celdaSalidaPerdida : "valor2",
      celdaSalidaGanacia : "valor3",
      celdaRiesgoBeneficio : "valor4",
      celdaLotage : "valor5",
      celdaFecha : "valor6",
      celdaResultado : "valor7",
      celdaNumeroEntrada : "valor8",
      celdaBtn : "valor9"
      // Agrega más propiedades si es necesario
    };
  
    for (let celda in celdas) {
      let crearCelda = document.createElement('td');
      
      if (celda === 'celdaBtn') {
        let botonGuardar = document.createElement('button');
        botonGuardar.id = 'btnGuardar';
        botonGuardar.textContent = '';
        botonGuardar.className = 'btnGuardar';
        crearCelda.appendChild(botonGuardar);
        
        botonGuardar.addEventListener('click', function () {
          // Obtén todos los inputs en la fila actual
          let inputs = fila.getElementsByTagName('input');
          
          // Recorre los inputs y imprime sus valores
          for (let i = 0; i < inputs.length; i++) {
            console.log(inputs[i].value);

            let nuevoElemento = document.createElement("span");
            nuevoElemento.textContent = inputs[i].value;

            inputs[i].parentNode.replaceChild(nuevoElemento, inputs[i]);
          }
        });
      } else {
        let input = document.createElement('input');
        input.type = 'text';
        input.value = celdas[celda];
        crearCelda.appendChild(input);
      }
    
      fila.appendChild(crearCelda);
    }
    
    // Agregar la fila a la tabla
    elementoTabla.appendChild(fila);
  }
  
tablaDinamica()
obtenerInformacion();

