var Imap = require('imap'),
    inspect = require('util').inspect;

var imap = null;

var helper = {};

// set the email configuration
helper.init =  function (emailConfig, searchFilter) {
    imap = new Imap(emailConfig);
    helper.searchFilter = searchFilter;
    helper.initialize();
    imap.connect();
}

helper.initialize = function () {
    if (!imap) throw 'imap failed to initialize';

    imap.once('ready', function() {
        helper.openInbox(function(err, box) {
            if (err) throw err;

            imap.search([helper.searchFilter], function(err, results) {
                if (err) throw err;

                console.log('no email found');
                if (results.length > 0) {
                    // mark the fetched emails as read
                    imap.setFlags(results, ['\\Seen'], function(err) {
                        if (err) {
                            console.log(JSON.stringify(err, null, 2));
                        }
                    });
                }
                
                imap.end();
            });
        });
    });
    
    imap.once('error', function(err) {
        console.log(err);
    });
    
    imap.once('end', function() {
        console.log('Connection ended');
    });
}

// open the inbox
helper.openInbox = function (cb) {
    imap.openBox('INBOX', false, cb);
}

module.exports = helper;