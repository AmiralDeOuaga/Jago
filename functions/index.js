const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");

initializeApp();

exports.sendMessageNotification = onDocumentCreated(
  "conversations/{convId}/messages/{msgId}",
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

    // Récupérer le token FCM du destinataire
    const userSnap = await db.collection("users").doc(recipientId).get();
    if (!userSnap.exists) return;
    const fcmToken = userSnap.data().fcmToken;
    if (!fcmToken) return;

    // Nom de l'expéditeur
    const senderName = msg.senderName || "Quelqu'un";
    const annonceTitle = conv.annonceTitre || "une annonce";

    // Envoyer la notification
    try {
      await getMessaging().send({
        token: fcmToken,
        notification: {
          title: `💬 ${senderName}`,
          body: msg.text.length > 60 ? msg.text.substring(0, 57) + "..." : msg.text,
        },
        data: {
          convId: convId,
          page: "messages",
        },
        apns: {
          payload: {
            aps: {
              badge: 1,
              sound: "default",
            },
          },
        },
      });
    } catch (err) {
      console.error("Erreur envoi notification:", err);
    }
  }
);
