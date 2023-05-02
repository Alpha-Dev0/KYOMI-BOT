const config = require('../../config/config');
const status = require('../../config/status');
const help = require('../help/help');


module.exports = async (message, client) => {
    if (message.body.startsWith(config.SUFFIX + 'a2s')) {
            //Aqui creamos stickers animados
            console.log('Convirtiendo image-sticker animado sin marca de agua',message.from);
            if(message.type == "gif" || message.type == "video")
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
                       {client.sendMessage(message.from,status.Hecho);}
                    });
                } catch
                {
                   client.sendMessage(message.from,status.Error);
                } 

            }else if (message.type == "image"){client.sendMessage(message.from,msg.Error);}
            else {client.sendMessage(message.from,help.a2s);}
        }
    }