const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  produces: [
    "application/json"
],
  host: 'localhost:8080',
  basePath: '/api',
  securityDefinitions: {
    bearerAuth: {
      name: 'x-auth-token',
      scheme: 'bearer',
      in: 'header',
    },
  },
  
    
  security: [ { bearerAuth: [] } ],
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */


swaggerAutogen(outputFile,routes,doc).then(()=>{
    require('./server.js');
})