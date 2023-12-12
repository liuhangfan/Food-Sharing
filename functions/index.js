/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {getAuth} = require("firebase-admin/auth");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");

initializeApp();
exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.

exports.queryUserEmailByUIDNew = onCall(async (request) => {
  const uid = request.data.uid;
  try {
    const userRecord = await getAuth().getUser(uid);
    console.log(`Successfully fetched user data: ${userRecord.email}`);
    return {text: `${userRecord.email}`};
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new HttpsError("internal", "Error fetching user data");
  }
});
