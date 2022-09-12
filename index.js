const qrcode = require("qrcode-terminal");

// Load the session data if it has been previously saved
const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "client-one" }),
});
const axios = require("axios");

client.on("qr", (qr) => {
  // Generate and scan this code with your phone
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("client ready");
});

client.on("message", async (msg) => {
  const MathRandom = Math.floor(Math.random() * 50) + 1;

  if (msg.body == "ping") {
    axios
      .get("https://quotable.io/random")
      .then((res) => {
        msg.reply(res.data.content);
      })
      .then(
        () =>
          new Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve(msg.reply("ping"));
            }, 10000);
          })
      )
      .catch((err) => msg.reply("sorry server error"));
  } else if (msg.body.includes("pong")) {
    axios
      .get("https://quotable.io/random")
      .then((res) => {
        msg.reply(res.data.content);
      })
      .then(
        () =>
          new Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve(msg.reply("ping"));
            }, MathRandom * 1000);
          })
      )
      .catch((err) => msg.reply("sorry server error"));
  } else if (msg.body == "test") {
    console.log(msg);
  }
});

client.initialize();
