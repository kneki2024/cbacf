const express = require('express');
const bodyParser = require('body-parser');
const getRegionsRouter = require('./src/get_regions');
const value_route = require('./src/value_route');
const gdp_route = require('./src/gdp_route');
const cal_route = require('./src/cal_route')
const del_val_route = require('./src/del_val_route')
const add_var_route = require('./src/add_var_route')
const login_route = require('./src/login_route')
const description_route = require('./src/description_route')
const keep_alive_conn = require('./src/keep_alive_conn')



const app = express();
const port = 3001;

app.use(express.static('./public'));

app.set('view engine', 'pug');
app.set('views', './views');


// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use your regions router
app.use(getRegionsRouter);

app.use(gdp_route);

app.use(value_route);

app.use(cal_route);

app.use(del_val_route);

app.use(add_var_route);

app.use(login_route);

app.use(description_route);

keep_alive_conn();

app.get('/', (req, res) => {
  // Render the index.pug file from the views directory
  res.render('index');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});