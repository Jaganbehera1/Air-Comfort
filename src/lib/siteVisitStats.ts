import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { listReports } from './engineerReports';

export async function countPendingSiteVisits() {
  try {
    const q = query(collection(db, 'site_visits'), where('status', '==', 'submitted'));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    console.error('countPendingSiteVisits error', error);
    const localPending = listReports().filter((item) => item.status === 'submitted').length;
    return localPending;
  }
}
