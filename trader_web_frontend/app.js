// let auth = {
//   username: "neyen",
//   password: "jet_blanca"
// };
 
// async function obtenerInformacion() {
//   try {
//     let response = await fetch('http://localhost:5000/get', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Basic ${btoa(`${auth.username}:${auth.password}`)}`
//       }
//     });

//     if (!response.ok) {
//       throw new Error('No se pudo completar la solicitud');
//     }

//     let listaDatos = await response.json();
//     let tablaDeDatos = tablaDinamica(listaDatos);
//     obtenerNuevosDatosUsuario(tablaDeDatos, listaDatos)

    
//   } catch (error) {
//     console.error('Ocurrió un error al obtener la información:', error);
//   }
// }

// async function insertarDatos(datos) {
//   try {
//     let respuesta = await fetch('http://localhost:5000/insert', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Basic ${btoa(`${auth.username}:${auth.password}`)}`
//       },
//       body: JSON.stringify(datos)
//     });

//     if (!respuesta.ok) {
//       throw new Error('Error en la solicitud ' + respuesta.statusText);
//     }

//     let data = await respuesta.json();
//     console.log('Registro creado: ', data);
//   } catch (error) {
//     console.error('Algo salió mal al crear el registro: ', error);
//   }
// }

// function tablaDinamica(listaDatos) {
//   let contenedorDivTabla = document.getElementById('contenedorDivTabla');
//   let elementoTabla = document.createElement('table');
//   elementoTabla.className = 'tablaDeDatos';
//   elementoTabla.id = 'tablaDeDatos';

//   let crearEncabezadoElemento = document.createElement('tr');
//   let encabezado = {
//     encabezadoPuntoEntrada: 'Entrada(PE)',
//     encabezadoSalidaPerdida: 'SalidaPerdida(SL)',
//     encabezadoSalidaGanancia: 'SalidaGanancia(TP)',
//     encabezadoRiesgoBeneficio: 'RiesgoBeneficio(RB)',
//     encabezadoLotage: 'Cantidad(Lotage)',
//     encabezadoFecha: 'Fecha Actual',
//     entrada_es_compra: 'Compra o venta',
//     encabezadoResultado: 'Resultado',
//     encabezadoNumeroEntrada: 'Numero Entrada(id)',
//     encabezadoBtnAgregarFila: ''
//   };

//   for (let titulo in encabezado) {
//     let encabezadoCelda = document.createElement('th');

//     if (titulo === "encabezadoBtnAgregarFila") {
//       let botonCrearFila = document.createElement('button');
//       botonCrearFila.id = 'btnAgregarFila';
//       botonCrearFila.className = 'btnAgregarFila';
//       botonCrearFila.textContent = '+';
//       encabezadoCelda.appendChild(botonCrearFila);

//       botonCrearFila.addEventListener('click', function () {
//         console.log('funciona');
//         crearFilaIngresarInformacion(elementoTabla);
//       });
//     } else {
//       encabezadoCelda.textContent = encabezado[titulo];
//     }
//     crearEncabezadoElemento.appendChild(encabezadoCelda);
//   }
//   elementoTabla.appendChild(crearEncabezadoElemento);

//   for (let datos of listaDatos) {
//     AgregarInformacionATablaDeBaseDeDatos(elementoTabla, datos);
//   }

//   contenedorDivTabla.appendChild(elementoTabla);
//   return elementoTabla
// }

// function AgregarInformacionATablaDeBaseDeDatos(elementoTabla, datos) {
//   let fila = elementoTabla.insertRow();
//   fila.id = 'nuevaFila';
//   let camposRequeridos = {
//     celdaPuntoEntrada: "punto_entrada",
//     celdaSalidaPerdida: "stop_loss",
//     celdaSalidaGanacia: "take_profit",
//     celdaRiesgoBeneficio: "riesgo_beneficio",
//     celdaLotage: "cantidad_lotaje",
//     celdaFecha: "fecha_creacion",
//     celdaEntrada_es_compra: 'entrada_es_compra',
//     celdaResultado: "entrada_ganada",
//     celdaNumeroEntrada: "id_entrada",
//     celdaBtn: ""
//   };

