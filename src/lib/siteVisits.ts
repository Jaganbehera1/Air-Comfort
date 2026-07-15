import { collection, doc, setDoc, getDoc, getDocs, query, orderBy, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { SiteVisitReport, saveReport, listReports, deleteReport } from './engineerReports';

const COLL = 'site_visits';
let firestoreAvailable = true;

function permissionDenied(error: any) {
  if (!error) return false;
  const code = error.code || '';
  const message = error.message || '';
  return code === 'permission-denied' || message.toLowerCase().includes('missing or insufficient permissions');
}

function handleFirestoreFailure(error: any) {
  if (permissionDenied(error)) {
    firestoreAvailable = false;
  }
}

function useFirestore() {
  return firestoreAvailable;
}

export async function saveSiteVisitToFirestore(report: SiteVisitReport) {
  if (!useFirestore()) {
    throw new Error('firestore-disabled');
  }

  try {
    const data = { ...report, created_at: report.created_at ? report.created_at : new Date().toISOString() };
    const ref = doc(db, COLL, report.id);
    await setDoc(ref, data as any, { merge: true });
    return { id: report.id };
  } catch (err) {
    handleFirestoreFailure(err);
    console.error('saveSiteVisitToFirestore error', err);
    throw err;
  }
}

export async function getSiteVisitByIdFromFirestore(id: string) {
  if (!useFirestore()) {
    return null;
  }

  try {
    const ref = doc(db, COLL, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;

    return { id: snap.id, ...(snap.data() as any) } as SiteVisitReport;
  } catch (err: any) {
    handleFirestoreFailure(err);
    if (permissionDenied(err)) {
      console.warn('getSiteVisitByIdFromFirestore permission denied, falling back to local report', err);
      return null;
    }
    console.error('getSiteVisitByIdFromFirestore error', err);
    throw err;
  }
}

export async function listSiteVisitsFromFirestore() {
  if (!useFirestore()) {
    throw new Error('firestore-disabled');
  }

  try {
    const q = query(collection(db, COLL), orderBy('created_at', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as SiteVisitReport[];
  } catch (err) {
    handleFirestoreFailure(err);
    console.error('listSiteVisitsFromFirestore error', err);
    throw err;
  }
}

export async function listSiteVisitsByEngineer(engineerId: string | null) {
  if (!useFirestore()) {
    throw new Error('firestore-disabled');
  }

  try {
    if (!engineerId) {
      return [];
    }
    const q = query(collection(db, COLL), where('engineer_id', '==', engineerId));
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => ({ id: d.id, ...(d.data() as any) }))
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1)) as SiteVisitReport[];
  } catch (err) {
    handleFirestoreFailure(err);
    console.error('listSiteVisitsByEngineer error', err);
    throw err;
  }
}

export async function updateSiteVisitStatus(id: string, status: 'approved' | 'rejected', reviewerId: string, comment?: string) {
  try {
    const ref = doc(db, COLL, id);
    await updateDoc(ref, {
      status,
      reviewed_by: reviewerId,
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      admin_comment: comment || '',
    } as any);
    return { source: 'firestore' };
  } catch (err: any) {
    handleFirestoreFailure(err);
    console.warn('Falling back to local storage for status update:', err.message || err);
    const report = listReports().find((r) => r.id === id);
    if (report) {
      const updated = {
        ...report,
        status,
        reviewed_by: reviewerId,
        reviewed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        admin_comment: comment || '',
      };
      saveReport(updated);
      return { source: 'local' };
    }
    throw err;
  }
}

export async function deleteSiteVisit(id: string) {
  try {
    const ref = doc(db, COLL, id);
    await deleteDoc(ref);
    return { source: 'firestore' };
  } catch (err: any) {
    handleFirestoreFailure(err);
    console.warn('Falling back to local storage for report deletion:', err.message || err);
    const report = listReports().find((r) => r.id === id);
    if (report) {
      deleteReport(id);
      return { source: 'local' };
    }
    throw err;
  }
}

// Helper that tries Firestore then falls back to localStorage-based reports
export async function saveSiteVisit(report: SiteVisitReport) {
  try {
    const res = await saveSiteVisitToFirestore(report);
    return { source: 'firestore', id: res.id };
  } catch (err: any) {
    // permission denied or network -> fallback to localStorage
    console.warn('Falling back to local storage for site visit:', err.message || err);
    saveReport(report);
    return { source: 'local', id: report.id };
  }
}

export async function listSiteVisits() {
  try {
    return await listSiteVisitsFromFirestore();
  } catch (err) {
    // fallback
    return listReports();
  }
}
