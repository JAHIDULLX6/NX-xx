const axios = require("axios");

const replyMap = new Map();

const baseApiUrl = async () => {
  return "https://noobs-api.top/dipto";
};

module.exports.config = {
  name: "bby",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "dipto",
  description: "Baby AI (teach + reply system)",
  commandCategory: "chat",
  usages: "[text | teach | list | remove | edit]",
  cooldowns: 0
};

// ================== RUN ==================
module.exports.run = async function ({ api, event, args, Users }) {
  const link = `${await baseApiUrl()}/baby`;
  const text = args.join(" ").toLowerCase();
  const uid = event.senderID;

  try {
    if (!args[0]) {
      const ran = ["Bolo baby", "hum", "type help baby", "type !bby hi"];
      return api.sendMessage(ran[Math.floor(Math.random() * ran.length)], event.threadID);
    }

    // REMOVE
    if (args[0] === "remove") {
      const q = text.replace("remove ", "");
      const res = await axios.get(`${link}?remove=${q}&senderID=${uid}`);
      return api.sendMessage(res.data.message, event.threadID);
    }

    // RM INDEX
    if (args[0] === "rm" && text.includes("-")) {
      const [msg, index] = text.replace("rm ", "").split(/\s*-\s*/);
      const res = await axios.get(`${link}?remove=${msg}&index=${index}`);
      return api.sendMessage(res.data.message, event.threadID);
    }

    // LIST
    if (args[0] === "list") {
      const res = await axios.get(`${link}?list=all`);
      return api.sendMessage(
        `Total Teach: ${res.data.length || 0}\nTotal Response: ${res.data.responseLength || 0}`,
        event.threadID
      );
    }

    // MSG CHECK
    if (args[0] === "msg") {
      const q = text.replace("msg ", "");
      const res = await axios.get(`${link}?list=${q}`);
      return api.sendMessage(`Message ${q} = ${res.data.data}`, event.threadID);
    }

    // EDIT
    if (args[0] === "edit" && text.includes("-")) {
      const [msg, rep] = text.replace("edit ", "").split(/\s*-\s*/);
      const res = await axios.get(`${link}?edit=${msg}&replace=${rep}&senderID=${uid}`);
      return api.sendMessage(res.data.message, event.threadID);
    }

    // TEACH
    if (args[0] === "teach" && text.includes("-")) {
      const [msg, rep] = text.replace("teach ", "").split(/\s*-\s*/);
      const res = await axios.get(`${link}?teach=${msg}&reply=${rep}&senderID=${uid}`);
      return api.sendMessage(`✅ Added: ${res.data.message}`, event.threadID);
    }

    // NORMAL CHAT
    const res = await axios.get(`${link}?text=${text}&senderID=${uid}&font=1`);
    const reply = res.data.reply;

    api.sendMessage(reply, event.threadID, (err, info) => {
      replyMap.set(info.messageID, true);
    });

  } catch (e) {
    console.log(e);
    api.sendMessage("❌ Error occurred", event.threadID);
  }
};

