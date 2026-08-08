import React, { useEffect, useState, useRef } from 'react';
import { SiteVisitReport, getReport, createDraft, saveReport } from '../../../lib/engineerReports';
import { saveSiteVisit } from '../../../lib/siteVisits';
import { uploadFileToCloudinary } from '../../../lib/cloudinary';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import {
  ArrowLeft,
  User,
  MapPin,
  Sun,
  Gauge,
  Zap,
  PenTool,
  Paperclip,
  Save,
  Send,
  X,
  CheckCircle,
  Trash2,
  Building,
  Clock,
  Shield,
  AlertCircle,
  Check,
  Loader2,
  FileText,
  Home,
  HardHat,
  Navigation,
  TrendingUp,
  Battery,
  Camera,
  FolderOpen,
  Smartphone,
  Wifi,
  Database
} from 'lucide-react';

// Helper function to check if device is mobile
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Dropdown data constants
const cableTypes = ['Earthing', 'DC', 'AC'];
const panelBrands = ['TATA', 'adani', 'Waaree', 'Luminous', 'Surya', 'Jackson', 'Goutam', 'UTL'];
const panelTypes = ['Polycrystalline', 'Monocrystalline', 'Mono Half Cut', 'Bifacial', 'Topcon'];
const inverterTypes = ['Ongrid', 'Hybrid', 'Offgrid'];
const inverterBrands = ['Luminous', 'Servotec', 'UTL', 'DEYE', 'POM POWER', 'Visiontek', 'Cathod Power', 'V-Solel', 'Solex', 'Goodwe', 'Waaree'];
const batteryBrands = ['Luminous', 'Exide', 'Power Guard', 'Amaron', 'Eastman', 'Power Build', 'No Battery'];
const batteryTypes = ['Lead Acid', 'Solar Lead Acid', 'Solar GEL', 'Lithium Ion', 'No Battery'];
const batteryPowers = ['80 AH', '100 AH', '150 AH', '200 AH', '220 AH', '250 AH', '300 AH', '350 AH', 'Nil'];
const quantities = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
const systemCapacities = ['1', '2', '3', '5', '10'];
const phaseTypes = ['Single Phase', 'Three Phase'];

function useFormState(id?: string) {
  const [report, setReport] = useState<SiteVisitReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      const d = createDraft();
      setReport(d);
      setLoading(false);
      return;
    }
    const existing = getReport(id);
    if (existing) {
      setReport(existing);
    } else {
      setReport(createDraft());
    }
    setLoading(false);
  }, [id]);

  return { report, setReport, loading } as const;
}

