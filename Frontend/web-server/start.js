const express = require('express');
const request = require('request');
const http = require('http')
const { engine } = require( 'express-handlebars');
const app = express()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'))

app.get('/', function (req, res) {
    const userAgent = req.get('User-Agent');

    if (userAgent.includes('Kobo')) {
        res.redirect('kobo')
    } else {
        res.redirect('http://192.168.68.109:4201');
    }
})
app.get('/kobo', async function (req, res) {
    // const page = req.query.page ?? 1;

    request({
        method: 'GET',
        uri: 'http://localhost:5153/api/books',
    }, function (error, response, body){
        if(!error && response.statusCode === 200){
            const json = JSON.parse(body);
            console.log(json.data)
            res.render('index', {books: json.data});
            // res.json(body);
        }
    })
})


app.get('/:file_name', async function (req, res) {
    const bookId = req.query.id;
    const fileName = req.params['file_name'];
    console.log(fileName)
    const url = 'http://localhost:5153/api/books/' + bookId + '/download'

    const externalReq = http.request(url, function(externalRes) {
        res.setHeader("content-disposition", "attachment; filename=" + fileName);
        res.setHeader("content-type", "application/epub+zip");
        externalRes.pipe(res);
    });
    externalReq.end();
})

app.listen(3000)