// ================== REPLY ==================
module.exports.handleEvent = async function ({ api, event }) {
  try {
    const body = event.body?.toLowerCase();
    if (!body) return;

    // reply system
    if (event.messageReply && replyMap.has(event.messageReply.messageID)) {
      const res = await axios.get(
        `${await baseApiUrl()}/baby?text=${encodeURIComponent(body)}&senderID=${event.senderID}&font=1`
      );

      const reply = res.data.reply;

      api.sendMessage(reply, event.threadID, (err, info) => {
        replyMap.set(info.messageID, true);
      });

      return;
    }

    // auto trigger (baby / bot / sagor)
    if (
      body.startsWith("baby") ||
      body.startsWith("bby") ||
      body.startsWith("bot") ||
      body.startsWith("sagor") ||
      body.startsWith("বেবি") ||
      body.startsWith("বট")
    ) {
      const msg = body.replace(/^\S+\s*/, "");

      if (!msg) {
        const random = [
    "বেশি bot Bot করলে leave নিবো কিন্তু😒😒",
    "শুনবো না😼 তুমি আমার বস সাগর কে প্রেম করাই দাও নাই🥺পচা তুমি🥺",
    "আমি আবাল দের সাথে কথা বলি না,ok😒",
    "এতো ডেকো না,প্রেম এ পরে যাবো তো🙈",
    "Bolo Babu, তুমি কি আমার বস সাগর কে ভালোবাসো? 🙈💋",
    "বার বার ডাকলে মাথা গরম হয়ে যায় কিন্তু😑",
    "হ্যা বলো😒, তোমার জন্য কি করতে পারি😐😑?",
    "এতো ডাকছিস কেন?গালি শুনবি নাকি? 🤬",
    "I love you janu🥰",
    "আরে Bolo আমার জান ,কেমন আছো?😚",
    "আজ বট বলে অসম্মান করছি,😰😿",
    "Hop beda😾,Boss বল boss😼",
    "চুপ থাক ,নাই তো তোর দাত ভেগে দিবো কিন্তু",
    "আমাকে না ডেকে মেয়ে হলে বস সাগর এর ইনবক্সে চলে যা 🌚😂",
    "আমাকে বট না বলে , বস সাগর কে জানু বল জানু 😘",
    "বার বার Disturb করছিস কোনো😾,আমার জানুর সাথে ব্যাস্ত আছি😋",
    "আরে বলদ এতো ডাকিস কেন🤬",
    "আমাকে ডাকলে ,আমি কিন্তু কিস করে দিবো😘",
    "আমারে এতো ডাকিস না আমি মজা করার mood এ নাই এখন😒",
    "হ্যাঁ জানু , এইদিক এ আসো কিস দেই🤭 😘",
    "দূরে যা, তোর কোনো কাজ নাই, শুধু bot bot করিস 😉😋🤣",
    "তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো ?🤔😂",
    "আমাকে ডেকো না,আমি বস সাগর এর সাথে ব্যাস্ত আছি",
    "কি হলো , মিস্টেক করচ্ছিস নাকি🤣",
    "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏",
    "জান মেয়ে হলে বস সাগর এর ইনবক্সে চলে যাও 😍🫣💕",
    "কালকে দেখা করিস তো একটু 😈",
    "হা বলো, শুনছি আমি 😏",
    "আর কত বার ডাকবি ,শুনছি তো",
    "হুম বলো কি বলবে😒",
    "বলো কি করতে পারি তোমার জন্য",
    "আমি তো অন্ধ কিছু দেখি না🐸 😎",
    "আরে বোকা বট না জানু বল জানু😌",
    "বলো জানু 🌚",
    "তোর কি চোখে পড়ে না আমি ব্যাস্ত আছি😒",
    "হুম জান তোমার ওই খানে উম্মহ😑😘",
    "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘",
    "jang hanga korba😒😬",
    "হুম জান তোমার অইখানে উম্মমাহ😷😘",
    "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি..!🥰",
    "ভালোবাসার নামক আবলামি করতে চাইলে বস সাগর এর ইনবক্সে গুতা দিন ~🙊😘🤣",
    "আমাকে এতো না ডেকে বস সাগর এর কে একটা গফ দে 🙄",
    "আমাকে এতো না ডেকছ কেন ভলো টালো বাসো নাকি🤭🙈",
    "🌻🌺💚-আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ-💚🌺🌻",
    "আমি এখন বস সাগর এর সাথে বিজি আছি আমাকে ডাকবেন না-😕😏 ধন্যবাদ-🤝🌻",
    "আমাকে না ডেকে আমার বস সাগর কে একটা জি এফ দাও-😽🫶🌺",
    "ঝাং থুমালে আইলাপিউ পেপি-💝😽",
    "উফফ বুঝলাম না এতো ডাকছেন কেনো-😤😡😈",
    "জান তোমার বান্ধবী রে আমার বস সাগর এর হাতে তুলে দিবা-🙊🙆‍♂",
    "আজকে আমার মন ভালো নেই তাই আমারে ডাকবেন না-😪🤧",
    "ঝাং 🫵থুমালে য়ামি রাইতে পালুপাসি উম্মম্মাহ-🌺🤤💦",
    "চুনা ও চুনা আমার বস সাগর এর হবু বউ রে কেও দেকছো খুজে পাচ্ছি না😪🤧😭",
    "স্বপ্ন তোমারে নিয়ে দেখতে চাই তুমি যদি আমার হয়ে থেকে যাও-💝🌺🌻",
    "জান হাঙ্গা করবা-🙊😝🌻",
    "তোদের জন্য একটুও শান্তি নাই! শুধু ডিস্টার্ব করিস 😿",    
    "জান মেয়ে হলে চিপায় আসো বস সাগর এর থেকে অনেক ভালোবাসা শিখছি তোমার জন্য-🙊🙈😽",
    "ইসস এতো ডাকো কেনো লজ্জা লাগে তো-🙈🖤🌼",
    "আমার বস সাগর এর পক্ষ থেকে তোমারে এতো এতো ভালোবাসা-🥰😽🫶 আমার বস সাগর ইসলামে'র জন্য দোয়া করবেন-💝💚🌺🌻",
    "- ভালোবাসা নামক আব্লামি করতে মন চাইলে আমার বস সাগর এর ইনবক্স চলে যাও-🙊🥱👅 🌻",
    "আমার জান তুমি শুধু আমার আমি তোমারে ৩৬৫ দিন ভালোবাসি-💝🌺😽",
    "কিরে প্রেম করবি তাহলে বস সাগর এর ইনবক্সে গুতা দে 😘🤌",
    "জান আমার বস সাগর কে বিয়ে করবা-🙊😘🥳"
        ];
        return api.sendMessage(random[Math.floor(Math.random() * random.length)], event.threadID);
      }

      const res = await axios.get(
        `${await baseApiUrl()}/baby?text=${encodeURIComponent(msg)}&senderID=${event.senderID}&font=1`
      );

      const reply = res.data.reply;

      api.sendMessage(reply, event.threadID, (err, info) => {
        replyMap.set(info.messageID, true);
      });
    }

  } catch (err) {
    api.sendMessage(`Error: ${err.message}`, event.threadID);
  }
};
