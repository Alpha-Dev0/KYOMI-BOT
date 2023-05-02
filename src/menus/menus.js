const config = require('../../config/config');
const menus = require('../menus/msgs/menus.json');

module.exports = async (message, client) => {
        //MENUS
    if (message.body.startsWith(config.SUFFIX + 'cmd')) {
        console.log('Mostrando CMD a',message.author);        //CMD
       await client.sendMessage(message.from,menus.cmd);
    }
    if (message.body.startsWith(config.SUFFIX + 's')) {
        console.log('Mostrando menu stickers a',message.author);        //MENU STICKERS
        client.sendMessage(message.from,menus['STICKERS-MENU']);
    }
    if (message.body.startsWith(config.SUFFIX + 'G')) {
        console.log('Mostrando menu games a',message.author);        //MENU JUEGOS
        client.sendMessage(message.from,menus['MENU-GAMES']);
    }
    if (message.body.startsWith(config.SUFFIX + 'menu')) {
        console.log('Mostrando menu principal a',message.author);        //MENUS
        client.sendMessage(message.from,menus.MENUS);
    }
    if (message.body.startsWith(config.SUFFIX + 'kyomi')) {
        console.log('Mostrando info a',message.author);        //MENU INFO
        client.sendMessage(message.from,menus.kyomi);
    }
}
