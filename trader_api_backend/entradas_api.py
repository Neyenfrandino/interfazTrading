'''
    Entradas API para que el cordobés programador y trader 
    haga un mix de sus choco locuras...
'''

from flask import Flask, request, jsonify
from flask_cors import CORS 
from flask_sqlalchemy import SQLAlchemy
from flask_basicauth import BasicAuth
from datetime import datetime
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///trading_entries.db'
db = SQLAlchemy(app)

# Configure basic authentication
app.config['BASIC_AUTH_USERNAME'] = 'neyen'
app.config['BASIC_AUTH_PASSWORD'] = 'jet_blanca'
basic_auth = BasicAuth(app)

# Modelo de datos para las entradas de trading
class TradingEntry(db.Model):
    id_entrada = db.Column(db.Integer, primary_key=True)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)
    fecha_actualizacion = db.Column(db.DateTime, default=datetime.utcnow)
    trading_objetivo = db.Column(db.String)
    plan_trading_detalle = db.Column(db.String)
    entrada_es_compra = db.Column(db.Boolean, nullable=False)
    punto_entrada = db.Column(db.Float, nullable=False)
    stop_loss = db.Column(db.Float, nullable=False)
    take_profit = db.Column(db.Float)
    riesgo_beneficio = db.Column(db.Float, nullable=False)
    cantidad_lotaje = db.Column(db.Float, nullable=False)
    cantidad_inicial_usdt = db.Column(db.Float, nullable=False)
    entrada_ganada = db.Column(db.Boolean)
    nota_personal = db.Column(db.String)

# Validación para asegurarse de que los campos requeridos no estén vacíos
def validate_entry_data(data):
    required_fields = ['entrada_es_compra', 'punto_entrada', 'stop_loss', 'riesgo_beneficio', 'cantidad_lotaje', 'cantidad_inicial_usdt']
    for field in required_fields:
        if field not in data or data[field] is None:
            return False
    return True

# Ruta para obtener todas las entradas de trading
@app.route('/get', methods=['GET'])
@basic_auth.required
def get_all_entries():
    entries = TradingEntry.query.all()
    entry_list = []
    for entry in entries:
        entry_list.append({
            'id_entrada': entry.id_entrada,
            'fecha_creacion': entry.fecha_creacion,
            'fecha_actualizacion': entry.fecha_actualizacion,
            'trading_objetivo': entry.trading_objetivo,
            'plan_trading_detalle': entry.plan_trading_detalle,
            'entrada_es_compra': entry.entrada_es_compra,
            'punto_entrada': entry.punto_entrada,
            'stop_loss': entry.stop_loss,
            'take_profit': entry.take_profit,
            'riesgo_beneficio': entry.riesgo_beneficio,
            'cantidad_lotaje': entry.cantidad_lotaje,
            'cantidad_inicial_usdt': entry.cantidad_inicial_usdt,
            'entrada_ganada': entry.entrada_ganada,
            'nota_personal': entry.nota_personal
        })
    return jsonify(entry_list)

# Ruta para obtener una entrada de trading por ID
@app.route('/get/<int:id>', methods=['GET'])
@basic_auth.required
def get_entry_by_id(id):
    entry = TradingEntry.query.get(id)
    if entry is not None:
        return jsonify({
            'id_entrada': entry.id_entrada,
            'fecha_creacion': entry.fecha_creacion,
            'fecha_actualizacion': entry.fecha_actualizacion,
            'trading_objetivo': entry.trading_objetivo,
            'plan_trading_detalle': entry.plan_trading_detalle,
            'entrada_es_compra': entry.entrada_es_compra,
            'punto_entrada': entry.punto_entrada,
            'stop_loss': entry.stop_loss,
            'take_profit': entry.take_profit,
            'riesgo_beneficio': entry.riesgo_beneficio,
            'cantidad_lotaje': entry.cantidad_lotaje,
            'cantidad_inicial_usdt': entry.cantidad_inicial_usdt,
            'entrada_ganada': entry.entrada_ganada,
            'nota_personal': entry.nota_personal
        })
    return jsonify({'message': 'Entrada no encontrada'}, 404)

# Ruta para insertar una nueva entrada de trading
@app.route('/insert', methods=['POST'])
@basic_auth.required
def insert_entry():
    data = request.json

    try:
        if validate_entry_data(data):
            new_entry = TradingEntry(**data)
            db.session.add(new_entry)
            db.session.commit()
            return jsonify({'code': 201, 'message': 'Entrada insertada con éxito'})
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': 'Error al insertar la entrada debido a restricciones de la base de datos.'}, 400)
    except Exception as e:
        return jsonify({'message': f'Error care piola: {e=}'}, 400)

    return jsonify({'message': 'Los campos requeridos no pueden estar vacíos'}, 400)


# Ruta para actualizar una entrada de trading por ID
@app.route('/update/<int:id>', methods=['PUT'])
@basic_auth.required
def update_entry(id):
    data = request.json
    entry = TradingEntry.query.get(id)
    
    if entry is not None:
        try:
            for field in TradingEntry.__table__.columns.keys():
                if field in data:
                    setattr(entry, field, data[field])

            entry.fecha_actualizacion = datetime.utcnow()
            db.session.commit()
            return jsonify({'code': 200, 'message': 'Entrada actualizada con éxito'})
        except IntegrityError as e:
            db.session.rollback()
            return jsonify({'message': 'Error al actualizar la entrada debido a restricciones de la base de datos.'}, 400)
        except Exception as e:
            return jsonify({'message': f'Error care piola: {e=}'}, 400)
    
    return jsonify({'message': 'Entrada no encontrada'}, 404)


# Ruta para eliminar una entrada de trading por ID
@app.route('/delete/<int:id>', methods=['DELETE'])
@basic_auth.required
def delete_entry(id):
    entry = TradingEntry.query.get(id)
    
    if entry is not None:
        try:
            db.session.delete(entry)
            db.session.commit()
            return jsonify({'code': 200, 'message': 'Entrada eliminada con éxito'})
        except IntegrityError as e:
            db.session.rollback()
            return jsonify({'message': 'Error al eliminar la entrada debido a restricciones de la base de datos.'}, 400)

    return jsonify({'message': 'Entrada no encontrada'}, 404)


def create_tables():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    create_tables()
    app.run(debug=True)
