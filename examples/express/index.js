/**
 * Module dependencies.
 */
var express         = require('../../node_modules/express/index'); // require('express');
var proxyMiddleware = require('../../index');                      // require('http-proxy-middleware');

// configure proxy middleware
// context: '/' will proxy all requests
//     use: '/api' to proxy request when path starts with '/api'
var proxy = proxyMiddleware('/v1', {
                target: 'https://api.instagram.com',
                changeOrigin: true,   // for vhosted sites, changes host header to match to target's host
                logLevel: 'debug'//
            });

var app = express();
app.use(proxy);                      // add the proxy to express

app.listen(9001);

console.log('listening on port 9001');
console.log('try:');
console.log('  http://localhost:3000/v1');

