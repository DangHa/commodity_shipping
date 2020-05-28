const bodyParser = require('body-parser');
const express = require('express');

const config = require('./config');

const app = express();

// View
app.use('/', express.static(`${__dirname}/../static`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Router
app.use('/users', require('./routes/userRoute')); // this command must behind two commands which use to setting bodyPaser
app.use('/drivers', require('./routes/driverRoute'));
app.use('/shipments', require('./routes/shipmentRoute'));
app.use('/statistic', require('./routes/statistic'));


const port = config.getPort();
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});