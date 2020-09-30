const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const request = require('koa-http-request');
const app = new Koa();

const converter = require('./routes/converter');

app.use(cors());
app.use(request({ dataType: 'json' }));
app.use(bodyParser());
app.use(converter.routes());

app.listen(3000, () => {
    console.log('Server running at port 3000');
});