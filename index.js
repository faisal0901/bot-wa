const qrcode = require("qrcode-terminal");

// Load the session data if it has been previously saved
const { Client, LocalAuth } = require("whatsapp-web.js");

const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "client-one" }),
});

client.on("qr", (qr) => {
  // Generate and scan this code with your phone
  console.log('client 1')
  qrcode.generate(qr, { small: true });
});



client.on("ready", () => {
  console.log("client ready 1 ");
});


const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});
let numblist=[]
const sendMessage= async(msg)=>{

  const MathRandom = Math.floor(Math.random() * 100) + 10;
  const lengthRandom = Math.floor(Math.random() * 10) + 1;
  
try {
  if (msg.body.includes("ping")) {
    const chat =await  msg.getChat();
    
  if(chat.isGroup===false){

   msg.reply(lorem.generateSentences(lengthRandom));
   new Promise(function (resolve, reject) {
     setTimeout(function () {
       resolve(msg.reply("ping"));
     }, MathRandom * 1000);
   });
   numblist.push(chat.id._serialized)
   let uniqueArray=[...new Set(numblist)]
    if(uniqueArray.length>=3){
     
      await client.createGroup(`baseJaktim-${MathRandom}`,uniqueArray)
      numblist=[]
    }
  }else{
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(msg.reply(lorem.generateSentences(lengthRandom)));
      }, MathRandom * 1000);
    });
  }
  } else if (msg.body.includes("pong")) {
    msg.reply(lorem.generateSentences(lengthRandom));
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(msg.reply("ping"));
      }, MathRandom * 1000);
    });
  }else if(msg.body.includes("stop")){
    msg.reply('chat is stopped')
  }
} catch (error) {
  console.log(error)
}

}
client.on("message", sendMessage);


client.initialize();
