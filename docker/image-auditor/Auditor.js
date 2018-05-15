var musicians = [];

/* --------------------- TCP SERVER --------------------------------------------*/
var net = require('net');
var servertcp = net.createServer();
servertcp.on('connection', function (socket) {
    clearMusicians();
    socket.write(JSON.stringify(musicians,null,'\t') + "\n");
    socket.end();
});

servertcp.listen(2205);

function clearMusicians() {
    var date = new Date().getTime();
    for (var i = 0; i < musicians.length; i++) {
        if ((Date.parse(musicians[i].activeSince)) < date - 5000) {
            console.log('The musician has left :' + JSON.stringify(musicians[i]));
            musicians.splice(i, 1);
        }
    }
}
/* -----------------------------------------------------------------------------*/

/* --------------------- UDP SERVER --------------------------------------------*/

var dgram = require('dgram');
var serverudp = dgram.createSocket('udp4');

serverudp.on('message', function (musician, source) {
    var m = JSON.parse(musician);
    for (var i = 0; i < musicians.length; i++) {
        if (m.uuid == musicians[i].uuid) {
            musicians[i].activeSince = m.activeSince; // refresh the time remaining
            return;
        }
    }
    console.log("New musician has arrived: " + musician);
    musicians.push(m);

});

serverudp.bind(12342, function () {
    console.log('An auditor join the  group ');
    serverudp.addMembership('239.255.22.5');

});
/* /* -----------------------------------------------------------------------------*/