//   let nombreId = 1;
//   for (let titulo in camposRequeridos) {
//     let celda = fila.insertCell();
//     celda.textContent = datos[camposRequeridos[titulo]];
//     celda.id = 'CeldaCorrespondiente' + nombreId;
//     nombreId++

//     if (titulo === 'celdaBtn') {
//       botonGuardar(celda);
//     }
    
//   }
// }

// function crearFilaIngresarInformacion(elementoTabla) {
//   let fila = elementoTabla.insertRow();
//   fila.id = 'filaID';
//   let camposRequeridos = {
//     celdaPuntoEntrada: "",
//     celdaSalidaPerdida: "",
//     celdaSalidaGanacia: "",
//     celdaRiesgoBeneficio: "",
//     celdaLotage: "",
//     celdaFecha: "",
//     celdaEntrada_es_compra: '',
//     celdaResultado: "",
//     celdaNumeroEntrada: "",
//     celdaBtn: ""
//   };
//   let nombreId = 1;

//   for (let titulo in camposRequeridos) {
//     let celda = fila.insertCell();
//     celda.id = 'celdasID';

//     if (titulo == 'celdaNumeroEntrada') {
//       celda.textContent = '';
//     } else if (titulo == 'celdaFecha') {
//       celda.textContent = '';
//     } else if (titulo == 'celdaBtn') {
//       botonGuardarInfonuevaFila(celda);
//     }else if (titulo === 'celdaEntrada_es_compra') {
    
//       let select = document.createElement('select');
//       select.id = 'select'; 
     

//       let option1 = document.createElement('option');
//       option1.value = true;
//       option1.text = 'compra';
      
//       let option2 = document.createElement('option');
//       option2.value = false;
//       option2.text = 'venta';
    
//       select.appendChild(option1);
//       select.appendChild(option2);
    

//       celda.appendChild(select);
//     }else if(titulo == 'celdaResultado'){
      
//       let select = document.createElement('select');
//       select.id = 'select1'; // 
    
      
//       let option1 = document.createElement('option');
//       option1.value = true;
//       option1.text = 'Ganada';
    
//       let option2 = document.createElement('option');
//       option2.value = false;
//       option2.text = 'Perdida';
    
//       select.appendChild(option1);
//       select.appendChild(option2);
    
//       celda.appendChild(select);
//     }
//      else {
//       let input = document.createElement('input');
//       celda.appendChild(input);
//       input.id = 'entradaInput' + nombreId;
//       nombreId++;
//     }
//   }
// }

// function botonGuardarInfonuevaFila(celda) {
//   btnGuardar = document.createElement('button');
//   btnGuardar.id = 'btnGuardar';
//   btnGuardar.className = 'btnGuardar';
//   celda.appendChild(btnGuardar);
  
//   btnGuardar.addEventListener('click', function () {    
//   let selectElement1 = document.getElementById('select');
//   let selectedValue1 = Boolean(selectElement1.value);
//   console.log(selectedValue1)

//   let selectElement2 = document.getElementById('select1');
//   let selectedValue2 = Boolean(selectElement2.value);
//   console.log(selectedValue2)
  
//   let datos = {
//     punto_entrada: parseFloat(document.getElementById('entradaInput1').value),
//     stop_loss: parseFloat(document.getElementById('entradaInput2').value),
//     take_profit: parseFloat(document.getElementById('entradaInput3').value),
//     riesgo_beneficio: parseFloat(document.getElementById('entradaInput4').value),
//     cantidad_lotaje: parseFloat(document.getElementById('entradaInput5').value),
//     cantidad_inicial_usdt: 1000,
//     entrada_es_compra: selectedValue1,
//     entrada_ganada: selectedValue2, 
//     nota_personal: "nota de prueba",
//     plan_trading_detalle: "detalle de prueba",
//     trading_objetivo: "Objetivo de trading"
//   }    
//     insertarDatos(datos)
//   });

// }

// function modificarDatosEntradas(idEntrada, datosModificados) {
//   fetch(`http://localhost:5000/update/${idEntrada}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Basic ${btoa(`${auth.username}:${auth.password}`)}`
//     },
//     body: JSON.stringify(datosModificados)
//   })
//     .then(respuesta => respuesta.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error', error));
// }

// function guardarCambios(IdFilaCorrespondiente, data){
//   console.log(data, 'datos')

