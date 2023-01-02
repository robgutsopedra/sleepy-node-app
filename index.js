const newrelic = require('newrelic')
const express = require('express');
const http = require('http');
const fs = require('fs');


const app = express();
const router = express.Router();


router.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});

router.get('/', (req, res) => {
  res.status(200).send();
});


router.get('/health', (req, res) => {
    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date()
    }
    console.log("Hola! Soy el log del healthcheck y vengo a molestar jejeje")
    console.log(data)
    res.status(200).send(data);
  });

router.get('/dummyError', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Dummyerror',
    date: new Date()
  }
  console.log(data)
  console.error("Hi! Im a dummy error, and this is a console.error")
  res.status(200).send(data);
});

router.get('/dummyInfo', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'DummyInfo',
    date: new Date()
  }
  console.log(data)
  console.info("Hi! Im a dummy info, and this is a console.info")
  res.status(200).send(data);
});

router.get('/takes1second', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  setTimeout(function() {
    console.log('1 (one) second has passed');
  }, 1000);
  const data = {
    uptime: process.uptime(),
    message: '1second',
    date: new Date()
  }
  console.log(data)
  res.status(200).send(data);
});

router.get('/takes5seconds', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  setTimeout(function() {
    console.log('5 (five) seconds have passed');
  }, 5000);
  const data = {
    uptime: process.uptime(),
    message: '5seconds',
    date: new Date()
  }
  console.log(data)
  res.status(200).send(data);
});

router.get('/takes20seconds', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 20000));
  const data = {
    uptime: process.uptime(),
    message: '20seconds',
    date: new Date()
  }
  console.info(data)
  res.status(200).send(data);
});

router.get('/takes0seconds', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: '0s',
    date: new Date()
  }
  console.log(data)
  res.status(200).send(data);
});

app.use('/api/v1', router);

console.log("Variables de entorno: ")
console.log(process.env)
console.log("La variable del ficherito: ")
console.log(process.env.ECS_CONTAINER_METADATA_FILE)
console.log("La variable del endpoint v3 es " + process.env.ECS_CONTAINER_METADATA_URI)
console.log("La variable del endpoint v4 es " + process.env.ECS_CONTAINER_METADATA_URI_V4)
if (process.env.ECS_CONTAINER_METADATA_URI){
  http.get(process.env.ECS_CONTAINER_METADATA_URI, res => {
    let data = [];
    console.log('Status Code for :' + process.env.ECS_CONTAINER_METADATA_URI + ' is ', res.statusCode);
  
    res.on('data', chunk => {
      data.push(chunk);
    });
  
    res.on('end', () => {
      console.log('Response ended: ');
      const container_metadata = JSON.parse(Buffer.concat(data).toString());
      console.log("Container metadata from " + process.env.ECS_CONTAINER_METADATA_URI)
      console.log(container_metadata)
    });
  }).on('error', err => {
    console.log('Error: ', err.message);
  });
}
if (process.env.ECS_CONTAINER_METADATA_URI_V4){
  http.get(process.env.ECS_CONTAINER_METADATA_URI_V4, res => {
    let data = [];
    console.log('Status Code for :' + process.env.ECS_CONTAINER_METADATA_URI_V4 + ' is ', res.statusCode);
  
    res.on('data', chunk => {
      data.push(chunk);
    });
  
    res.on('end', () => {
      console.log('Response ended: ');
      const container_metadata = JSON.parse(Buffer.concat(data).toString());
      console.log("Container metadata from " + process.env.ECS_CONTAINER_METADATA_URI_V4)
      console.log(container_metadata)
    });
  }).on('error', err => {
    console.log('Error: ', err.message);
  });
}

if (process.env.ECS_CONTAINER_METADATA_FILE){
  console.log("Contenido del ficherito: ")
  fs.readFile(process.env.ECS_CONTAINER_METADATA_FILE, bar)
}
function bar (err, data)
  {
  console.log(data.toString('utf8'));
  };
const server = http.createServer(app);
server.listen(3000);