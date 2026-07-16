import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { listReports } from './engineerReports';

export async function countPendingSiteVisits() {
  try {
    const q = query(collection(db, 'site_visits'), where('status', '==', 'submitted'));
    const snapshot = await getCountFromServer(q);
    const count = snapshot.data().count;
    console.log(`✅ Found ${count} pending site visits in Firestore`);
    return count;
  } catch (error) {
    console.error('countPendingSiteVisits error, falling back to local:', error);
    const localPending = listReports().filter((item) => item.status === 'submitted').length;
    console.log(`📁 Found ${localPending} pending site visits locally`);
    return localPending;
  }
}