export function SiteVisitForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { report, setReport, loading } = useFormState(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = useState<string>('customer');
  const [uploadingAttachment, setUploadingAttachment] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/80 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-500 mt-4 font-medium text-lg">Loading form...</p>
          <p className="text-gray-400 text-sm">Preparing your report</p>
        </div>
      </div>
    );
  }

  if (!report) return null;

  if (id && report.status === 'approved') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/80 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 to-emerald-500" />
            <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200/50">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-green-700 mb-3">Report Approved</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              This report has already been approved and cannot be edited. Please contact the administrator for any changes.
            </p>
            <Link
              to="/admin/engineer-portal/reports"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3.5 rounded-2xl font-semibold hover:shadow-xl hover:shadow-green-600/30 hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Reports
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const update = (patch: Partial<SiteVisitReport>) => {
    const updated: SiteVisitReport = {
      ...report,
      ...patch,
      updated_at: new Date().toISOString(),
    };
    setReport(updated);
    saveReport(updated);
    
    Object.keys(patch).forEach(key => {
      if (formErrors[key]) {
        setFormErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[key];
          return newErrors;
        });
      }
    });
  };

  const handleFieldTouch = (field: string) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!report.customer_name?.trim()) {
      errors.customer_name = 'Customer name is required';
    }
    if (!report.phone_number?.trim()) {
      errors.phone_number = 'Phone number is required';
    }
    if (!report.address?.trim()) {
      errors.address = 'Address is required';
    }
    if (!report.engineer_name?.trim()) {
      errors.engineer_name = 'Engineer name is required';
    }
    if (!report.engineer_mobile?.trim()) {
      errors.engineer_mobile = 'Engineer mobile number is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstErrorField = Object.keys(formErrors)[0];
      if (firstErrorField) {
        const element = document.getElementById(`field-${firstErrorField}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
      return;
    }
    
    setIsSubmitting(true);
    
    const updated: SiteVisitReport = {
      ...report,
      status: 'submitted',
      updated_at: new Date().toISOString(),
      engineer_id: user?.uid ?? report.engineer_id,
    };
    saveReport(updated);
    
    try {
      const res = await saveSiteVisit(updated);
      if (res.source === 'firestore') {
        alert('✅ Report submitted successfully! ID: ' + res.id);
      } else {
        alert('📝 Report saved locally (offline mode). Will sync when online.');
      }
      navigate('/admin/engineer-portal/reports');
    } catch (err) {
      console.error('submit error', err);
      alert('⚠️ Failed to submit — saved as draft locally.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    const draft: SiteVisitReport = {
      ...report,
      status: 'draft',
      engineer_id: user?.uid ?? report.engineer_id,
      updated_at: new Date().toISOString(),
    };
    saveReport(draft);
    setSavedMessage('✅ Draft saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleFileUpload = (category: string) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploadingAttachment(category);
    
    try {
      const uploadedAttachments = await Promise.all(
        Array.from(files).map(async (file) => {
          const baseAttachment = {
            name: file.name,
            type: file.type,
            size: file.size,
            category,
          } as const;

          if (file.type.startsWith('image/')) {
            try {
              const uploadResult = await uploadFileToCloudinary(file, 'image');
              return {
                ...baseAttachment,
                url: uploadResult.url,
                public_id: uploadResult.publicId,
                data: uploadResult.url,
              };
            } catch (uploadError) {
              console.warn('Cloudinary upload failed, using local preview:', uploadError);
              return {
                ...baseAttachment,
                data: URL.createObjectURL(file),
              };
            }
          }

          return {
            ...baseAttachment,
            data: URL.createObjectURL(file),
          };
        })
      );

      update({ attachments: [...(report.attachments || []), ...uploadedAttachments] });
      
      setSavedMessage(`✅ ${files.length} file(s) uploaded successfully!`);
      setTimeout(() => setSavedMessage(''), 3000);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploadingAttachment(null);
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeAttachment = (index: number) => {
    const current = report.attachments || [];
    // Revoke object URL to free memory
    const attachment = current[index];
    if (attachment && (attachment as any).data) {
      URL.revokeObjectURL((attachment as any).data);
    }
    update({ attachments: current.filter((_, i) => i !== index) });
  };

  const sections = [
    { id: 'customer', label: 'Customer', icon: User },
    { id: 'site', label: 'Site Details', icon: MapPin },
    { id: 'measurements', label: 'Measurements', icon: Gauge },
    { id: 'equipment', label: 'Equipment', icon: Building },
    { id: 'cable', label: 'Cable Details', icon: Wifi },
    { id: 'solar', label: 'Solar Analysis', icon: Sun },
    { id: 'recommendations', label: 'Recommendations', icon: TrendingUp },
    { id: 'technician', label: 'Technician', icon: HardHat },
    { id: 'remarks', label: 'Remarks', icon: PenTool },
  ];

  const inputClasses = (fieldName: string) => `
    w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-300 outline-none bg-white/50
    ${formErrors[fieldName] && touchedFields[fieldName] 
      ? 'border-red-300 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
      : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-gray-300'
    }
  `;

  const getCableFieldValue = (
    key: 'cable_type_earthing' | 'cable_measurement_earthing' | 'cable_type_dc' | 'cable_measurement_dc' | 'cable_type_ac' | 'cable_measurement_ac',
    fallback = ''
  ) => {
    const value = report?.[key];
    return typeof value === 'string' ? value : fallback;
  };

  const labelClasses = "block text-sm font-semibold text-gray-700 mb-1.5";

  // Attachment upload component with camera support
  const AttachmentUploadField = ({ 
    category, 
    label, 
    icon: Icon 
  }: { 
    category: string; 
    label: string; 
    icon: React.ElementType;
  }) => {
    const isUploading = uploadingAttachment === category;
    
    return (
      <div className="rounded-2xl border-2 border-dashed border-gray-200 p-4 hover:border-green-300 hover:bg-green-50/30 transition-all duration-300 bg-gray-50/50 group">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-green-100 transition-colors duration-300 flex items-center justify-center">
              <Icon className="h-5 w-5 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-700">{label}</p>
              <p className="text-xs text-gray-400">Upload or capture image from Original Document Only</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Gallery/File Upload */}
            <label
              onClick={handleCameraCapture}
              className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-green-600 shadow-sm border border-green-200 hover:bg-green-50 transition-all duration-300 cursor-pointer"
            >
              <FolderOpen className="h-4 w-4" />
              <span>Choose File</span>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload(category)}
                className="hidden"
                accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
                multiple
                disabled={isUploading}
              />
            </label>
            
            {/* Camera Capture - shows on mobile or when camera available */}
            {(isMobileDevice() || 'mediaDevices' in navigator) && (
              <>
                <label className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2.5 text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                  <Camera className="h-4 w-4" />
                  <span>Take Photo</span>
                  <input
                    type="file"
                    onChange={handleFileUpload(category)}
                    className="hidden"
                    accept="image/*"
                    capture="environment"
                    disabled={isUploading}
                  />
                </label>
                
                {/* Front camera option on mobile */}
                {isMobileDevice() && (
                  <label className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2.5 text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                    <Smartphone className="h-4 w-4" />
                    <span>Selfie</span>
                    <input
                      type="file"
                      onChange={handleFileUpload(category)}
                      className="hidden"
                      accept="image/*"
                      capture="user"
                      disabled={isUploading}
                    />
                  </label>
                )}
              </>
            )}
            
            {/* Drag and drop hint */}
            <div className="w-full text-xs text-gray-400 text-center mt-1">
              {isUploading ? (
                <span className="text-green-600 flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </span>
              ) : (
                <span>Drag & drop or click to upload</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/80 py-6 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <Link
              to="/admin/engineer-portal/reports"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 transition-all duration-300 group mb-1"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Reports</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-clip-text text-transparent">
              {id ? 'Edit Site Visit Report' : 'New Site Visit Report'}
            </h1>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              {new Date().toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-xl ${report.status === 'draft' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'} font-medium text-sm flex items-center gap-2`}>
              <Shield className="h-4 w-4" />
              {report.status === 'draft' ? 'Draft' : report.status}
            </div>
            {report.id && (
              <span className="text-sm text-gray-400 font-mono">#{report.id.slice(0, 8)}</span>
            )}
          </div>
        </div>

        {/* Success Message */}
        {savedMessage && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 text-green-700 flex items-center gap-3 animate-fadeIn shadow-sm">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">{savedMessage}</span>
          </div>
        )}

        {/* Progress Section Indicator */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-1 min-w-max">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    const element = document.getElementById(`section-${section.id}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      setActiveSection(section.id);
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md shadow-green-200'
                      : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-green-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* Form Header Gradient Bar */}
          <div className="h-2 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500" />
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8 lg:p-10">
            
            {/* Section: Customer Information */}
            <div id="section-customer" className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <User className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Customer Information</h3>
                  <p className="text-sm text-gray-400">Basic customer details</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div id="field-customer_name">
                  <label className={labelClasses}>
                    <span className="text-red-500">*</span> Customer Name
                  </label>
                  <input
                    value={report.customer_name}
                    onChange={(e) => update({ customer_name: e.target.value })}
                    onBlur={() => handleFieldTouch('customer_name')}
                    placeholder="Enter customer's full name"
                    className={inputClasses('customer_name')}
                    required
                  />
                  {formErrors.customer_name && touchedFields.customer_name && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {formErrors.customer_name}
                    </p>
                  )}
                </div>
                <div id="field-phone_number">
                  <label className={labelClasses}>
                    <span className="text-red-500">*</span> Phone Number
                  </label>
                  <input
                    value={report.phone_number}
                    onChange={(e) => update({ phone_number: e.target.value })}
                    onBlur={() => handleFieldTouch('phone_number')}
                    placeholder="Enter phone number"
                    className={inputClasses('phone_number')}
                    required
                  />
                  {formErrors.phone_number && touchedFields.phone_number && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {formErrors.phone_number}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2" id="field-address">
                  <label className={labelClasses}>
                    <span className="text-red-500">*</span> Address
                  </label>
                  <input
                    value={report.address}
                    onChange={(e) => update({ address: e.target.value })}
                    onBlur={() => handleFieldTouch('address')}
                    placeholder="Enter full address"
                    className={inputClasses('address')}
                    required
                  />
                  {formErrors.address && touchedFields.address && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {formErrors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section: Site Details */}
            <div id="section-site" className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl flex items-center justify-center shadow-sm">
                  <MapPin className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Site Details</h3>
                  <p className="text-sm text-gray-400">Location and installation information</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>
                    <Navigation className="h-4 w-4 inline mr-1 text-purple-400" />
                    GPS Location
                  </label>
                  <input
                    value={report.gps_location || ''}
                    onChange={(e) => update({ gps_location: e.target.value })}
                    placeholder="lat,lon or Google Maps link"
                    className={inputClasses('gps_location')}
                  />
                </div>
                <div>
                  <label className={labelClasses}>
                    <HardHat className="h-4 w-4 inline mr-1 text-purple-400" />
                    Installation Type
                  </label>
                  <select
                    value={report.installation_type || ''}
                    onChange={(e) => update({ installation_type: e.target.value })}
                    className={inputClasses('installation_type')}
                  >
                    <option value="">Select installation type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Agricultural">Agricultural</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>
                    <Home className="h-4 w-4 inline mr-1 text-purple-400" />
                    Roof Type
                  </label>
                  <select
                    value={report.roof_type || ''}
                    onChange={(e) => update({ roof_type: e.target.value })}
                    className={inputClasses('roof_type')}
                  >
                    <option value="">Select roof type</option>
                    <option value="Flat">Flat</option>
                    <option value="Sloped">Sloped</option>
                    <option value="Shed">Shed</option>
                    <option value="Complex">Complex</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>
                    <Home className="h-4 w-4 inline mr-1 text-purple-400" />
                    Roof Material
                  </label>
                  <select
                    value={report.roof_material || ''}
                    onChange={(e) => update({ roof_material: e.target.value })}
                    className={inputClasses('roof_material')}
                  >
                    <option value="">Select roof material</option>
                    <option value="Concrete">Concrete</option>
                    <option value="Metal">Metal</option>
                    <option value="Tile">Tile</option>
                    <option value="Asphalt">Asphalt</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section: System Measurements */}
            <div id="section-measurements" className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl flex items-center justify-center shadow-sm">
                  <Gauge className="h-5 w-5 text-cyan-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">System Measurements</h3>
                  <p className="text-sm text-gray-400">Physical measurements and specifications</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>
                    <Zap className="h-4 w-4 inline mr-1 text-cyan-400" />
                    System Capacity (kW)
                  </label>
                  <select
                    value={report.system_capacity || ''}
                    onChange={(e) => update({ system_capacity: e.target.value })}
                    className={inputClasses('system_capacity')}
                  >
                    <option value="">Select system capacity</option>
                    {systemCapacities.map((capacity) => (
                      <option key={capacity} value={capacity}>{capacity} kW</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>
                    <Zap className="h-4 w-4 inline mr-1 text-cyan-400" />
                    Phase Type
                  </label>
                  <select
                    value={report.phase_type || ''}
                    onChange={(e) => update({ phase_type: e.target.value })}
                    className={inputClasses('phase_type')}
                  >
                    <option value="">Select phase type</option>
                    {phaseTypes.map((phase) => (
                      <option key={phase} value={phase}>{phase}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>
                    <Building className="h-4 w-4 inline mr-1 text-cyan-400" />
                    South Height (feet)
                  </label>
                  <input
                    value={report.structure_height_low || ''}
                    onChange={(e) => update({ structure_height_low: e.target.value })}
                    placeholder="e.g. 8.2 ft"
                    className={inputClasses('structure_height_low')}
                  />
                </div>
                <div>
                  <label className={labelClasses}>
                    <Building className="h-4 w-4 inline mr-1 text-cyan-400" />
                    North Height (feet)
                  </label>
                  <input
                    value={report.structure_height_high || ''}
                    onChange={(e) => update({ structure_height_high: e.target.value })}
                    placeholder="e.g. 13.8 ft"
                    className={inputClasses('structure_height_high')}
                  />
                </div>
                <div>
                  <label className={labelClasses}>
                    <ArrowLeft className="h-4 w-4 inline mr-1 text-cyan-400" />
                    North/South Distance (feet)
                  </label>
                  <input
                    value={report.north_south_distance || ''}
                    onChange={(e) => update({ north_south_distance: e.target.value })}
                    placeholder="e.g. 19.7 ft"
                    className={inputClasses('north_south_distance')}
                  />
                </div>
                <div>
                  <label className={labelClasses}>
                    <ArrowLeft className="h-4 w-4 inline mr-1 text-cyan-400" />
                    East/West Distance (feet)
                  </label>
                  <input
                    value={report.east_west_distance || ''}
                    onChange={(e) => update({ east_west_distance: e.target.value })}
                    placeholder="e.g. 16.4 ft"
                    className={inputClasses('east_west_distance')}
                  />
                </div>
              </div>
            </div>

            {/* Section: Equipment Summary */}
            <div id="section-equipment" className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center shadow-sm">
                  <Building className="h-5 w-5 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Equipment Summary</h3>
                  <p className="text-sm text-gray-400">Solar panel and inverter specifications</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>
                    <Battery className="h-4 w-4 inline mr-1 text-indigo-400" />
                    Panel Brand
                  </label>
                  <select
                    value={report.panel_brand || ''}
                    onChange={(e) => update({ panel_brand: e.target.value })}
                    className={inputClasses('panel_brand')}
                  >
                    <option value="">Select panel brand</option>
                    {panelBrands.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>
                    <Battery className="h-4 w-4 inline mr-1 text-indigo-400" />
                    Panel Type
                  </label>
                  <select
                    value={report.panel_type || ''}
                    onChange={(e) => update({ panel_type: e.target.value })}
                    className={inputClasses('panel_type')}
                  >
                    <option value="">Select panel type</option>
                    {panelTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>
                    <Zap className="h-4 w-4 inline mr-1 text-indigo-400" />
                    Inverter Type
                  </label>
                  <select
                    value={report.inverter_type || ''}
                    onChange={(e) => update({ inverter_type: e.target.value })}
                    className={inputClasses('inverter_type')}
                  >
                    <option value="">Select inverter type</option>
                    {inverterTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>
                    <Zap className="h-4 w-4 inline mr-1 text-indigo-400" />
                    Inverter Brand
                  </label>
                  <select
                    value={report.inverter_brand || ''}
                    onChange={(e) => update({ inverter_brand: e.target.value })}
                    className={inputClasses('inverter_brand')}
                  >
                    <option value="">Select inverter brand</option>
                    {inverterBrands.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>
                    <Battery className="h-4 w-4 inline mr-1 text-indigo-400" />
                    Battery Brand
                  </label>
                  <select
                    value={report.battery_brand || ''}
                    onChange={(e) => update({ battery_brand: e.target.value })}
                    className={inputClasses('battery_brand')}
                  >
                    <option value="">Select battery brand</option>
                    {batteryBrands.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>
                    <Battery className="h-4 w-4 inline mr-1 text-indigo-400" />
                    Battery Type
                  </label>
                  <select
                    value={report.battery_type || ''}
                    onChange={(e) => update({ battery_type: e.target.value })}
                    className={inputClasses('battery_type')}
                  >
                    <option value="">Select battery type</option>
                    {batteryTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>
                    <Battery className="h-4 w-4 inline mr-1 text-indigo-400" />
                    Battery Power
                  </label>
                  <select
                    value={report.battery_power || ''}
                    onChange={(e) => update({ battery_power: e.target.value })}
                    className={inputClasses('battery_power')}
                  >
                    <option value="">Select battery power</option>
                    {batteryPowers.map((power) => (
                      <option key={power} value={power}>{power}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>
                    <Database className="h-4 w-4 inline mr-1 text-indigo-400" />
                    Quantity
                  </label>
                  <select
                    value={report.battery_quantity || ''}
                    onChange={(e) => update({ battery_quantity: e.target.value })}
                    className={inputClasses('battery_quantity')}
                  >
                    <option value="">Select quantity</option>
                    {quantities.map((qty) => (
                      <option key={qty} value={qty}>{qty}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section: Cable Details */}
            <div id="section-cable" className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl flex items-center justify-center shadow-sm">
                  <Wifi className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Cable Details</h3>
                  <p className="text-sm text-gray-400">Cable specifications for the installation</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cableTypes.map((cableType) => (
                  <div key={cableType} className="md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                      <div>
                        <label className={labelClasses}>
                          <Wifi className="h-4 w-4 inline mr-1 text-amber-400" />
                          Cable Type
                        </label>
                        <select
                          value={
                            cableType === 'Earthing'
                              ? getCableFieldValue('cable_type_earthing', cableType)
                              : cableType === 'DC'
                                ? getCableFieldValue('cable_type_dc', cableType)
                                : getCableFieldValue('cable_type_ac', cableType)
                          }
                          onChange={(e) =>
                            update({
                              ...(cableType === 'Earthing'
                                ? { cable_type_earthing: e.target.value }
                                : cableType === 'DC'
                                  ? { cable_type_dc: e.target.value }
                                  : { cable_type_ac: e.target.value })
                            })
                          }
                          className={inputClasses(`cable_type_${cableType.toLowerCase()}`)}
                        >
                          <option value={cableType}>{cableType}</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>
                          <Zap className="h-4 w-4 inline mr-1 text-amber-400" />
                          Cable Measurement
                        </label>
                        <input
                          value={
                            cableType === 'Earthing'
                              ? getCableFieldValue('cable_measurement_earthing')
                              : cableType === 'DC'
                                ? getCableFieldValue('cable_measurement_dc')
                                : getCableFieldValue('cable_measurement_ac')
                          }
                          onChange={(e) =>
                            update({
                              ...(cableType === 'Earthing'
                                ? { cable_measurement_earthing: e.target.value }
                                : cableType === 'DC'
                                  ? { cable_measurement_dc: e.target.value }
                                  : { cable_measurement_ac: e.target.value })
                            })
                          }
                          placeholder={`e.g. ${cableType === 'Earthing' ? '50' : cableType === 'DC' ? '40' : '15'} mtr`}
                          className={inputClasses(`cable_measurement_${cableType.toLowerCase()}`)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Solar Analysis */}
            <div id="section-solar" className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl flex items-center justify-center shadow-sm">
                  <Sun className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Solar Analysis</h3>
                  <p className="text-sm text-gray-400">Shading, consumption, and capacity recommendations</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className={labelClasses}>
                    <Sun className="h-4 w-4 inline mr-1 text-yellow-400" />
                    Shadow Analysis
                  </label>
                  <textarea
                    value={report.shadow_analysis || ''}
                    onChange={(e) => update({ shadow_analysis: e.target.value })}
                    placeholder="Describe any shading issues, obstructions, or peak sun hours..."
                    rows={3}
                    className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-300 outline-none bg-white/50 resize-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 border-gray-200 hover:border-gray-300`}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>
                      <FileText className="h-4 w-4 inline mr-1 text-yellow-400" />
                      Electricity Bill (₹/month)
                    </label>
                    <input
                      value={report.electricity_bill || ''}
                      onChange={(e) => update({ electricity_bill: e.target.value })}
                      placeholder="e.g. 3000"
                      className={inputClasses('electricity_bill')}
                    />
                  </div>
              
                  <div>
                    <label className={labelClasses}>
                      <TrendingUp className="h-4 w-4 inline mr-1 text-yellow-400" />
                      Recommended Solar Capacity (kW)
                    </label>
                    <input
                      value={report.recommended_capacity || ''}
                      onChange={(e) => update({ recommended_capacity: e.target.value })}
                      placeholder="e.g. 5"
                      className={inputClasses('recommended_capacity')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Equipment Recommendations */}
            <div id="section-recommendations" className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl flex items-center justify-center shadow-sm">
                  <TrendingUp className="h-5 w-5 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Equipment Recommendations</h3>
                  <p className="text-sm text-gray-400">Suggested components for the installation</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>
                    <Zap className="h-4 w-4 inline mr-1 text-indigo-400" />
                    Inverter Recommendation
                  </label>
                  <input
                    value={report.inverter_recommendation || ''}
                    onChange={(e) => update({ inverter_recommendation: e.target.value })}
                    placeholder="e.g. Hybrid 5kW"
                    className={inputClasses('inverter_recommendation')}
                  />
                </div>
                <div>
                  <label className={labelClasses}>
                    <Battery className="h-4 w-4 inline mr-1 text-indigo-400" />
                    Panel Recommendation
                  </label>
                  <input
                    value={report.panel_recommendation || ''}
                    onChange={(e) => update({ panel_recommendation: e.target.value })}
                    placeholder="e.g. 10 x 550W Monocrystalline"
                    className={inputClasses('panel_recommendation')}
                  />
                </div>
              </div>
            </div>

            {/* Section: Additional Information */}
            <div id="section-remarks" className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <PenTool className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Additional Information</h3>
                  <p className="text-sm text-gray-400">Remarks and special notes</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className={labelClasses}>
                    <PenTool className="h-4 w-4 inline mr-1 text-gray-400" />
                    Remarks
                  </label>
                  <textarea
                    value={report.remarks || ''}
                    onChange={(e) => update({ remarks: e.target.value })}
                    placeholder="Any additional notes or observations..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-white/50 resize-none hover:border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Section: Attachments */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl flex items-center justify-center shadow-sm">
                  <Paperclip className="h-5 w-5 text-teal-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Attachments</h3>
                  <p className="text-sm text-gray-400">Supporting documents and images</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { key: 'Rooftop GPS Image', label: 'Rooftop GPS Image', icon: MapPin },
                  { key: 'Latest Electricity Bill', label: 'Latest Electricity Bill', icon: FileText },
                  { key: 'Aadhaar Copy', label: 'Aadhaar Copy', icon: Shield },
                  { key: 'PAN Card', label: 'PAN Card', icon: Shield },
                  { key: 'Bank Passbook', label: 'Bank Passbook', icon: FileText },
                  { key: 'Land Record', label: 'Land Record', icon: FileText },
                ].map((item) => (
                  <AttachmentUploadField
                    key={item.key}
                    category={item.key}
                    label={item.label}
                    icon={item.icon}
                  />
                ))}
              </div>
              
              {/* Uploaded Documents List */}
              {report.attachments && report.attachments.length > 0 && (
                <div className="mt-4 space-y-3">
                  <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Uploaded Documents ({report.attachments.length})
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {report.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between gap-3 bg-gray-50 rounded-xl p-3 border border-gray-200 hover:border-gray-300 transition-all duration-300">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                            {file.type?.startsWith('image/') ? (
                              <img 
                                src={(file as any).url || (file as any).data || ''} 
                                alt={file.name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            ) : (
                              <FileText className="h-5 w-5 text-blue-500" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.category || 'Other'} • {Math.round((file.size ?? 0) / 1024)} KB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t-2 border-gray-100 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-xl hover:shadow-green-600/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Submit Report
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium"
              >
                <Save className="h-5 w-5" />
                Save Draft
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/engineer-portal/reports')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-300 font-medium"
              >
                <X className="h-5 w-5" />
                Cancel
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-gradient-to-br from-slate-50 to-gray-100 p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Engineer Details</p>
                <div className="mt-3 space-y-3 text-sm text-gray-700">
                  <div>
                    <label className={labelClasses}>Engineer Name</label>
                    <input
                      value={report.engineer_name || ''}
                      onChange={(e) => update({ engineer_name: e.target.value })}
                      onBlur={() => handleFieldTouch('engineer_name')}
                      placeholder="Enter engineer name"
                      className={inputClasses('engineer_name')}
                      required
                    />
                    {formErrors.engineer_name && touchedFields.engineer_name && (
                      <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {formErrors.engineer_name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={labelClasses}>Mobile Number</label>
                    <input
                      value={report.engineer_mobile || ''}
                      onChange={(e) => update({ engineer_mobile: e.target.value })}
                      onBlur={() => handleFieldTouch('engineer_mobile')}
                      placeholder="Enter mobile number"
                      className={inputClasses('engineer_mobile')}
                      required
                    />
                    {formErrors.engineer_mobile && touchedFields.engineer_mobile && (
                      <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {formErrors.engineer_mobile}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Progress */}
            <div className="mt-6 flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span>Optional</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Auto-saved</span>
              </div>
            </div>

          </form>
        </div>

        {/* Form Helper */}
        <div className="mt-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="text-red-500">*</span> Required fields
            </span>
            <span className="w-px h-4 bg-gray-200" />
            <span className="flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-yellow-500" />
              Your progress is auto-saved as you type
            </span>
            <span className="w-px h-4 bg-gray-200" />
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-green-500" />
              Submit when complete
            </span>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .scroll-mt-20 {
          scroll-margin-top: 5rem;
        }
      `}</style>
    </div>
  );
}