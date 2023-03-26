const { Client, LocalAuth, Chat } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const moment = require('moment-timezone');
const colors = require('colors');
const fs = require('fs');

const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
        headless: true,
        args: [ '--no-sandbox', '--disable-setuid-sandbox' ]
    },
ffmpeg: './ffmpeg.exe',
    authStrategy: new LocalAuth({ clientId: "client" })
});
const config = require('./config/config.json');
const cmd = require('./config/cmd.json');
const helper = require('./config/commandhelper.json');

client.on('qr', (qr) => {
    console.log(`[${moment().tz(config.timezone).format('HH:mm:ss')}] Scan the QR below : `);
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.clear();
    const consoleText = './config/console.txt';
    fs.readFile(consoleText, 'utf-8', (err, data) => {
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
    const isGroups = message.from.endsWith('@g.us') ? true : false;
    if ((isGroups && config.groups) || !isGroups) {
        if (message.body == "/cmd"){
            client.sendMessage(message.from, cmd.menu);
            return;
        }
        if (message.body == "/is")
        {
            if (message.type == "image")
            {
                client.sendMessage(message.from, cmd.load);
                try {
                   const media = await message.downloadMedia();
                   client.sendMessage(message.from, media, {
                       sendMediaAsSticker: true,
                       stickerName: config.name, // Sticker Name = Edit in 'config/config.json'
                       stickerAuthor: config.author // Sticker Author = Edit in 'config/config.json'
                   }).then(() => {
                       if (message.type == "image"){
                       client.sendMessage(message.from, cmd.success);
                      
                   }else{client.sendMessage(message.from,helper.notdetect);}
                   });
                } catch{
                   client.sendMessage(message.from,cmd.fail);
                }  
            }else if (message.type == "gif" || message.type == "video" ){client.sendMessage(message.from,helper.check);}
        } else {
             client.getChatById(message.id.remote).then(async (chat) => {
                await chat.sendSeen();
            });
        }
        if(message.body == "/as")
        {
            if(message.type == "gif" || message.type == "video")
            {
                client.sendMessage(message.from,cmd.load);
                try {
                   const media = await message.downloadMedia();
                   client.sendMessage(message.from, media, {
                       sendMediaAsSticker: true,
                       stickerName: config.name, // Sticker Name = Edit in 'config/config.json'
                       stickerAuthor: config.author // Sticker Author = Edit in 'config/config.json'
                   }).then(() => {   
                       {client.sendMessage(message.from,cmd.success);}
                   });
                } catch{
                   client.sendMessage(message.from,cmd.fail);
                } 

            }else if (message.type == "image"){client.sendMessage(message.from,helper.check);}
        } else {
             client.getChatById(message.id.remote).then(async (chat) => {
                await chat.sendSeen();
                
            });
            
            }
}       });
client.initialize();
