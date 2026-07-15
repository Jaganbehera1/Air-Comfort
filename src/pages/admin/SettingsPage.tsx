import { useEffect, useState } from 'react';
import { Save, Phone, Mail, MessageCircle } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, ContactInfo } from '../../lib/firebase';

export function SettingsPage() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadContactInfo();
  }, []);

  const loadContactInfo = async () => {
    setLoading(true);
    try {
      const docSnap = await getDoc(doc(db, 'contact_info', 'default'));
      if (docSnap.exists()) {
        const data = docSnap.data() as ContactInfo;
        setPhone(data.phone_number || '');
        setEmail(data.email || '');
        setWhatsapp(data.whatsapp_number || '');
      }
    } catch (error) {
      console.error('Error loading contact info:', error);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');

    try {
      await setDoc(
        doc(db, 'contact_info', 'default'),
        {
          phone_number: phone.trim(),
          email: email.trim(),
          whatsapp_number: whatsapp.trim(),
          updated_at: new Date().toISOString(),
        },
        { merge: true }
      );

      setSuccessMessage('Settings saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      await loadContactInfo();
    } catch (error) {
      console.error('Error saving settings:', error);
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Contact Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your company contact information displayed on the website
          </p>
        </div>

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6 flex items-center space-x-2">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSave} className="space-y-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Phone Number</h3>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1234567890"
              />
              <p className="text-sm text-gray-600 mt-2">
                This number will be used for the call button on the website
              </p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-red-600 p-2 rounded-lg">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Email Address</h3>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="info@solarenterprises.com"
              />
              <p className="text-sm text-gray-600 mt-2">
                Email address for customer inquiries. Subject line will be pre-filled as
                "Solar Panel Installation Enquiry"
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">WhatsApp Number</h3>
              </div>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="+1234567890"
              />
              <p className="text-sm text-gray-600 mt-2">
                WhatsApp number with country code. Clicking the WhatsApp button will open a
                chat with the pre-filled message:
              </p>
              <div className="mt-3 bg-white p-3 rounded border border-green-200 italic text-gray-700">
                "Hello, I am interested in solar panel installation for my home. Please contact me."
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-6 w-6" />
                  <span>Save Settings</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-900 mb-3">Important Notes:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>All changes are reflected immediately on the public website</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Make sure to use complete phone numbers with country codes for international accessibility</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Test all contact methods after updating to ensure they work correctly</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
