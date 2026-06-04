/**
 * Tests des Firestore security rules — Jago Trust Layer
 *
 * Pré-requis :
 *   npm install --save-dev @firebase/rules-unit-testing
 *   firebase-tools installé globalement (pour l'emulateur)
 *
 * Lancement :
 *   firebase emulators:exec --only firestore "node firestore.rules.test.js"
 *
 * Ou avec l'emulateur déjà lancé :
 *   FIRESTORE_EMULATOR_HOST=localhost:8080 node firestore.rules.test.js
 */

const {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} = require("@firebase/rules-unit-testing");
const fs = require("fs");

const PROJECT_ID = "jago-test";
const RULES_FILE = "firestore.rules";

async function setup() {
  return initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: fs.readFileSync(RULES_FILE, "utf8"),
      host: "localhost",
      port: 8080,
    },
  });
}

async function run() {
  let env;
  let passed = 0;
  let failed = 0;

  const ok = (label) => { console.log(`  ✅ ${label}`); passed++; };
  const fail = (label, err) => { console.log(`  ❌ ${label}\n     ${err.message}`); failed++; };

  try {
    env = await setup();

    // ── ANNONCES : champ whatsapp interdit ────────────────────────────
    console.log("\n[annonces] champ whatsapp interdit à la création");
    {
      const db = env.authenticatedContext("user1").firestore();
      await assertFails(db.collection("annonces").add({
        titre: "Test", userId: "user1",
        whatsapp: "123456", // INTERDIT
        reportedBy: [], hidden: false,
      })).then(() => ok("create avec whatsapp est refusé"))
        .catch(e => fail("create avec whatsapp est refusé", e));

      await assertSucceeds(db.collection("annonces").add({
        titre: "Test", userId: "user1",
        reportedBy: [], hidden: false,
      })).then(() => ok("create sans whatsapp est autorisé"))
        .catch(e => fail("create sans whatsapp est autorisé", e));
    }

    // ── ANNONCES : auto-masquage (reportedBy + hidden) ─────────────
    console.log("\n[annonces] auto-masquage : reportedBy + hidden seulement");
    {
      // Créer une annonce de référence comme user1
      const db1 = env.authenticatedContext("user1").firestore();
      const ref = await db1.collection("annonces").add({
        titre: "Moto à vendre", userId: "user1",
        reportedBy: [], hidden: false,
      });

      // user2 peut ajouter son UID dans reportedBy et déclencher hidden=true
      const db2 = env.authenticatedContext("user2").firestore();
      await assertSucceeds(
        db2.collection("annonces").doc(ref.id).update({
          reportedBy: ["user2"],
          hidden: false,
        })
      ).then(() => ok("update reportedBy+hidden par user2 est autorisé"))
        .catch(e => fail("update reportedBy+hidden par user2 est autorisé", e));

      // user2 ne peut PAS modifier le titre
      await assertFails(
        db2.collection("annonces").doc(ref.id).update({
          titre: "Piratée",
        })
      ).then(() => ok("update titre par user2 est refusé"))
        .catch(e => fail("update titre par user2 est refusé", e));
    }

    // ── ANNONCES : hidden=false ne peut pas être remis par un user non-auteur ──
    console.log("\n[annonces] réactivation hidden=false bloquée pour l'auteur si masquage auto");
    {
      const db1 = env.authenticatedContext("user1").firestore();
      const ref = await db1.collection("annonces").add({
        titre: "Annonce masquée", userId: "user1",
        reportedBy: ["u2","u3","u4"], hidden: true,
      });

      // L'auteur NE PEUT PAS remettre hidden=false (seul l'admin peut via console)
      await assertFails(
        db1.collection("annonces").doc(ref.id).update({ hidden: false })
      ).then(() => ok("l'auteur ne peut pas remettre hidden=false"))
        .catch(e => fail("l'auteur ne peut pas remettre hidden=false", e));
    }

    // ── CONVERSATIONS : création ───────────────────────────────────────
    console.log("\n[conversations] création");
    {
      const db = env.authenticatedContext("buyer1").firestore();

      // Création valide
      await assertSucceeds(
        db.collection("conversations").doc("buyer1_seller1_ad1").set({
          participants: ["buyer1", "seller1"],
          buyerId: "buyer1", sellerId: "seller1",
          lastMessage: "", lastMessageAt: null,
        })
      ).then(() => ok("création conversation buyer1→seller1 autorisée"))
        .catch(e => fail("création conversation buyer1→seller1 autorisée", e));

      // Impossible de se parler à soi-même
      await assertFails(
        db.collection("conversations").doc("buyer1_buyer1_ad1").set({
          participants: ["buyer1", "buyer1"],
          buyerId: "buyer1", sellerId: "buyer1",
          lastMessage: "", lastMessageAt: null,
        })
      ).then(() => ok("conversation avec soi-même refusée"))
        .catch(e => fail("conversation avec soi-même refusée", e));
    }

    // ── FAVORIS : accès uniquement par le propriétaire ─────────────────
    console.log("\n[favoris] accès restreint au propriétaire");
    {
      const db1 = env.authenticatedContext("user1").firestore();
      const db2 = env.authenticatedContext("user2").firestore();

      await db1.collection("favoris").doc("user1").set({ ids: [] });

      await assertSucceeds(
        db1.collection("favoris").doc("user1").get()
      ).then(() => ok("user1 peut lire ses favoris"))
        .catch(e => fail("user1 peut lire ses favoris", e));

      await assertFails(
        db2.collection("favoris").doc("user1").get()
      ).then(() => ok("user2 ne peut pas lire les favoris de user1"))
        .catch(e => fail("user2 ne peut pas lire les favoris de user1", e));
    }

  } catch (err) {
    console.error("Erreur setup :", err.message);
  } finally {
    if (env) await env.cleanup();
  }

  console.log(`\nRésultats : ${passed} OK, ${failed} FAIL`);
  if (failed > 0) process.exit(1);
}

run();
