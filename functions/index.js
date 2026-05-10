const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const apn = require("@parse/node-apn");

initializeApp();

const APNS_KEY = defineSecret("APNS_KEY");

exports.sendMessageNotification = onDocumentCreated(
  {
    document: "conversations/{convId}/messages/{msgId}",
    secrets: ["APNS_KEY"],
  },
  async (event) => {
    const db = getFirestore();
    const msg = event.data.data();
    const { convId } = event.params;

    // Récupérer la conversation
    const convSnap = await db.collection("conversations").doc(convId).get();
    if (!convSnap.exists) return;
    const conv = convSnap.data();

    // Le destinataire = l'autre participant
    const recipientId = conv.participants.find((uid) => uid !== msg.senderId);
    if (!recipientId) return;

    // Récupérer le token APNs du destinataire
    const userSnap = await db.collection("users").doc(recipientId).get();
    if (!userSnap.exists) return;
    const userData = userSnap.data();
    const apnsToken = userData.apnsToken || userData.fcmToken;
    if (!apnsToken) return;

    // Nom de l'expéditeur
    const senderName = msg.senderName || "Quelqu'un";
    const msgText = msg.text || "";

    // Configurer APNs
    const apnProvider = new apn.Provider({
      token: {
        key: APNS_KEY.value(),
        keyId: "B26K97DLR3",
        teamId: "QA6BFS78P2",
      },
      production: true,
    });

    // Créer la notification
    const notification = new apn.Notification();
    notification.alert = {
      title: `💬 ${senderName}`,
      body: msgText.length > 60 ? msgText.substring(0, 57) + "..." : msgText,
    };
    notification.badge = 1;
    notification.sound = "default";
    notification.topic = "com.yoman.app";
    notification.payload = { convId, page: "messages" };

    try {
      const result = await apnProvider.send(notification, apnsToken);
      if (result.failed.length > 0) {
        console.error("APNs failed:", JSON.stringify(result.failed));
      } else {
        console.log("Notification envoyée avec succès");
      }
    } catch (err) {
      console.error("Erreur APNs:", err);
    } finally {
      apnProvider.shutdown();
    }
  }
);
