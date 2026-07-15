import { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export type UserRole = 'admin' | 'engineer' | 'customer';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null; role: UserRole | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function normalizeRole(roleValue: string | null | undefined): UserRole {
  const normalizedValue = roleValue?.toLowerCase().trim();

  if (normalizedValue === 'admin' || normalizedValue === 'administrator') {
    return 'admin';
  }

  if (normalizedValue === 'engineer' || normalizedValue === 'technician') {
    return 'engineer';
  }

  return 'customer';
}

async function resolveUserRole(user: User | null): Promise<UserRole | null> {
  if (!user) {
    return null;
  }

  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    if (userDoc.exists()) {
      return normalizeRole(userDoc.data().role);
    }

    const email = user.email?.toLowerCase() ?? '';
    const inferredRole: UserRole = email.includes('admin')
      ? 'admin'
      : email.includes('engineer') || email.includes('siteeng')
        ? 'engineer'
        : 'customer';

    await setDoc(
      doc(db, 'users', user.uid),
      {
        role: inferredRole,
        email: user.email ?? '',
        created_at: new Date().toISOString(),
      },
      { merge: true }
    );

    return inferredRole;
  } catch (error) {
    console.error('Error resolving user role:', error);
    return 'customer';
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser ?? null);
      const resolvedRole = await resolveUserRole(currentUser);
      setRole(resolvedRole);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const resolvedRole = await resolveUserRole(result.user);
      setUser(result.user);
      setRole(resolvedRole);
      return { error: null, role: resolvedRole };
    } catch (error) {
      setUser(null);
      setRole(null);
      return { error: error as Error, role: null };
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, role, loading, signIn: handleSignIn, signOut: handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
