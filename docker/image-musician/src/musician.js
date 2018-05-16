var dgram = require('dgram');
var uuid = require('uuid');

var clientudp = dgram.createSocket('udp4');

function Musician(instrument) {
    this.instrument = instrument;

    var data = {
        uuid: uuid(),
        instrument: instrument
    }

    Musician.prototype.update = function () {
        data.activeSince = new Date().toISOString();
        var payload = JSON.stringify(data,null,'\t');

        message = new Buffer(payload);
        clientudp.send(message, 0, message.length, 12345, '239.255.22.5', function (err, bytes) {
            console.log("Sending payload: " + payload);
        });
    }
    setInterval(this.update.bind(this), 1000);
}

var instrument = process.argv[2];

var m1 = new Musician(instrument);