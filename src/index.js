const express = require('express');
const app = express();
var mssql = require("mssql");


/* Variables de conexion base de datos */
var config = {
    user: 'sa',
    password: 'abc12345',
    server: 'JPONICHAN', 
    port: 1433,
    database: 'cherryland',
    options:{
        enableArithAbort:true,
        trustServerCertificate: true
    },
} 

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Middleware
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

// routes
app.use(require('../routes/index'));

// starting the server
var connection = mssql.connect(config, function (err, res ) {
    if(err){
		console.log(err);
        throw err;
    }else {
		var f = new Date();
		var fecha = f.getDate() + "-"+ f.getMonth()+ "-" +f.getFullYear();
		var hora = f.getHours()+':'+f.getMinutes() ;
		app.listen(app.get('port'), function(){
			console.log('Api rest cherryland corriendo' + fecha + ' a las '+ hora);
		});
	}
});
