const newrelic = require('newrelic')
const express = require('express');
const http = require('http');

const app = express();
const router = express.Router();


router.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
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

const server = http.createServer(app);
server.listen(3000);