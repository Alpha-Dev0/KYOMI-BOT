const max = 6;
function getRandomInt(){
    return Math.floor(Math.random()*max);
}
            
module.exports.getRandomInt = getRandomInt;
module.exports.max = max;