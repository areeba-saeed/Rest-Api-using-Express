const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
// exporting members.js
const logger = require('./middleware/logger');
const { title } = require('process');
const members = require('./Members');


const app = express();

//initialize middleware
// app.use(logger);

//Handlebars middleware


app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

//to send data from postman, we need to create body parser middleware
// handle json
app.use(express.json());
//handle form submisiion
app.use(express.urlencoded({ extented: false }));


//homepage route
app.get('/', (req, res) => res.render(
    'index',
    { title: 'Member App' ,
    members
},
    
));

// Set static folder
// use method is use to show middleware
app.use(express.static(path.join(__dirname, `public`)));
// req is request and res is response 
// app.get('/', function(req,res){
// app.get('/', (req, res) => {
//   // res.send send something to the browser
//     // for simple send 
//     // res.send(`<h1>Hello world!!!</h1>`);

//     // now for path
//     res.sendFile(path.join(__dirname, `public`, 'index.html'));
// });

// since we donot want to give routes to all the files seperately everytime, we will use a different approach then app.get function line

//Members API routes/ Router folder
app.use('/api/members', require('./routes/api/members'));


// Process.env means want to look at environment variable
// either port 5000 or whatever avaiable
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started ${PORT}`));