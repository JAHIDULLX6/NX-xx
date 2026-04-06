module.exports.config = {
  name: "adminUpdate",
  eventType: [
    "log:thread-admins",
    "log:thread-name",
    "log:user-nickname",
    "log:thread-icon",
    "log:thread-color"
  ],
  version: "1.1.0",
  credits: "SaGor",
  description: "Group updates notification",
  envConfig: {
    sendNoti: true,
    autoUnsend: false,
    timeToUnsend: 10
  }
};

module.exports.run = async function ({ event, api, Threads }) {
  const fs = require("fs");
  const path = require("path");

  const iconPath = path.join(__dirname, "emoji.json");
  if (!fs.existsSync(iconPath)) fs.writeFileSync(iconPath, JSON.stringify({}));

  const { threadID, logMessageType, logMessageData, author } = event;
  const { setData, getData } = Threads;

  const threadSetting = global.data.threadData.get(threadID) || {};
  if (threadSetting.adminUpdate === false) return;

  try {
    let dataThread = (await getData(threadID)).threadInfo || {};

    // safety init
    if (!Array.isArray(dataThread.adminIDs)) dataThread.adminIDs = [];
    if (typeof dataThread.nicknames !== "object") dataThread.nicknames = {};

    switch (logMessageType) {

      case "log:thread-admins": {
        if (logMessageData.ADMIN_EVENT === "add_admin") {
          if (!dataThread.adminIDs.some(i => i.id == logMessageData.TARGET_ID)) {
            dataThread.adminIDs.push({ id: logMessageData.TARGET_ID });
          }

          if (global.configModule[this.config.name].sendNoti) {
            api.sendMessage(
              `👑 ADMIN UPDATE\n━━━━━━━━━━━━━━\n➤ User ID: ${logMessageData.TARGET_ID}\n➤ Status: Now you are the admin 😎🔥`,
              threadID
            );
          }
        }

        if (logMessageData.ADMIN_EVENT === "remove_admin") {
          dataThread.adminIDs = dataThread.adminIDs.filter(
            item => item.id != logMessageData.TARGET_ID
          );

          if (global.configModule[this.config.name].sendNoti) {
            api.sendMessage(
              `💔 ADMIN REMOVE\n━━━━━━━━━━━━━━\n➤ User ID: ${logMessageData.TARGET_ID}\n➤ Now you are not the admin. 😹`,
              threadID
            );
          }
        }
        break;
      }

      case "log:thread-icon": {
        let iconData = JSON.parse(fs.readFileSync(iconPath));
        const oldIcon = iconData[threadID] || "❓";
        const newIcon = logMessageData.thread_icon || "👍";

        dataThread.threadIcon = newIcon;
        iconData[threadID] = newIcon;
        fs.writeFileSync(iconPath, JSON.stringify(iconData, null, 2));

        if (global.configModule[this.config.name].sendNoti) {
          api.sendMessage(
            `🖼 GROUP ICON UPDATE\n━━━━━━━━━━━━━━\n➤ Old: ${oldIcon}\n➤ New: ${newIcon}`,
            threadID
          );
        }
        break;
      }

      case "log:thread-color": {
        dataThread.threadColor = logMessageData.thread_color || "🌤";

        if (global.configModule[this.config.name].sendNoti) {
          api.sendMessage(
            `🎨 GROUP COLOR UPDATE\n━━━━━━━━━━━━━━\n➤ Theme color changed 🔥`,
            threadID
          );
        }
        break;
      }

      case "log:user-nickname": {
        const userID = logMessageData.participant_id;
        const nickname = logMessageData.nickname || "";

        if (
          typeof global.configModule["nickname"] !== "undefined" &&
          !global.configModule["nickname"].allowChange.includes(threadID) &&
          !dataThread.adminIDs.some(item => item.id == author) &&
          author != api.getCurrentUserID()
        ) return;

        dataThread.nicknames[userID] = nickname;

        if (global.configModule[this.config.name].sendNoti) {
          api.sendMessage(
            `✏️ NICKNAME UPDATE\n━━━━━━━━━━━━━━\n➤ User ID: ${userID}\n➤ New Nick: ${nickname || "Original Name"}`,
            threadID
          );
        }
        break;
      }

      case "log:thread-name": {
        dataThread.threadName = logMessageData.name || "No Name";

        if (global.configModule[this.config.name].sendNoti) {
          api.sendMessage(
            `📛 GROUP NAME UPDATE\n━━━━━━━━━━━━━━\n➤ New Name: ${dataThread.threadName}`,
            threadID
          );
        }
        break;
      }
    }

    // ✅ FIXED PART ONLY
    try {
      await setData(threadID, { threadInfo: dataThread });
    } catch (e) {
      await Threads.createData(threadID, { threadInfo: dataThread });
    }

  } catch (e) {
    console.log("adminUpdate error:", e);
  }
};
