let helper = {}

helper.parseJsonToObjet = function (data) {
    let obj = {};
    
    try {
        obj = JSON.parse(data);
    } catch(e) {
        console.log('Json to Object parse failed', e);
    }

    return obj;
}

module.exports = helper;