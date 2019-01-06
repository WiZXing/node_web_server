const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

// partials
hbs.registerPartials(__dirname + '/views/partials');

// views templates to make it dynamic
app.set('view engine','hbs');




// middleware
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err)
        {
            console.log('Unable to append to server.log');
        }
    });
    next();
});
// maintain
// app.use((req,res,next) => {
//     res.render('maintenance.hbs',{
//         pageTitle: 'Error Page',
//         curYear: new Date().getFullYear(),
//         errMessage: 'Currently not available!'
//     });
// });

// static
app.use(express.static(__dirname + '/public'));
// run a function
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
    // return "test";
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});



// register a handler
app.get('/',(req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'XWZ',
    //     likes:[
    //         'A',
    //         'B'
    //     ]
    // });
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        curYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to my web service!'
    });

});
//template
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        curYear: new Date().getFullYear()
    });
});

app.get('/bad',(req,res) => {
    res.send({
        error: '404',
        message:[
            'bad',
            'good'
        ]
    });
});

//bind the app to a port
app.listen(port, () =>{
    console.log(`Server is up on port ${port}`);
});

//handlebars hbs
// partial to reuse template
// hbs helper
// middleware