//   let celdaCorrespondiente = IdFilaCorrespondiente.querySelector('#CeldaCorrespondiente9');
//   console.log(celdaCorrespondiente, 'aquie EventSource;pkngre')
//   let datosModificados = {}

//   let camposRequeridos = {
//     CeldaCorrespondiente1 : "punto_entrada",
//     CeldaCorrespondiente2 : "stop_loss",
//     CeldaCorrespondiente3 : "take_profit",
//     CeldaCorrespondiente4: "riesgo_beneficio",
//     CeldaCorrespondiente5: "cantidad_lotaje",
//     CeldaCorrespondiente6: "fecha_creacion",
//     CeldaCorrespondiente7: 'entrada_es_compra',
//     CeldaCorrespondiente8: "entrada_ganada",
//     CeldaCorrespondiente9: "id_entrada",
//     CeldaCorrespondiente10: ""
//   };
//   for (let campo of data) {
//     for (let camposDataBase in camposRequeridos) {
//       if (campo[0] == camposDataBase && !datosModificados[camposRequeridos[camposDataBase]]) {
//         let nuevoValor = campo[1];
//         console.log(nuevoValor);
  
//         datosModificados[camposRequeridos[camposDataBase]] = nuevoValor;
//       }
//     }
//   }
  
//  modificarDatosEntradas(celdaCorrespondiente.textContent, datosModificados);
// }

// function eliminarEntrada(nroEntrada, celda){
//   let btnEliminar = document.createElement('button')
//   btnEliminar.className = 'btnEliminar'

//   btnEliminar.addEventListener('click', function(){
    
//     let respuestaUsuario = prompt('Si desea eliminar la entrada escriba "Si", de lo contrario escriba "No : ')

//     if(respuestaUsuario == 'Si'){
//       fetch('http://localhost:5000/delete/'+ nroEntrada,{
//         method: "delete"
//       })
//       .then(respuesta => respuesta.json())
//       .then(data => console.log(data))
//       .catch(error => console.error('Error:', error))
//     }
//   })
//   celda.appendChild(btnEliminar); 
// }


// function botonGuardar(i){
//   let celdasBtn = i.querySelectorAll('#CeldaCorrespondiente10');
//     for (let celda of celdasBtn) {
//       let btnGuardar = document.getElementById('btnGuardar');
//       if (btnGuardar) {
//         celda.removeChild(btnGuardar);
//       }
//       let guardarcambiosYmodificar = document.createElement('button');
//       guardarcambiosYmodificar.id = 'guardarcambiosYmodificar'
//       guardarcambiosYmodificar.classList.add('btn-modificar');
//       celda.appendChild(guardarcambiosYmodificar);
    

     

//       let celdasID = i.querySelectorAll('#CeldaCorrespondiente9');
//       for(let idCelda of celdasID){
//         eliminarEntrada(idCelda.textContent,celda)
//       }
//     }
// }

// function obtenerNuevosDatosUsuario() {
//   let nuevaFila = document.querySelectorAll('#nuevaFila');
//   let nombreAgregadoId = 0;
//   let guardarDatosEnArray = [];
//   let celdasClickeadas = []; 
//   let IdFilaCorrespondiente;

//   for (let i of nuevaFila) {
//     i.id = 'nuevaFila' + nombreAgregadoId;
//     nombreAgregadoId++;
//     botonGuardar(i);
   

//     i.addEventListener('click', function(event) {
//       let celdaClickeada = event.target.closest('td');
//       let filaClickeada = event.target.closest('tr');
//       let celdaCorrespondienteID = filaClickeada.querySelector('#CeldaCorrespondiente9');

//       if (!celdasClickeadas.includes(celdaClickeada)) {
//         celdasClickeadas.push(celdaClickeada);
//         if (celdaClickeada.id != 'CeldaCorrespondiente10' 
//                           && celdaClickeada.id != 'CeldaCorrespondiente9' 
//                           && celdaClickeada.id != 'CeldaCorrespondiente8'
//                           && celdaClickeada.id != 'CeldaCorrespondiente7' 
//                           && celdaClickeada.id != 'CeldaCorrespondiente6'){
//           filaClickeada.classList.add('filaSeleccionada')

