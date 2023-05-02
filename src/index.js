const { Client, LocalAuth } = require('whatsapp-web.js');
const config = require('../config/config');
const qrcode = require('qrcode-terminal');
const moment = require('moment-timezone');
const colors = require('colors');
const fs = require('fs');

const Cis = require('./Stickers/Imagen-sticker');
const Cas = require('./Stickers Animados/animated-stickers');
const Cisw = require('./Stickers Animados/animated-stickersnwm');
const Casw = require('./Stickers/imagen-stickernwm');
const Cplayd = require('./Juegos/game-dices');
const Cmenus = require('./menus/menus');
const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
        headless: true,
        args: [ '--no-sandbox', '--disable-setuid-sandbox' ]
    },
ffmpeg: './ffmpeg.exe',
    authStrategy: new LocalAuth({ clientId: "client" })
});

client.on('qr', (qr) => {
    console.log(`[${moment().tz(config.timezone).format('HH:mm:ss')}] Scan the QR below : `);
    qrcode.generate(qr, { small: true });

});

client.on('ready', () => {
    console.clear();
    fs.readFile(config.consoletxt, 'utf-8', (err, data) => {
        if (err) {
            console.log(`[${moment().tz(config.timezone).format('HH:mm:ss')}] Console Text not found!`.yellow);
            console.log(`[${moment().tz(config.timezone).format('HH:mm:ss')}] ${config.name} is Already!`.green);
        } else {
            console.log(data.green);
            console.log(`[${moment().tz(config.timezone).format('HH:mm:ss')}] ${config.name} is Already!`.green);
        }
    });
});
   
client.on('message', async (message) => {
   if (message.from.endsWith('@g.us')){
       
    //FUNCIONES EN GRUPOS
        await Cis(message,client);  //IMAGEN A STICKER
        await Cas(message,client);  //GIF O VIDEO A STICKER
        await Cisw(message,client);  //IMAGEN A STICKER AUTOR PERSONALIZADO
        await Casw(message,client);    //GIF O VIDEO A STICKER AUTOR PERSONALIZADO
        await Cplayd(message,client);  //JUEGO DE DADOS
        await Cmenus(message,client);
        
    }
   if (message.from.endsWith('@c.us')){
    
    client.sendMessage(message.from,'Para usar el chatbot de manera privada pongase en contacto con el Administrador:');
    client.sendMessage(message.from,config.author); 
    
};       
});

client.initialize();
