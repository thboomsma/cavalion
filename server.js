/* ###################################################
### MYSQL REST API GENERATOR:
### SERVER CODE FOR FULL AUTOMATED WORKFLOW 
### WITH ALL TESTED VARIATIONS/ENVIRONMENTS ON MYSQL-> MODELPARSER -> RESTAPI/SWAGGER
### 0. Setup servers
### 1. connection to back-end
### 2. Parse MySQL Model and generate models for entities in /models folder
### 3. Instantiate Sequelize models from /models folder OR swagger document
### 4. (optionally) inject entity reations (manual work ... needs to be automated)
### 5. Generate Swagger documents from SQLIZE models
### 6. Instatiate RestAPI
  ####################################################*/

////////// 0. Node.JS INITIALIZATION //////////////
var express = require('express'),
    bodyParser = require('body-parser'),
    Sequelize = require('sequelize'), // use with MySQL drivers
// ,Sequelize = require('sequelize-mysql').sequelize //use with specialized Sequelize drivers (better experience)
// ,mysql = require('sequelize-mysql').mysql
    SequelizeImport = require('sequelize-import'),
    sqlizr = require('sqlizr'),
// , http = require('http')
    restful = require('sequelize-restful'),
//,swaggerSequelize = require('swagger-sequelize') // Generates Sequelize from Swagger Defs
    Swaggerize = require('swaggerize'), // Generates Swagger Spec from Sequelize models
