import { useEffect, useState } from 'react';
import { 
  Save, 
  Phone, 
  Mail, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle,
  Globe,
  Shield,
  Clock,
  RefreshCw,
  Edit,
  Eye,
  EyeOff,
  Lock,
  User,
  Settings as SettingsIcon,
  Smartphone,
  AtSign,
  Send,
  Copy,
  Check,
  X,
  ArrowRight,
  Info,
  HelpCircle,
  TrendingUp,
  BarChart3,
  Activity
} from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, ContactInfo } from '../../lib/firebase';

export function SettingsPage() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPhonePreview, setShowPhonePreview] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

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
      setSuccessMessage('Failed to save settings. Please try again.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }

    setSaving(false);
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-500 mt-4 font-medium">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <SettingsIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Contact Settings
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">Manage your company contact information displayed on the website</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Live</span>
            </div>
            <button
              onClick={loadContactInfo}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-300"
              title="Refresh"
            >
              <RefreshCw className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" />
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 animate-slideDown ${
            successMessage.includes('Failed') 
              ? 'bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-700'
              : 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700'
          }`}>
            {successMessage.includes('Failed') ? (
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
            ) : (
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
            )}
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Form Header Gradient Bar */}
          <div className="h-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600" />
          
          <form onSubmit={handleSave} className="p-6 md:p-8 space-y-8">
            
            {/* Phone Number Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl blur-sm"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Phone Number</h3>
                    <p className="text-sm text-gray-500">Used for the call button on the website</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPhonePreview(!showPhonePreview)}
                    className="ml-auto text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    {showPhonePreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showPhonePreview ? 'Hide' : 'Preview'}
                  </button>
                </div>
                
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                    placeholder="+1234567890"
                  />
                </div>
                
                {showPhonePreview && phone && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-medium">Preview:</span>
                      <span className="text-blue-600">{phone}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(phone, 'phone')}
                        className="ml-auto text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        {copied === 'phone' ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        {copied === 'phone' ? 'Copied' : 'Copy'}
                      </button>
                    </p>
                  </div>
                )}
                
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Include country code for international accessibility
                </p>
              </div>
            </div>

            {/* Email Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-rose-50/50 rounded-2xl blur-sm"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-red-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Email Address</h3>
                    <p className="text-sm text-gray-500">For customer inquiries</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <AtSign className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                    placeholder="info@solarenterprises.com"
                  />
                </div>
                
                <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-200">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="font-medium">Subject Line:</span>
                    <span className="text-red-600">"Solar Panel Installation Enquiry"</span>
                  </p>
                </div>
                
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Subject will be pre-filled for customer emails
                </p>
              </div>
            </div>

            {/* WhatsApp Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-2xl blur-sm"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">WhatsApp Number</h3>
                    <p className="text-sm text-gray-500">For WhatsApp chat button</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                    placeholder="+1234567890"
                  />
                </div>
                
                <div className="mt-3 p-3 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="font-medium">Pre-filled Message:</span>
                    <span className="text-green-600 text-xs">"Hello, I am interested in solar panel installation for my home. Please contact me."</span>
                  </p>
                </div>
                
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Include country code for international numbers
                </p>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
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

        {/* Important Notes */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Info className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Important Notes</h3>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span className="text-sm">All changes are reflected <strong className="text-blue-600">immediately</strong> on the public website</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span className="text-sm">Use complete phone numbers with <strong className="text-blue-600">country codes</strong> for international accessibility</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span className="text-sm">Test all contact methods after updating to ensure they work correctly</span>
            </li>
          </ul>
        </div>

        {/* Quick Preview Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 font-medium">Phone</p>
            <p className="text-sm font-semibold text-gray-800 mt-1 truncate">{phone || 'Not set'}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Mail className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-xs text-gray-500 font-medium">Email</p>
            <p className="text-sm font-semibold text-gray-800 mt-1 truncate">{email || 'Not set'}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 font-medium">WhatsApp</p>
            <p className="text-sm font-semibold text-gray-800 mt-1 truncate">{whatsapp || 'Not set'}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-blue-500" />
              Secure Settings
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-gray-400" />
              Auto-save enabled
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span>v2.0.1</span>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}