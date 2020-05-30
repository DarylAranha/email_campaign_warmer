const dataHelper = require('./lib/dataHelper');
const emailHelper = require('./lib/emailHelper');

let app = {}

// dummy email address
const emails = {
    '': ''
}

app.init = function () {

    let userData = {};
    userData['userName'] = 'daryla';
    userData['password'] = 'admin'; 

    // let emailData = {}
    // for(let email in emails) {
    //     emailData[email] = emails[email];
    // }
    // userData['emailData'] = emailData;

    // data.create('users', 'user_data', userData, function(status, err) {
    //     if (!status) {
    //         console.log('File created');
    //     } else {
    //         console.log(err);
    //     }
    // });

    // dataHelper.read('users', 'user_data', function(status, data) {
    //     console.log(data);
    // });

    emailHelper.connect();
}

app.init();