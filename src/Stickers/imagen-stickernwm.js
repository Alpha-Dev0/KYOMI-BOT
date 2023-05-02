const config = require('../../config/config');
const status = require('../../config/status');
const help = require('../help/help');


module.exports = async (message, client) => {
    if (message.body.startsWith(config.SUFFIX + 'i2s')) {
            //Aqui creamos stickers
            console.log('Convirtiendo image-sticker sin marca de agua',message.from);
            if (message.type == "image")
            {
                client.sendMessage(message.from,status.Cargando);
                try 
                {
                    const media = await message.downloadMedia();
                    client.sendMessage(message.from, media, 
                    {
                        sendMediaAsSticker: true,
                        stickerName: config.NOWM,
                        stickerAuthor: config.Noauthor
                    }).then(() => 
                    {
                        if (message.type == "image")
                        {
                            client.sendMessage(message.from,status.Hecho);
                        }       
                    });
                } catch
                {
                    client.sendMessage(message.from,status.Error);
                }  
            }else if (message.type == "gif" || message.type == "video" ){client.sendMessage(message.from,status.Error);}
            else {client.sendMessage(message.from,help.i2s);}
            
        }
    }