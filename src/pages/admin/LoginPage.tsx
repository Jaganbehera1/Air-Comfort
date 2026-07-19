import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sun, 
  LogIn, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  ArrowLeft,
  Sparkles,
  Zap,
  CheckCircle,
  AlertCircle,
  User,
  Home
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError, role } = await signIn(email, password);

    if (signInError) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      if (role === 'engineer') {
        navigate('/admin/engineer-portal/create');
      } else if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-10 left-20 animate-float">
          <Sparkles className="h-6 w-6 text-yellow-400/30" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float-delayed">
          <Zap className="h-8 w-8 text-green-400/20" />
        </div>
        <div className="absolute top-1/3 right-10 animate-float">
          <Sun className="h-5 w-5 text-orange-400/20" />
        </div>
        <div className="absolute bottom-1/3 left-10 animate-float-delayed">
          <Shield className="h-7 w-7 text-blue-400/20" />
        </div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Floating Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
          
          {/* Glowing Border Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative">
            {/* Logo Section */}
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-yellow-400 via-green-500 to-blue-500 p-4 rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Sun className="h-14 w-14 text-white" />
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-center text-white mb-2 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-center text-white/70 mb-8 text-sm">
              Sign in to access the admin panel
            </p>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-200 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 animate-shake">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-white/80 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-green-400 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all duration-300 outline-none"
                    placeholder="admin@solarenterprises.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-white/80 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-green-400 transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all duration-300 outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${
                      rememberMe 
                        ? 'border-green-400 bg-green-400' 
                        : 'border-white/30 bg-white/5 group-hover:border-white/50'
                    }`}>
                      {rememberMe && <CheckCircle className="h-4 w-4 text-white" />}
                    </div>
                  </div>
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-sm text-green-400 hover:text-green-300 transition-colors font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 text-white py-3.5 rounded-xl font-bold hover:shadow-2xl hover:shadow-green-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn className="h-5 w-5" />
                    <span>Sign In</span>
                  </div>
                )}
              </button>
            </form>

            {/* Back Link */}
            <div className="mt-6 text-center">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group text-sm"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Website
              </a>
            </div>

            {/* Footer Text */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-white/40">
                <span className="flex items-center justify-center gap-1">
                  <Shield className="h-3 w-3" />
                  Secure Admin Access
                </span>
              </p>
              <p className="text-xs text-white/30 mt-1">
                v2.0.1 • Air Comfort Admin
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Text */}
        <div className="mt-6 text-center text-white/30 text-xs">
          <span className="inline-flex items-center gap-2">
            <span className="w-8 h-px bg-white/20"></span>
            Powered by Air Comfort
            <span className="w-8 h-px bg-white/20"></span>
          </span>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}