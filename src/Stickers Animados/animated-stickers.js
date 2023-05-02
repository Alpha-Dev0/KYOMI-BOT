const config = require('../../config/config');
const status = require('../../config/status');
const help = require('../help/help');


module.exports = async (message, client) => {
    if (message.body.startsWith(config.SUFFIX + 'as')) {
            //Aqui creamos stickers animados
            console.log('Convirtiendo image-sticker animado',message.from);
            if(message.type == "gif" || message.type == "video")
            {
                client.sendMessage(message.from,status.Cargando);
                try 
                {
                   const media = await message.downloadMedia();
                   client.sendMessage(message.from, media, 
                    {
                       sendMediaAsSticker: true,
                       stickerName: config.name, 
                       stickerAuthor: message.body.slice(4) || config.author 
                    }).then(() => 
                    {   
                       {client.sendMessage(message.from,status.Hecho);}
                    });
                } catch
                {
                   client.sendMessage(message.from,status.Error);
                } 

            }else if (message.type == "image"){client.sendMessage(message.from,msg.Error);}
            else {client.sendMessage(message.from,help.as);}
        }
    }