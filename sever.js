const http = require('http');
const fs = require("fs");
const qs = require("qs");

const server = http.createServer(function(req, res) {
    if (req.method === 'GET') {
        fs.readFile('./view/todo.html', function(err, dataTodoHTML) {
            if (err) {
                throw new Error;
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(dataTodoHTML);
                return res.end();
            }
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const wordInfo = qs.parse(data);
            fs.readFile('./view/display.html', 'utf-8', function(err, dataTodoHTML) {
                if (err) {
                    throw new Error;
                } else {
                    dataTodoHTML = dataTodoHTML.replace('{name1}', wordInfo.name1);
                    dataTodoHTML = dataTodoHTML.replace('{Time1}', wordInfo.time1);
                    dataTodoHTML = dataTodoHTML.replace('{status1}', wordInfo.status1);
                    dataTodoHTML = dataTodoHTML.replace('{name2}', wordInfo.name2);
                    dataTodoHTML = dataTodoHTML.replace('{Time2}', wordInfo.time2);
                    dataTodoHTML = dataTodoHTML.replace('{status2}', wordInfo.status2);
                    dataTodoHTML = dataTodoHTML.replace('{name3}', wordInfo.name3);
                    dataTodoHTML = dataTodoHTML.replace('{Time3}', wordInfo.time3);
                    dataTodoHTML = dataTodoHTML.replace('{status3}', wordInfo.status3);
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(dataTodoHTML);
                    return res.end();
                }
            })
        })
        req.on('error', () => {
            console.log('error')
        })
    }
})

server.listen(8000, "localhost", function() {
    console.log("server running at http://localhost:8000")
})