const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");
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

    // Récupérer les tokens du destinataire
    const userSnap = await db.collection("users").doc(recipientId).get();
    if (!userSnap.exists) return;
    const userData = userSnap.data();

    const fcmToken = userData.fcmToken;   // Android
    const apnsToken = userData.apnsToken; // iOS
    if (!fcmToken && !apnsToken) return;

    // Nom de l'expéditeur + texte
    const senderName = msg.senderName || "Quelqu'un";
    const msgText = msg.text || "";
    const bodyText = msgText.length > 60 ? msgText.substring(0, 57) + "..." : msgText;

    // ── Android via FCM ──────────────────────────────────────
    if (fcmToken) {
      try {
        await getMessaging().send({
          token: fcmToken,
          notification: {
            title: `💬 ${senderName}`,
            body: bodyText,
          },
          data: { convId, page: "messages" },
          android: {
            priority: "high",
            notification: {
              sound: "default",
              channelId: "messages",
            },
          },
        });
        console.log("Notification FCM (Android) envoyée à", recipientId);
      } catch (err) {
        console.error("Erreur FCM:", err.message);
        // Token expiré → le nettoyer
        if (
          err.code === "messaging/registration-token-not-registered" ||
          err.code === "messaging/invalid-registration-token"
        ) {
          await db.collection("users").doc(recipientId).update({ fcmToken: null });
        }
      }
    }

    // ── iOS via APNs ─────────────────────────────────────────
    if (apnsToken) {
      const apnProvider = new apn.Provider({
        token: {
          key: APNS_KEY.value(),
          keyId: "B26K97DLR3",
          teamId: "QA6BFS78P2",
        },
        production: true,
      });

      const notification = new apn.Notification();
      notification.alert = { title: `💬 ${senderName}`, body: bodyText };
      notification.badge = 1;
      notification.sound = "default";
      notification.topic = "com.yoman.app";
      notification.payload = { convId, page: "messages" };

      try {
        const result = await apnProvider.send(notification, apnsToken);
        if (result.failed.length > 0) {
          console.error("APNs failed:", JSON.stringify(result.failed));
          // Token expiré → nettoyer
          const reason = result.failed[0]?.response?.reason;
          if (reason === "BadDeviceToken" || reason === "Unregistered") {
            await db.collection("users").doc(recipientId).update({ apnsToken: null });
          }
        } else {
          console.log("Notification APNs (iOS) envoyée à", recipientId);
        }
      } catch (err) {
        console.error("Erreur APNs:", err);
      } finally {
        apnProvider.shutdown();
      }
    }
  }
);
