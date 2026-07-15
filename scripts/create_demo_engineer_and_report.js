/**
 * Script to create a demo engineer user and a sample site_visit document using
 * the Firebase Admin SDK. This script requires a service account JSON and
 * should be run from a secure environment (developer machine / CI) with
 * admin privileges.
 *
 * Usage:
 * 1. Place your service account JSON at `./serviceAccountKey.json` or set
 *    the environment variable `GOOGLE_APPLICATION_CREDENTIALS` to its path.
 * 2. Run: `node ./scripts/create_demo_engineer_and_report.js`
 */

const admin = require('firebase-admin');
const fs = require('fs');

const svcPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || './serviceAccountKey.json';
if (!fs.existsSync(svcPath)) {
  console.error('Service account JSON not found at', svcPath);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(require(svcPath)),
});

const auth = admin.auth();
const db = admin.firestore();

async function main() {
  try {
    // Create demo engineer user (or get existing)
    const email = 'siteeng@gmail.com';
    const password = 'JJ@123';
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
      console.log('User already exists:', userRecord.uid);
    } catch (err) {
      userRecord = await auth.createUser({ email, emailVerified: true, password });
      console.log('Created user:', userRecord.uid);
    }

    // Set custom claims to identify role
    await auth.setCustomUserClaims(userRecord.uid, { role: 'engineer' });
    console.log('Set custom claim role=engineer');

    // Create users/{uid} document with role
    await db.collection('users').doc(userRecord.uid).set({
      role: 'engineer',
      email,
      created_at: new Date().toISOString(),
    }, { merge: true });
    console.log('Created users doc');

    // Create a sample site visit
    const sample = {
      customer_name: 'Demo Customer',
      phone_number: '+911234567890',
      address: 'Demo Address, City',
      gps_location: '20.2961,85.8245',
      installation_type: 'Residential',
      roof_type: 'Sloped',
      roof_material: 'Tile',
      shadow_analysis: 'Minimal shading in morning hours',
      electricity_bill: '250 kWh',
      recommended_capacity: '3.5 kW',
      inverter_recommendation: 'Sungrow 3kW',
      panel_recommendation: 'REC 450W',
      remarks: 'Good rooftop orientation',
      status: 'submitted',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      engineer_id: userRecord.uid,
    };

    const ref = await db.collection('site_visits').add(sample);
    console.log('Created demo site_visit with id', ref.id);

    console.log('Demo setup complete. Login as:', email, 'password:', password);
  } catch (err) {
    console.error('Error creating demo data', err);
    process.exit(1);
  }
}

main();
