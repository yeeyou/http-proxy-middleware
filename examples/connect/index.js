/**
 * Module dependencies.
 */
var http            = require('http');                             // require('http');
var connect         = require('../../node_modules/connect/index'); // require('connect');
var proxyMiddleware = require('../../index');                      // require('http-proxy-middleware');

// configure proxy middleware
// context: '/' will proxy all requests
//     use: '/api' to proxy request when path starts with '/api'
var proxy = proxyMiddleware(['/v1','/oauth'], {//['/api', '/ajax', '/someotherpath'] multi match 可用于auth
                target: 'https://api.instagram.com',
                changeOrigin: true,   // for vhosted sites, changes host header to match to target's host
                logLevel: 'debug'   //
            });

var app = connect();
app.use(proxy);                      // add the proxy to connect

http.createServer(app).listen(6060);

console.log('listening on port 6060');
console.log('try:');
console.log('  http://localhost:3000/api');
