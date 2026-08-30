const fs = require("fs-extra");
const axios = require("axios");
const request = require("request");

module.exports.config = {
  name: "info",
  version: "1.0.0",
  permission: 0,
  credits: "IMRAN",
  description: "Show stylish admin information",
  prefix: true,
  category: "INFO",
  usages: "info",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "request": ""
  }
};

module.exports.run = async ({ api, event, args }) => {
  const adminInfo = {
    name: "SHAAHLOM ISLAM",
    city: "Dhaka, Bangladesh",
    work: "Web Developer & Bot Creator",
    whatsapp: "wa.me/+8801794197687",
    facebook: "https://www.facebook.com/share/1FLNgJhkaW/"
  };

  const botVersion = global.config.version || "2.0.0";
  const uptimeSeconds = process.uptime();
  const uptime = formatUptime(uptimeSeconds);

  const info = `
✦ 𝗬𝗨𝗠𝗜𝗞𝗔 𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡 𝗜𝗡𝗙𝗢 ✦

❖ 𝗡𝗮𝗺𝗲: 『 ${adminInfo.name} 』
❖ 𝗟𝗼𝗰𝗮𝘁𝗶𝗼𝗻: 『 ${adminInfo.city} 』
❖ 𝗣𝗿𝗼𝗳𝗲𝘀𝘀𝗶𝗼𝗻: 『 ${adminInfo.work} 』
❖ 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽: 『 ${adminInfo.whatsapp} 』
❖ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: 『 ${adminInfo.facebook} 』

╔════════ • ✤ • ════════╗
✦ 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡 ✦
╚════════ • ✤ • ════════╝

❖ 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: 『 ${botVersion} 』
❖ 𝗨𝗽𝘁𝗶𝗺𝗲: 『 ${uptime} 』
❖ 𝗖𝗼𝗱𝗲𝗿: 『 ${adminInfo.name} 』
❖ 𝗙𝗿𝗮𝗺𝗲𝘄𝗼𝗿𝗸: 『 SHAAHLOM BOT 』
`.trim();

  const imagePath = __dirname + "/cache/admin.png";
  const imageURL = `https://i.imgur.com/kh4Ceb5.jpeg`;

  request(encodeURI(imageURL))
    .pipe(fs.createWriteStream(imagePath))
    .on("close", () => {
      api.sendMessage(
        {
          body: info,
          attachment: fs.createReadStream(imagePath)
        },
        event.threadID,
        () => fs.unlinkSync(imagePath),
        event.messageID
      );
    });
};

function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (secs || parts.length === 0) parts.push(`${secs} second${secs > 1 ? "s" : ""}`);

  return parts.join(", ");
}
