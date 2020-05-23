const bodyParser = require('body-parser');
const express = require('express');

const config = require('./config');

const app = express();

// View
app.use('/', express.static(`${__dirname}/../static`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Router
app.use('/user', require('./routes/userRoute')); // this command must behind two commands which use to setting bodyPaser
app.use('/driver', require('./routes/driverRoute'))
app.use('/package', require('./routes/packageRoute'))
app.use('/shipments', require('./routes/shipmentRoute'))
app.use('/bot', require('./routes/BOTRoute'))
app.use('/direction', require('./routes/suggested_direction'))

const port = config.getPort();
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});