//           celdaClickeada.dataset.valorOriginal = celdaClickeada.textContent;
//           celdaClickeada.contentEditable = true;
//           celdaClickeada.addEventListener('blur', function() {
//           let nuevoContenido = celdaClickeada.textContent;

//             guardarDatosEnArray.push([celdaClickeada.id, nuevoContenido]);
//             IdFilaCorrespondiente = filaClickeada
            
//             celdaClickeada.contentEditable = false;
//           });
//         }
//       }
//     });
//   }
//   let guardarcambiosYmodificar = document.querySelectorAll('#guardarcambiosYmodificar');
//   for(let btnCorrespondiente of guardarcambiosYmodificar){
//     btnCorrespondiente.addEventListener('click', function() {
//       console.log(IdFilaCorrespondiente, 'aqui fila click')
//       guardarCambios(IdFilaCorrespondiente, guardarDatosEnArray);
//     });
//   }
  
// }

// function agregarPlanDeTrading(){
//   let UlLista = document.getElementById('listaPlanTrading');
//   let btnAgregarPlanDeTrading = document.getElementById('btnPlanTrading');

//   btnAgregarPlanDeTrading.addEventListener('click', function(){
//     let itemLista = document.createElement('li')
//     itemLista.contentEditable = true
//     UlLista.appendChild(itemLista);


//     btnAgregarPlanDeTrading.addEventListener('click', function(){
//       let nuevoContenido = itemLista.textContent
//       console.log(nuevoContenido)
//     })
//   })
// }


// obtenerInformacion();



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

    return listaDatos
  } catch (error) {
    console.error('Ocurrió un error al obtener la información:', error);
  }
}


// la asignamos la funcion de peticion a una variavle.
let promesa = obtenerInformacion();
// promesa.then(function(listaDatos) {
//   // console.log(listaDatos)
// })


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

function eliminarEntrada(nroEntrada){
  // let btnEliminar = document.createElement('button')
  // btnEliminar.className = 'btnEliminar'

  // btnEliminar.addEventListener('click', function(){
    
    let respuestaUsuario = prompt('Si desea eliminar la entrada escriba "Si", de lo contrario escriba "No : ')

    if(respuestaUsuario == 'Si'){
      fetch('http://localhost:5000/delete/'+ nroEntrada,{
        method: "delete"
      })
      .then(respuesta => respuesta.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error))
    }
  // })
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

class Tabla {
  constructor(promesa) {
      this.promesa = promesa;
      this.elementosNecesariosTabla = {
      contenedorTabla: document.getElementById('contenedorDivTabla'),
      tabla: document.createElement('table')
      }
  }
 

