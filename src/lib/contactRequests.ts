import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db, ContactRequest } from './firebase';

const STORAGE_KEY = 'aircomfort_contact_requests';

function readStoredRequests(): ContactRequest[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Unable to read stored contact requests:', error);
    return [];
  }
}

function writeStoredRequests(requests: ContactRequest[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

export async function saveContactRequest(payload: Omit<ContactRequest, 'id' | 'created_at'> & { created_at: string }) {
  try {
    const docRef = await addDoc(collection(db, 'contact_requests'), payload);
    return { id: docRef.id, source: 'firestore' as const };
  } catch (error) {
    console.warn('Firestore write blocked, falling back to local storage:', error);

    const stored = readStoredRequests();
    const record: ContactRequest = {
      id: `local-${Date.now()}`,
      ...payload,
    };

    writeStoredRequests([record, ...stored]);
    return { id: record.id, source: 'local' as const };
  }
}

export async function listContactRequests(): Promise<ContactRequest[]> {
  try {
    const q = query(collection(db, 'contact_requests'), orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<ContactRequest, 'id'>) })) as ContactRequest[];
  } catch (error) {
    console.warn('Firestore read blocked, falling back to local storage:', error);
    return readStoredRequests();
  }
}
