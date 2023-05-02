const config = require('../../config/config');
const help = require('../help/help');
const {getRandomInt,max} = require ('../../Juegos/Dices');

module.exports = async (message, client) => {
    if (message.body.startsWith(config.SUFFIX + 'gd -p')) {
        dado = getRandomInt(max)+1;
        console.log('DADOS',message.body,dado);
        if(dado == 1){
            client.sendMessage(message.from, '1️⃣');
        }
        if(dado == 2){
            client.sendMessage(message.from,'2️⃣');
        }
        if(dado == 3){
            client.sendMessage(message.from,'3️⃣');
        }
        if(dado == 4){
            client.sendMessage(message.from,'4️⃣');
        }
        if(dado == 5){
            client.sendMessage(message.from,'5️⃣');
        }
        if(dado == 6){
            client.sendMessage(message.from,'6️⃣');
        }
    }
    else{
        if (message.body.startsWith(config.SUFFIX + 'gd')){
        client.sendMessage(message.from,help.gd)};
    }
}