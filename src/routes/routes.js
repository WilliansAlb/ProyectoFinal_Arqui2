const { Router } = require('express');
const mysql = require('mysql');
const router = Router();

var db_config = {
	host: 'buhv2nxcrazbcbhexwra-mysql.services.clever-cloud.com',
	user: 'uu4r4dutxx92o6su',
	password: 'rL6xundnlmNuUGUkdYBZ',
	database: 'buhv2nxcrazbcbhexwra'
};

router.get('/', (peticion, respuesta) => {
	respuesta.render('index', {});
});

router.post('/crear_area', (peticion, respuesta) => {
	const nombre = peticion.body.nombre;
	const aforo_maximo = peticion.body.aforo_maximo;
	const aforo_actual = peticion.body.aforo_actual;
	const turno_actual = peticion.body.turno_actual;
	let sql = `INSERT INTO area VALUES(?,?,?,?);`;
	let data = [nombre, aforo_maximo, aforo_actual, turno_actual, usuario];
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
	});
	respuesta.json({ "estado": "correcto" });
});

router.get('/turnos', (peticion, respuesta) => {
	const sql = 'SELECT * from area';
	connection.query(sql, (error0, result0) => {
		if (error0) throw error0;
		respuesta.json(result0);
	})
});

router.post('/nuevo_turno', (peticion, respuesta) => {
	const values = ["CARDIOLOGIA","ODONTOLOGIA","PEDIATRIA","LABORATORIO","FARMACIA"];
	const value = peticion.body.value;
	let sql = `UPDATE area SET aforo_actual = aforo_actual + 1, turno_total = turno_total + 1 WHERE nombre = ?`;
	let data = [values[value]];
	connection.query(sql, data, (error0, result0) => {
		if (error0) throw error0;
	})
	respuesta.json({ "estado": "correcto" });
});

router.post('/siguiente', (peticion, respuesta) => {
	const values = ["CARDIOLOGIA","ODONTOLOGIA","PEDIATRIA","LABORATORIO","FARMACIA"];
	const value = peticion.body.value;
	let sql = `UPDATE area SET aforo_actual = aforo_actual - 1, turno_actual = turno_actual + 1 WHERE nombre = ?`;
	let data = [values[value]];
	connection.query(sql, data, (error0, result0) => {
		if (error0) throw error0;
	})
	respuesta.json({ "estado": "correcto" });
});

router.get("*", (peticion, respuesta) => {
	respuesta.render('index', {});
})


function handleDisconnect() {
	connection = mysql.createConnection(db_config); // Recreate the connection, since
	// the old one cannot be reused.

	connection.connect(function (err) {              // The server is either down
		if (err) {                                     // or restarting (takes a while sometimes).
			console.log('error when connecting to db:', err);
			setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
		} else { console.log("Conectada DB") }                                     // to avoid a hot loop, and to allow our node script to
	});                                     // process asynchronous requests in the meantime.
	// If you're also serving http, display a 503 error.
	connection.on('error', function (err) {
		console.log('db error', err);
		if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
			handleDisconnect();                         // lost due to either server restart, or a
		} else {                                      // connnection idle timeout (the wait_timeout
			throw err;                                  // server variable configures this)
		}
	});
}

handleDisconnect();

module.exports = router;