let listaDatos = []

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

    listaDatos = await response.json();
    
    // Realiza operaciones con la lista de datos aquí
    for (let datos of listaDatos) {
      if (datos) {
        console.log(datos);
        agregarInformacionTabla(datos);
      }else{
        console.log(datos.fecha_actualizacion)

      }
    }
  } catch (error) {
    console.error('Ocurrió un error al obtener la información:', error);
  }
}



// async function ActualizaciónDeDatos(id, salida_perdida, entrada) {
//   let auth = {
//     username: "neyen",
//     password: "jet_blanca"
//   };

//   try {
//     let updateData = {
//       id: id,
//       salida_perdida: salida_perdida,
//       entrada: entrada
//     };

//     await fetch('http://localhost:5000/update/id_entrada/'+ id, { // Aquí incluyes el ID en la URL
//       method: 'PUT',
//       headers: {
//         'Authorization': `Basic ${btoa(`${auth.username}:${auth.password}`)}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(updateData)
//     });

//   } catch (error) {
//     console.error(error);
//   }
// }

// ActualizaciónDeDatos(8, 1500000.0, 888888); // Actualiza el campo "salida_perdida" a 95.0 en el registro con ID 1

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

function agregarInformacionTabla(información) {
  let elementoTabla = document.getElementById('tablaDeDatos');
  let fila = document.createElement('tr');
  let celdas = {
    celdaPuntoEntrada: "entrada",
    celdaSalidaPerdida: "salida_perdida",
    celdaSalidaGanacia: "salida_ganacia",
    celdaRiesgoBeneficio: "riesgo_beneficio",
    celdaLotage: "cantidad_lotaje",
    celdaFecha: "fecha_actualizacion",
    celdaResultado: "resultado",
    celdaNumeroEntrada: "id_entrada",
    celdaBtn: ""
  };

  if (información) {
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
          
          // Recorre los inputs y reemplaza con span
          for (let i = 0; i < inputs.length; i++) {
            let nuevoElemento = document.createElement("span");
            nuevoElemento.textContent = inputs[i].value;
            inputs[i].parentNode.replaceChild(nuevoElemento, inputs[i]);
          }
        });
      } else {
        let valorCelda = información[celdas[celda]];
        if (valorCelda !== null && valorCelda !== undefined) {
          // Si el valor no es nulo o indefinido, muestra el valor en lugar de un input
          let nuevoElemento = document.createElement("span");
          nuevoElemento.textContent = valorCelda;
          crearCelda.appendChild(nuevoElemento);

        } else {
          // Si el valor es nulo o indefinido, crea un input vacío
          let input = document.createElement('input');
          input.type = 'text';
          crearCelda.appendChild(input);
        }
      }
      fila.appendChild(crearCelda);
    }
  } else {
    // Cuando no hay información, crea celdas vacías
    for (let celda in celdas) {
      let crearCelda = document.createElement('td');
      if (celda === 'celdaBtn') {
        let botonGuardar = document.createElement('button');
        botonGuardar.id = 'btnGuardar';
        botonGuardar.textContent = '';
        botonGuardar.className = 'btnGuardar';
        crearCelda.appendChild(botonGuardar);
      } else {
        let input = document.createElement('input');
        input.type = 'text';
        crearCelda.appendChild(input);
      }
      fila.appendChild(crearCelda);
    }
  }
  
  // Agregar la fila a la tabla
  elementoTabla.appendChild(fila);
}


tablaDinamica()
obtenerInformacion()