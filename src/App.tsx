import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { GalleryPage } from './pages/public/GalleryPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { GalleryManagementPage } from './pages/admin/GalleryManagementPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { AdminOnlineAssistancePage } from './pages/admin/OnlineAssistancePage';
import { EngineerPortalPage } from './pages/admin/EngineerPortalPage';
import { SiteVisitsPage } from './pages/admin/SiteVisitsPage';
import { SiteVisitForm } from './pages/admin/engineer/SiteVisitForm';
import { ReportsListPage } from './pages/admin/engineer/ReportsListPage';
import { ReportViewPage } from './pages/admin/engineer/ReportViewPage';
import { QuotationPage } from './pages/public/QuotationPage';
import { SCMPage } from './pages/public/SCMPage';
import { QuotationsPage } from './pages/admin/QuotationsPage';
import { ContactRequestsPage } from './pages/admin/ContactRequestsPage';
import { LearningPage } from './pages/public/LearningPage';
import { ServicePageTemplate } from './pages/public/ServicePageTemplate';
import { LocationPageTemplate } from './pages/public/LocationPageTemplate';
import { BlogPage } from './pages/public/BlogPage';
import { BlogPostPage } from './pages/public/BlogPostPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServicePageTemplate />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/quotation" element={<QuotationPage />} />
              <Route path="/learning" element={<LearningPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/locations/:slug" element={<LocationPageTemplate />} />
              <Route path="/scm" element={<SCMPage />} />
            </Route>

            {/* Admin Login */}
            <Route path="/admin/login" element={<LoginPage />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin', 'engineer']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="gallery" element={<GalleryManagementPage />} />
              <Route path="engineer-portal" element={<EngineerPortalPage />}>
                <Route path="create" element={<SiteVisitForm />} />
                <Route path="reports" element={<ReportsListPage />} />
                <Route path="reports/:id" element={<ReportViewPage />} />
                <Route index element={<div />} />
              </Route>
              <Route path="site-visits" element={<SiteVisitsPage />} />
              <Route path="online-assistance" element={<AdminOnlineAssistancePage />} />
              <Route path="quotations" element={<QuotationsPage />} />
              <Route
                path="contact-requests"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ContactRequestsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="settings"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;