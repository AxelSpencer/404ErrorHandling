// Set up express
const express = require('express');
const app = express();
// Include the file system functions
const fs = require('fs');
// Include and set the hbs (handlebars) view engine
const hbs = require('hbs');
app.set('view engine', 'hbs');
// Register the location of partial snippets for the view engine
hbs.registerPartials(__dirname + '/views/partials', (err) => {});
// Uses extended url capability
app.use(express.urlencoded({ extended: true }));
// Add the static asset folder
app.use(express.static(`${__dirname}/public`));
// Allow express json functionality
app.use(express.json());

// Path to the data folder
const data = './data';

// Route to the root directory. Displays "Hello World" in the browser
app.get('/', (req, res) => {
  res.send('<title> W1 </title><h2>Welcome to my first Node application</h2>');
});

// Route used by form. Displays text input in the browser
app.post('/junk', (req, res) => {
  res.send(req.body.name);
});

// Route with parameters. Reads JSON file and displays the selected id from the class.json file
/*app.get('/:file/:id', (req, res) => {
    fs.readFile(
        `${data}/${req.params.file}.json`,
        'utf8',
        (err, data) => {
            if (err) {
                throw err;
            }
            const id = req.params.id;
            res.send({ "name": JSON.parse(data)[id] });
        })
})*/

// Route to /class. Reads JSON file and displays data in the browser
app.get('/class', (req, res) => {
  fs.readFile(
    `${data}/class.json`,
    'utf8',
    (err, data) => {
      if (err) {
        throw err;
      }
      res.send(JSON.parse(data));
    }
  );
});

// Route with parameters. Displays first and last name in browser
app.get('/:last/:first', (req, res) => {
  res.render('farts', { first: req.params.first, last: req.params.last, rules: 'rules' });
});

// Missing route (404 error) handling
app.use((req, res) => {
  res.status(404).send(`
    <html>
      <head>
        <title>Error</title>
      </head>
      <body>
        <a href="/">HOME</a>
        <h2>404 Error</h2>
        <p>Page not found.</p>
      </body>
    </html>
  `);
});

// Runs the server when npm app.js is run in the terminal

let port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Server Running at localhost:${port}`);
});