  tituloEncabezados() {
    // Esta funcion se encarga de imprimir los encabezados correspondientes 
    let filaEncabezado = document.createElement('tr');
    filaEncabezado.id = 'filaEncabezado';
    filaEncabezado.className = 'filaEncabezado';
    let contador = 0;

    let titulo = {
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

    for (let nombreEncabezado in titulo) {
      if (nombreEncabezado == 'encabezadoBtnAgregarFila') {
        let btn_agregas_nueva_entrada = document.createElement('button');
        btn_agregas_nueva_entrada.id = 'btn_agregas_nueva_entrada';
        btn_agregas_nueva_entrada.className = 'btn_agregas_nueva_entrada'
        btn_agregas_nueva_entrada.textContent = '+';
      
          btn_agregas_nueva_entrada.addEventListener('click', () => {
            this.botonMasNuevaInfo()
          });
        
        filaEncabezado.appendChild(btn_agregas_nueva_entrada);

      } else if (nombreEncabezado) {
        let celdaEncabezado = document.createElement('th');
        celdaEncabezado.id = 'celdaEncabezado' + contador;
        celdaEncabezado.className = 'celdaEncabezado' + contador;
        filaEncabezado.id = 'filaEncabezado' + contador;
        filaEncabezado.className = 'filaEncabezado' + contador;
        celdaEncabezado.textContent = titulo[nombreEncabezado];
        filaEncabezado.appendChild(celdaEncabezado);
        contador += 1;
      }
    }
    this.elementosNecesariosTabla.tabla.appendChild(filaEncabezado);
    return this.elementosNecesariosTabla.tabla;
  }

  agregandoInformacionTablaDesdeBaseDeDatos() {
    // Esta funcion se encarga de traer los datos de la base de datos y de imprimirla en la tabla.
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

    this.promesa.then((listaDatos) => {
      let contador = 0
      for (let dato in listaDatos) {
        let fila = document.createElement('tr');
        for (let campo in camposRequeridos) {
          let celda = document.createElement('td');
          if(contador >= 0 && contador <= 9){
            celda.id = 'celdaCorrespondiente' + contador
          }else{
            contador = 0
          }
          

          if(campo == 'celdaBtn'){
            // let modificar_elemento_base_de_datos = document.createElement('button');
            // modificar_elemento_base_de_datos.id = 'modificar_elemento_base_de_datos'
            // modificar_elemento_base_de_datos.classList = 'btn-modificar'

            // let btnEliminar = document.createElement('button')
            // btnEliminar.id = 'btnEliminar'
            // btnEliminar.className = 'btnEliminar'

            let modificar_elemento_base_de_datos = this.botonModificarElementosEnbaseDeDatos()
            let btneliminar = this.btnEliminar()
            
            fila.appendChild(modificar_elemento_base_de_datos)
            fila.appendChild(btneliminar)
          }else{
          // Actualizar el contenido de la celda
            celda.textContent = listaDatos[dato].entrada_ganada;
            celda.textContent = listaDatos[dato][camposRequeridos[campo]];
            fila.appendChild(celda);
          }
          contador += 1
        }
        this.elementosNecesariosTabla.tabla.appendChild(fila);
      }
    });

    this.elementosNecesariosTabla.contenedorTabla.appendChild(this.elementosNecesariosTabla.tabla);
    return camposRequeridos;
  }

  botonMasNuevaInfo() {
    // Es funcion se encarga de insertar las nuevas celdas cuando el usuario le de click al boton +  
    // Y luego se encarga de extraer la informacion de las celdas y pasar una lista masticadita.
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
      let fila = document.createElement('tr');
      let contador = 0
      for (let campo in camposRequeridos) {
        let celda = document.createElement('td');
        if (campo != 'celdaBtn') {
          if(campo != 'celdaNumeroEntrada' && 
             campo != 'celdaResultado' && 
             campo != 'celdaEntrada_es_compra' && 
             campo != 'celdaFecha' ){
            celda.contentEditable = true;
            celda.id = 'celdaCamposNuevos' + contador
          }else{
            // Aniadimos botones select con las opciones correspondientes
            if(campo == 'celdaResultado'){
             // Crear el elemento select
              let btn_resultado = document.createElement('select');
              btn_resultado.className = 'btn_resultado'
              btn_resultado.id = 'btn_resultado'

              // Crear las opciones
              let opcionGanada = document.createElement('option');
              opcionGanada.value = true;
              opcionGanada.text = 'Ganada';

              let opcionPerdida = document.createElement('option');
              opcionPerdida.value = false;
              opcionPerdida.text = 'Perdida';

              // Agregar las opciones al select
              btn_resultado.add(opcionGanada);
              btn_resultado.add(opcionPerdida);

              // Agregar el select a la celda
              celda.appendChild(btn_resultado);

              // // Evento para manejar la selección
              // btn_resultado.addEventListener('change', function() {
              //     console.log('Opción seleccionada:', btn_resultado.value);
              // });
            }else if (campo == 'celdaEntrada_es_compra'){
               // Aniadimos botones select con las opciones correspondientes
               // Crear el elemento select
               let btn_compra_o_venta = document.createElement('select');
               btn_compra_o_venta.className = 'btn_compra_o_venta'
               btn_compra_o_venta.id = 'btn_compra_o_venta'
               // Crear las opciones
               let opcionGanada = document.createElement('option');
               opcionGanada.value = true;
               opcionGanada.text = 'Compra';
 
               let opcionPerdida = document.createElement('option');
               opcionPerdida.value = false;
               opcionPerdida.text = 'Venta';
 
               // Agregar las opciones al select
               btn_compra_o_venta.add(opcionGanada);
               btn_compra_o_venta.add(opcionPerdida);
 
               // Agregar el select a la celda
               celda.appendChild(btn_compra_o_venta);
 
              //  // Evento para manejar la selección
              //  btn_compra_o_venta.addEventListener('change', function() {
              //      console.log('Opción seleccionada:', btn_compra_o_venta.value);
              //  });
            }
            // celda.contentEditable = false
            celda.id = 'celdaCamposNuevos' + contador
          }
          fila.appendChild(celda);
          contador += 1
        }else{
            let btnInsertNuevaFila = document.createElement('button');
            btnInsertNuevaFila.id = 'btnInsertNuevaFila'
            btnInsertNuevaFila.classList = 'btnGuardar'
            btnInsertNuevaFila.addEventListener('click', function () {
              let contenido_celda = [];
              let filaClickeadaProcesada = false;
              fila.addEventListener('click', function (event) {
                if (!filaClickeadaProcesada) {
                  let celdaClickeada = event.target.closest('td');
                  let filaClickeada = event.target.closest('tr');
                  let Idceldas = filaClickeada.querySelectorAll('[id]');
                  let datosUsuario = {};
            
                  let datosRequeridosInsetTabla = [
                    "punto_entrada",
                    "stop_loss",
                    "take_profit",
                    "riesgo_beneficio",
                    "cantidad_lotaje",
                  ];
            
                  Idceldas.forEach((element, i) => {
                    let campo_correspondiente = datosRequeridosInsetTabla[i];
            
                    if (
                      element.id !== 'btnInsertNuevaFila' &&
                      element.id !== 'btn_compra_o_venta' &&
                      element.id !== 'celdaCamposNuevos6' &&
                      element.id !== 'celdaCamposNuevos7' &&
                      element.id !== 'btn_resultado' &&
                      element.id !== 'celdaCamposNuevos5' &&
                      element.id !== 'celdaCamposNuevos7' &&
                      element.id !== 'celdaCamposNuevos8' &&
                      typeof element.textContent === 'string'
                    ) {
                      if (!isNaN(parseFloat(element.textContent))) {
                        contenido_celda.push([campo_correspondiente, parseFloat(element.textContent)]);
                      } else {
                        element.classList.add('error_ingresar_dato');
                        element.focus()
                        setTimeout(() => {
                          element.classList.remove('error_ingresar_dato');
                        }, 2000);
                      }
                    }
                  });
            
                  contenido_celda.push(["entrada_ganada", btn_resultado.value]);
                  contenido_celda.push(['entrada_es_compra', btn_compra_o_venta.value]);
            
                  for (let i in contenido_celda) {
                    datosUsuario[contenido_celda[i][0]] = contenido_celda[i][1];
                  }
            
                  let cantidadPropiedades = Object.keys(datosUsuario).length;
            
                  if (cantidadPropiedades !== 7) {
                    datosUsuario = {};
                    console.log('hay menos de 7', datosUsuario);
                  } else {
                    console.log('hay 7', datosUsuario);
                     botonInsertarDatos(datosUsuario)
                    datosUsuario = {};
                  }
                  filaClickeadaProcesada = true;
                }
              });
            });
            
        fila.appendChild(btnInsertNuevaFila)
        }
      }
      this.elementosNecesariosTabla.tabla.appendChild(fila);
      this.elementosNecesariosTabla.contenedorTabla.appendChild(this.elementosNecesariosTabla.tabla);
  }

  btnEliminar(){
    let btnEliminar = document.createElement('button')
    btnEliminar.id = 'btnEliminar'
    btnEliminar.className = 'btnEliminar'
    btnEliminar.addEventListener('click', function(event){
      let filaClickeada = event.target.closest('tr');
      let elementosConId = filaClickeada.querySelector('#celdaCorrespondiente8').textContent;
        // console.log(elementosConId)
        // console.log(filaClickeada)
      eliminarEntrada(elementosConId)


    })
    return btnEliminar

    
  }
  botonModificarElementosEnbaseDeDatos() {

    let camposRequeridos = {
      0: "punto_entrada",
      1: "stop_loss",
      2: "take_profit",
      3: "riesgo_beneficio",
      4: "cantidad_lotaje",
      5: 'entrada_es_compra',
      6: "entrada_ganada",
      7: "id_entrada",
    };
    let botonModificado = false;
  
    let modificar_elemento_base_de_datos = document.createElement('button');
    modificar_elemento_base_de_datos.id = 'modificar_elemento_base_de_datos';
    modificar_elemento_base_de_datos.classList = 'btn-modificar';
  
    modificar_elemento_base_de_datos.addEventListener('click', function (event) {
      let filaClickeada = event.target.closest('tr');
      let elementos_modificados_valor = filaClickeada.querySelectorAll('td');
      // console.log(elementos_modificados_valor)
  
      if (!botonModificado) {
        // Modificar el botón y habilitar la edición de celdas
        modificar_elemento_base_de_datos.classList.remove('btn-modificar');
        modificar_elemento_base_de_datos.classList.add('btnGuardar');
  
        elementos_modificados_valor.forEach(function (celda) {
          celda.contentEditable = true;
  
          // Agregar escuchador de eventos de entrada para identificar la celda modificada
          celda.addEventListener('input', function () {
            celda.classList.add('celda-modificada');
          });
        });
  
        botonModificado = true;
      } else {
        // Guardar los cambios realizados en las celdas
        elementos_modificados_valor = Array.from(elementos_modificados_valor);

        elementos_modificados_valor.forEach(function (element, i) {
          if (element.classList.contains('celda-modificada')) {
            let elementosConId = filaClickeada.querySelector('#celdaCorrespondiente8').textContent;
            let contenido_modificado_y_adaptado = {}
            if (!isNaN(parseFloat(element.textContent))) {
              let nuevoContenido = element.textContent;
              let campoCorrespondiente = camposRequeridos[i]
              contenido_modificado_y_adaptado[campoCorrespondiente] = nuevoContenido
               
              // console.log(`"${campoCorrespondiente}":"${nuevoContenido}"`)
              console.log(contenido_modificado_y_adaptado)
          
              // console.log(elementosConId, nuevoContenido)
              // Aquí puedes realizar la lógica para guardar los cambios en la base de datos
              modificarDatosEntradas(elementosConId, contenido_modificado_y_adaptado)
            } else {
              element.classList.add('error_ingresar_dato');
              setTimeout(() => {
                element.classList.remove('error_ingresar_dato');
              }, 2000);
            }
          }
        });
        
        // Restaurar el botón y deshabilitar la edición de celdas
        modificar_elemento_base_de_datos.classList.remove('btnGuardar');
        modificar_elemento_base_de_datos.classList.add('btn-modificar');
  
        elementos_modificados_valor.forEach(function (celda) {
          celda.contentEditable = false;
          celda.classList.remove('celda-modificada');
        });
  
        botonModificado = false;
      }
    });
  
    return modificar_elemento_base_de_datos;
  }
  
 
}

function botonInsertarDatos(datosUsuario) {
  let datosRequeridosInsetTabla = {
    punto_entrada: 0.1,
    stop_loss: 0.2,
    take_profit: 0.3,
    riesgo_beneficio: 0.4,
    cantidad_lotaje: 0.5,
    entrada_es_compra: true,
    entrada_ganada: true, 
    cantidad_inicial_usdt: 1000,
    nota_personal: "nota de prueba",
    plan_trading_detalle: "detalle de prueba",
    trading_objetivo: "Objetivo de trading"
  };

  for (let requerido in datosRequeridosInsetTabla) {
    if (datosUsuario.hasOwnProperty(requerido)) {
      // Ajustar tipos de datos según sea necesario
      switch (requerido) {
        case 'punto_entrada':
        case 'stop_loss':
        case 'take_profit':
        case 'riesgo_beneficio':
        case 'cantidad_lotaje':
        case 'cantidad_inicial_usdt':
          datosRequeridosInsetTabla[requerido] = parseFloat(datosUsuario[requerido]);
          break;

        case 'entrada_es_compra':
        case 'entrada_ganada':
          datosRequeridosInsetTabla[requerido] = (datosUsuario[requerido].toLowerCase() === 'true');
          break;

        default:
          // No se requiere conversión para otras propiedades
          break;
      }
    }
  }

  console.log(datosRequeridosInsetTabla);
  insertarDatos(datosRequeridosInsetTabla);
}


let tabla = new Tabla(promesa);
tabla.tituloEncabezados();
tabla.agregandoInformacionTablaDesdeBaseDeDatos()
tabla.btnEliminar()
tabla.botonModificarElementosEnbaseDeDatos()
