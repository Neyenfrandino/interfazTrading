'''
    Entradas API para que el cordobés programador y trader 
    haga un mix de sus choco locuras...
'''

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime
from functools import wraps

app = Flask(__name__)
CORS(app)

# Datos de autenticación
username = "neyen"
password = "jet_blanca"

# Decorador de autenticación
def require_auth(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        auth = request.authorization
        if not auth or auth.username != username or auth.password != password:
            return jsonify({"codigo": 401, "mensaje": "Autenticación fallida"}), 401
        return func(*args, **kwargs)
    return wrapper

# Archivo de datos
data_file = "entradas.json"

# Cargar datos desde el archivo JSON
def cargar_datos():
    try:
        with open(data_file, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

# Guardar datos en el archivo JSON
def guardar_datos(entries):
    with open(data_file, 'w') as f:
        json.dump(entries, f, indent=2)

# Validar que los datos siguen el contrato de datos
def validar_datos(data):
    campos_obligatorios = ["objetivo", "plan_trading", "comienzo_nuevo_plan", "entrada", "salida_perdida", "salida_ganacia", "riesgo_beneficio", "cantidad_lotaje", "cantidad_inicial_usdt", "resultado", "nota_personal"]
    for campo in campos_obligatorios:
        if campo not in data:
            return False
    try:
        datetime.strptime(data["comienzo_nuevo_plan"], "%Y-%m-%d")
        float(data["entrada"])
        float(data["salida_perdida"])
        float(data["salida_ganacia"])
        float(data["riesgo_beneficio"])
        float(data["cantidad_lotaje"])
        float(data["cantidad_inicial_usdt"])
    except (KeyError, ValueError):
        return False
    return True

# Crear una entrada
@app.route('/insert', methods=['POST'])
@require_auth
def insert_entry():
    data = request.get_json()
    if not validar_datos(data):
        return jsonify({"codigo": 400, "mensaje": "Datos no válidos"}), 400
    
    data["fecha_creacion"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    data["fecha_actualizacion"] = data["fecha_creacion"]
    
    entries = cargar_datos()
    if len(entries) > 0:
        data["id_entrada"] = max(entry["id_entrada"] for entry in entries) + 1
    else:
        data["id_entrada"] = 1  # Asignar un ID único si es la primera entrada
    
    # Reorganizar el objeto para que los campos de auditoría estén al principio
    reordered_data = {
        "id_entrada": data["id_entrada"],
        "fecha_creacion": data["fecha_creacion"],
        "fecha_actualizacion": data["fecha_actualizacion"],
        "objetivo": data["objetivo"],
        "plan_trading": data["plan_trading"],
        "comienzo_nuevo_plan": data["comienzo_nuevo_plan"],
        "entrada": data["entrada"],
        "salida_perdida": data["salida_perdida"],
        "salida_ganacia": data["salida_ganacia"],
        "riesgo_beneficio": data["riesgo_beneficio"],
        "cantidad_lotaje": data["cantidad_lotaje"],
        "cantidad_inicial_usdt": data["cantidad_inicial_usdt"],
        "resultado": data["resultado"],
        "nota_personal": data["nota_personal"]
    }
    
    entries.insert(0, reordered_data)  # Agregar la nueva entrada al principio de la lista
    guardar_datos(entries)
    
    return jsonify({"codigo": 201, "mensaje": "Entrada creada"}), 201

# Leer todas las entradas
@app.route('/get', methods=['GET'])
@require_auth
def get_entries():
    entries = cargar_datos()
    return jsonify(entries)

# Actualizar una entrada
@app.route('/update', methods=['PUT'])
@require_auth
def update_entry():
    data = request.get_json()
    if not validar_datos(data):
        return jsonify({"codigo": 400, "mensaje": "Datos no válidos"}), 400
    
    entry_id = data.get("id_entrada")
    if entry_id is not None:
        entries = cargar_datos()
        for entry in entries:
            if entry["id_entrada"] == entry_id:
                entry.update(data)
                entry["fecha_actualizacion"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                guardar_datos(entries)
                return jsonify({"codigo": 200, "mensaje": "Entrada actualizada"}), 200

    return jsonify({"codigo": 404, "mensaje": "Entrada no encontrada"}), 404

# Eliminar una entrada
@app.route('/delete', methods=['DELETE'])
@require_auth
def delete_entry():
    data = request.get_json()
    entry_id = data.get("id_entrada")
    if entry_id is not None:
        entries = cargar_datos()
        entries = [entry for entry in entries if entry["id_entrada"] != entry_id]
        guardar_datos(entries)
        return jsonify({"codigo": 200, "mensaje": "Entrada eliminada"}), 200

if __name__ == '__main__':
    app.run(debug=True)
