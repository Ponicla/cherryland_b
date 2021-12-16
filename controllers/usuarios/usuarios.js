var mssql = require('mssql');

const get_usuarios = async(req, res, next) => {
    try{
        var request = new mssql.Request();
            const response = await request.query(`SELECT * FROM usuario`);
            var data = {};
            data = response.recordset;
            res.send(data);
    }catch{
        res.json(null);
        controla_error('Error en la funcion get_usuarios');
    }
};

const controla_error = (mensaje) => {
    var f = new Date();
    const options = { dateStyle: 'short', timeStyle: 'short'};
    let fecha = f.toLocaleString("es-ES", options);
    throw ('ERROR: '+ mensaje + ' || FECHA: ' + fecha);
};

module.exports = { get_usuarios }