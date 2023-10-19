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
1. `trading_objetivo`: `string` -> NOT Required
1. `plan_trading_detalle`: `string` -> NOT1. quired
1. `plan_trading_inicio`: `date` -> NOT Required
1. `entrada_es_compra`: `bool` -> Required
1. `punto_entrada`: `float` -> Required
1. `stop_loss`: `float` -> Required
1. `take_profit`: `float` -> NOT Required
1. `riesgo_beneficio`: `float` -> Required
1. `cantidad_lotaje`: `float` -> Required
1. `cantidad_inicial_usdt`: `float` -> Required
1. `entrada_ganada`: `bool` ->  NOT Required
1. `nota_personal`: `string` -> NOT Required

## Uso del API
Este API dispone de 5 endpoints para la manipulación de datos en la bd Sqlite. Los endpoints corresponden a operaciones del **CRUD**: _create, read, update & delete_.

### Lectura de datos

Ejemplo de petición al método http `GET` para obtener todas las entradas:
```sh
curl -u neyen:jet_blanca http://localhost:5000/get
```

Ejemplo de petición al método http `GET` para obtener la entrada de id=1:
```sh
curl -u neyen:jet_blanca http://localhost:5000/get/1
```

### Inserción de datos

Ejemplo de petición al método http `POST`:
```sh
curl -u neyen:jet_blanca -X POST -H "Content-Type: application/json" -d "{ \"trading_objetivo\": \"Objetivo de trading\", \"plan_trading_detalle\": \"Detalle del plan de trading\", \"plan_trading_inicio\": \"2023-10-15\", \"entrada_es_compra\": true, \"punto_entrada\": 1.234, \"stop_loss\": 1.200, \"take_profit\": 1.300, \"riesgo_beneficio\": 2.0, \"cantidad_lotaje\": 0.1, \"cantidad_inicial_usdt\": 100.0, \"entrada_ganada\": true, \"nota_personal\": \"Nota personal para la entrada - Prueba\" }" http://localhost:5000/insert
```


### Actualización de datos

Ejemplo de petición al método http `PUT`:
```sh
curl -u neyen:jet_blanca -X PUT -H "Content-Type: application/json" -d "{ \"plan_trading_detalle\": \"Probando el método UPDATE\" }" http://localhost:5000/update/1
```


### Eliminación de datos

Ejemplo de petición al método http `DELETE`:
```sh
curl -u neyen:jet_blanca -X DELETE http://localhost:5000/delete/3


## Requerimiento para chatcito
Generate an API in python for basic CRUD of trading entries that meets the following indications

- Use one single python script to do it
- Build the most basic version of an API with the shortest file as possible
- Enable CORS
- Add 5 endpoints to cover basic CRUD operations.
	~ /get -> fetch all records
	~ /get/<id> -> fetch the entry by the specified id
	~ /insert
	~ /update
	~ /delete.
- Use a sqlite database to persist data
- Add pretty basic authentication where user is "neyen" and password is "jet_blanca"
- Provide python code and comments in Spanish, but routes must remain in English: get, insert, update, delete
- Each endpoint response should be an object that contains 2 fields: 
	+ code: number
	+ message: string
- Data contract: audit fields. They are automated fields that must be calculated by the API. User should not be in charge of dealing with it.
	+ id_entrada: int -> primary key.
	+ fecha_creacion: datetime --> Creation date that is set when using "/insert" endpoint
	+ fecha_actualizacion: datetime --> Update date that is set when using "/update" endpoint. By default is set to fecha_creacion when record is created.
- Data contract must include following fields as well. 
	+ trading_objetivo: string -> NOT Required
	+ plan_trading_detalle: string -> NOT Required
	+ plan_trading_inicio: date -> NOT Required
	+ entrada_es_compra: bool -> Required
	+ punto_entrada: float -> Required
	+ stop_loss: float -> Required
	+ take_profit: float -> NOT Required
	+ riesgo_beneficio: float -> Required
	+ cantidad_lotaje: float -> Required
	+ cantidad_inicial_usdt: float -> Required
	+ entrada_ganada: bool ->  NOT Required
	+ nota_personal: string -> NOT Required
- Audit fields must be at the beggining of table columns definition
- Add the following validations: 
	~ API accomplishes data contract
	~ Data cannot be saved if required fields are empty.
	~ PUT method should require id in the route, besides the content in the body
- Prevent data loss when manipulating data: do NOT reset the db whenever the FlaskAPI app is up or down.


#- Provide curl example to insert data