//,swaggerUi = require('swaggerize-ui') // generates the SwaggerUI from docs file
    path = require('path'),
    fs = require('fs'), //fs still required??
    shell = require('shelljs/global'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/////////// FOR LOCAL DEPLOYMENT////////////////////////
// var host = process.env.IP || '127.0.0.1';
// var port = process.env.PORT || 3000;
/////////// For OpenShift Deployment ///////////////////
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var dbHost= process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1';
var dbHostPort=process.env.OPENSHIFT_MYSQL_DB_PORT || 3306;
var dbUser = process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root';
var dbPass = process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'banku';
var dbSchema = 'purchasing';
var modelsFolder =__dirname + '/models';

// HTTP / SOCKET / MQTT servers
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
////////////////////////////////////////////////

// HOSTED PUBLIC/SWAG FOLDERS
var staticSite = dirname + '/public';
// API Docs
var apiDocsUI = dirname + '/swag';

//////// 1. DATABASE HOOKUP / ORM ///////////////
// make MySQL case insensitive
// go to /var/lib/openshift/##########/mysql/conf/my.cnf -> lower_case_table_names = 2
// check here http://dev.mysql.com/doc/refman/5.0/en/identifier-case-sensitivity.html
var sequelize = new Sequelize(dbSchema, dbUser,dbPass, {
dialect: 'mysql',
host: dbHost,
port: dbHostPort,
//logging: console.log,
define: {
timestamps: false
}
});

/////////// 2. IMPORT/GENERATE MODELS DEFINITIONS /////////////////
///////////////////////////////////////////////
// generate Sequelize models from the Swagger Doc
///////////////////////////////////////////////
// var swaggerSpec = JSON.parse(fs.readFileSync('<your swagger.sjon>', 'utf-8'));
// var MyModel = sequelize.define('MyModel', swaggerSequelize.generate(swaggerSpec.definitions.MyModel));
// // ... do stuff with MyModel e.g. to setup your tables:
// MyModel.sync({force: true})

/////////// AUTO GENERATE MODELS FROM DB
console.log("Parsing DB Schema" + dbHost + "/" + dbSchema + " -> SeQuelize " + modelsFolder);
// ### TO DO: RUN IN SHELL (Model Generator https://github.com/sequelize/sequelize-auto )
// install tools first > npm install -g sequelize-auto mysql tedious(MSSQL)
// DONT USE sequelize-auto -o "./models" -d sequelize_auto_test -h localhost -u my_username -p 3306 -x my_password -e mysql

// Switched off
// if (exec('sequelize-auto -o "'+ modelsFolder +'" -d '+ dbSchema + ' -h ' + dbHost + ' -u '+ dbUser +' -p 3306 -x '+ dbPass +' -e mysql').code !== 0) {
// echo('Error: Model Parsing failed');
// exit(1);
// };

/////////// 3. IMPORT GENERATED MODELS (WAIT)
// // install > npm install sequelize-import --save
console.log("Importing models from: " + modelsFolder );
var models = SequelizeImport(modelsFolder, sequelize, {
exclude: ['index.js', 'swagger.json']
});

var loader = require('sequelize-model-loader');
var models = loader.load({
sequelize: sequelize,
path: modelsFolder
});

//var models = sqlizr(sequelize, modelsFolder + '/*.js');

//db.User.find('mikefrey')
//console.log(models);
console.log(models.emloyees.list);

///////////////////////////////////////////////
// generate the Swagger Doc from Sequelize object
// write to Swagger-GUI folder
//
///////////////////////////////////////////////
console.log("Generate Swagger definitions to: " + apiDocsUI);
//var spec = Swaggerize.generate(db,{});
var spec = Swaggerize.generate(models,
{
// generate spec in yaml instead of json.
gen_yaml: false,
// swagger boiler-plate configuration
swagger: {
info: {
'title': 'REST api',
'version': '1.0.0',
'description': 'Autogenerated API-Docs based on parsed DB model',
'termsOfService': 'MIT',
'contact': {
'name': '',
'url': 'https://www.cavalion.com',
'email': 'info@cavalion.com'
},
'license': {
'name': 'Cavalion',
'url': 'http://www.cavalion.com'
}
},
version: '1.0.0',
host: '127.0.0.1',
basePath: '/api',
schemes: [ 'http', 'https', 'ws', 'wss'],
consumes: [
'application/json'
],
produces: [
'application/json'
]
}
});
//console.log(spec);
fs.writeFile('./swag/swagger.json', spec , 'utf-8'); //JSON.stringify(spec, null, 2)

///////////////////////////////////////////////
// Host the Swagger UI based on docs.json file
// SERVER HOSTED VERSION
/////////////// LIB BASED SWAGGER (DISABLE FOR FILE BASED) ////////////////////////
// app.use('/api-docs', function (req, res) {
// res.json(require('swagger.json'));
// });

// app.use('/docs', swaggerUi({
// docs: '/api-docs' // from the express route above.
// }));

///////////////////////////////////////////////

/////////// API Middlewares //////////////////
var Restifizer = require('restifizer');
var SequelizeDataSource = require('restifizer-sequelize-ds');
var Items = models.items;

var UserController = Restifizer.Controller.extend({
dataSource: new SequelizeDataSource(Items),
path: '/api/items'
});

// RestFul API
// ### NEED REST API!!!
//app.use(restful(sequelize));
//app.use(restful(sequelize, {allowed: models, extendedMode: false}));

// oData API

// ORM version (not working properly)
app.use('/orm', require('express-rest-orm')(models));

console.log("Started API middlewares");
////////////// ROUTES & HTML INFRA //////////////////
// ENABLE CORS for Express (so swagger.io and external sites can use it remotely .. SECURE IT LATER!!)
// app.use(function(req, res, next) {
// res.header("Access-Control-Allow-Origin", "*");
// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// next();
// });
// Statis site route (PUBLIC FOLDER HOSTED)
app.use('/', express.static(staticSite));

// API docs route (PUBLIC FOLDER HOSTED)
app.use('/swag', express.static(apiDocsUI));

// Sync all models that aren't already in the database
// Synchronize our models and start the application
// update the tables form the models
// sequelize
// //.sync({force: false})
// .then(start);
// !!Sync fails on Openshift (not locally)

//function start() {
app.listen(port, ip, function() {
// server.listen(port, function() {
console.log('Running at http://' + ip + ':' + port);
});
//}
