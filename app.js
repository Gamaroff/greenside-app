var express = require('express');
var viewRoutes = require('./routes/viewRoutes');
var apiRoutes = require('./routes/apiRoutes');
var http = require('http');
var passport = require('passport');
var redisConfig = require('config').RedisWeb;
var appConfig = require('config').App;
var RedisStore = require('connect-redis')(express);
var viewUtil = require('./app/viewUtil');
var systemDB = require('./domain/system/systemDB');

var auth = require('./app/auth');

var app = express();

// Configuration
app.configure(function () {
    app.set('port', process.env.PORT || 3005);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());

    app.sessionStore = new RedisStore({port : redisConfig.port, host : redisConfig.host});
    app.use(express.session({
        secret : "cookie",
        store  : app.sessionStore,
        cookie : {
            maxAge : 14400000
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({
        dumpExceptions : true,
        showStack      : true
    }));
});

app.configure('test', function () {
    app.use(express.errorHandler({
        dumpExceptions : true,
        showStack      : true
    }));
});

app.configure('production', function () {
    app.use(express.errorHandler({
        dumpExceptions : false,
        showStack      : false
    }));
});

app.configure('development', function () {
    app.use(express.errorHandler({
        dumpExceptions : true,
        showStack      : true
    }));
});

var server = http.createServer(app);

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

//Initialisation
systemDB.init();

apiRoutes.init(app);
viewRoutes.init(app);

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
    viewUtil.renderView(req, res, 'home/index', appConfig.name);
});
