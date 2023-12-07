const { Expo } = require("expo-server-sdk");

const expo = new Expo({});
const RTDatabase = process.env.RTD;

const sendNotifications = async (customBody) => {
  try {
    const response = await fetch(`${RTDatabase}/users.json`);
    const data = await response.json();

    const somePushTokens = [];
    Object.keys(data).forEach((item) => {
      const token = data[item].token;
      somePushTokens.push(token);
    });

    const messages = somePushTokens
      .map((pushToken) => {
        if (!Expo.isExpoPushToken(pushToken)) {
          return null;
        }

        return {
          to: pushToken,
          sound: "default",
          title: "Este es un mensaje de Alerta de EasySOS",
          body: customBody,
        };
      })
      .filter((message) => message !== null);

    const chunks = expo.chunkPushNotifications(messages);

    for (const chunk of chunks) {
      await expo.sendPushNotificationsAsync(chunk);
    }
    return true;
  } catch (error) {
    console.error("Error al enviar notificaciones:", error.message);
    throw error;
  }
};

module.exports = sendNotifications;
