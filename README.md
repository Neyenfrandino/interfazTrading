# Trading API

Ejemplo básico de API en python para persistir datos de entradas de Trading.
Con mucho cariño para você!!


## Instalación y ejecución del API

Instalar las dependencias para el uso de `Flask` y manipulación de fechas.

**Nota**: asegurarse de entrar a la carpeta del back end.

```sh
pipenv install -r requirements
```

Ejecutar el script de python para habilitar API
```sh
python entradas_api.py 
```

## Contrato de datos
El contrato está basado en los siguientes campos:
1. `id_entrada` -> `int`
1. `fecha_creacion` -> `datetime`
1. `fecha_actualizacion` -> `datetime`
1. `objetivo` -> `string`
1. `plan_trading` -> `string`
1. `comienzo_nuevo_plan` -> `date`
1. `entrada` -> `float`
1. `salida_perdida` -> `float`
1. `salida_ganacia` -> `float`
1. `riesgo_beneficio` -> `float`
1. `cantidad_lotaje` -> `float`
1. `cantidad_inicial_usdt` -> `float`
1. `resultado` -> `string`
1. `nota_personal` -> `string`

## Uso del API
Este API dispone de 4 endpoints para la manipulación de datos de un archivo llamado `entradas.json`. Cada endpoint corresponde a una operación del **CRUD**: _create, read, update & delete_.

### Lectura de datos

Ejemplo de petición al método http `GET`:
```sh
curl -X GET -u neyen:jet_blanca http://localhost:5000/get
```

### Inserción de datos

Ejemplo de petición al método http `POST`:
```sh
curl -X POST -H "Content-Type: application/json" -d "{\"objetivo\": \"Mi objetivo\", \"plan_trading\": \"Mi plan\", \"comienzo_nuevo_plan\": \"2023-10-15\", \"entrada\": 100.5, \"salida_perdida\": 90.0, \"salida_ganacia\": 110.0, \"riesgo_beneficio\": 1.1, \"cantidad_lotaje\": 1.0, \"cantidad_inicial_usdt\": 1000.0, \"resultado\": \"Ganancia\", \"nota_personal\": \"Comentario personal\"}" -u neyen:jet_blanca http://localhost:5000/insert
```


### Actualización de datos

Ejemplo de petición al método http `PUT`:
```sh
curl -X PUT -H "Content-Type: application/json" -d "{\"id_entrada\":1,\"objetivo\":\"Nuevo objetivo, wipiti\",\"plan_trading\":\"Nuevo plan\",\"comienzo_nuevo_plan\":\"2023-10-15\",\"entrada\":123.45,\"salida_perdida\":100.0,\"salida_ganacia\":150.0,\"riesgo_beneficio\":1.5,\"cantidad_lotaje\":2.0,\"cantidad_inicial_usdt\":2000.0,\"resultado\":\"Nuevo resultado, wipiti\",\"nota_personal\":\"Nueva nota personal\"}" -u neyen:jet_blanca http://localhost:5000/update
```


### Eliminación de datos

Ejemplo de petición al método http `DELETE`:
```sh
curl -X DELETE -H "Content-Type: application/json" -d "{ \"id_entrada\": 1}" -u neyen:jet_blanca http://localhost:5000/delete
```


## Requerimiento para chatcito
Generate an API in python for basic CRUD of trading entries that meets the following indications

- Une one single python script to do it
- Build the most basic version of an API with the shortest file as possible
- Add 4 endpoints, one for each basic operation of the CRUD: insert, update, get and delete.
- That API should persist data in a local json filed called "entradas.json"
- Add pretty basic authentication where user is "neyen" and password is "jet_blanca"
- Provide python code in Spanish, but methods must remain in English: get, insert, update, delete
- Each endpoint response should be an object that contains 2 fields: 
	+ codigo: number
	+ mensaje: string
- Data contract: audit fields. They are automated fields that must be calculated by the API. User should not be in charge of dealing with it.
	+ id_entrada: int -> primary key.
	+ fecha_creacion: datetime --> Creation date that is set when using "/create" endpoint
	+ fecha_actualizacion: datetime --> Update date that is set when using "/update" endpoint. By default is set to fecha_creacion when record is created.
- Data contract must include following fields as well. 
	+ objetivo: string
	+ plan_trading: string
	+ comienzo_nuevo_plan: date
	+ entrada: float
	+ salida_perdida: float
	+ salida_ganacia: float
	+ riesgo_beneficio: float
	+ cantidad_lotaje: float
	+ cantidad_inicial_usdt: float
	+ resultado: string
	+ nota_personal: string
- Audit fields must be at the beggining of each object in the list saved in .json file
- Validate API accomplishes data contract
- Prevent data loss when manipulating data: do NOT clean entradas.json file whenever the FlaskAPI app is up or down. 
- Provide curl example to insert data
