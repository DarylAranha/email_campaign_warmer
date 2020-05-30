var Imap = require('imap'),
    inspect = require('util').inspect;

var imap = new Imap({
    user: 'email',
    password: 'pass',
    host: 'imap.gmail.com',
    port: 993,
    tls: true
});

function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {
    openInbox(function(err, box) {
        if (err) throw err;
        
        // broken needs fixing
        imap.search(['FROM', ['']], function(err, results) {
            if (err) throw err;

            var f = imap.fetch(results, { bodies: 'TEXT' });

            f.on('message', function(msg, seqno) {
                console.log('Message #%d', seqno);
                var prefix = '(#' + seqno + ') ';
                
                msg.on('body', function(stream, info) {
                    stream.setEncoding('UTF8');
                    stream.on('data', function(chunck) {

                        var text = chunck.replace(/<\/?[^>]+>/ig, " ");
                        console.log(text);
                    });
                    // console.log(prefix + 'Body');
                    // stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
                });
               
                msg.once('attributes', function(attrs) {
                    // console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                });
                
                msg.once('end', function() {
                    // console.log(prefix + 'Finished');
                });
            });

            f.once('error', function(err) {
                console.log('Fetch error: ' + err);
            });

            f.once('end', function() {
                console.log('Done fetching all messages!');
                imap.end();
            });
        });
    });
});

imap.once('error', function(err) {
    console.log(err);
});

imap.once('end', function() {
    console.log('Connection ended');
});

module.exports = imap;