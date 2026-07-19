import { useEffect, useState } from 'react';
import { Mail, Phone, Clock3, MessageSquareText, CheckCircle2, Sparkles } from 'lucide-react';
import { ContactRequest } from '../../lib/firebase';
import { listContactRequests } from '../../lib/contactRequests';

export function ContactRequestsPage() {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await listContactRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error loading contact requests:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              <Mail className="h-4 w-4" />
              Contact Requests
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Customer enquiries</h1>
            <p className="mt-2 text-gray-600">Review all customer messages submitted from the public contact form.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-sm text-gray-500">Total requests</p>
            <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <Sparkles className="mx-auto h-8 w-8 animate-pulse text-green-500" />
            <p className="mt-3 font-medium text-gray-600">Loading enquiries...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
            <MessageSquareText className="mx-auto h-10 w-10 text-gray-400" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">No contact requests yet</h2>
            <p className="mt-2 text-gray-600">Messages submitted from the website will appear here automatically.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold text-gray-900">{request.name}</h2>
                      <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
                        {request.status || 'new'}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>{request.email}</span>
                      </div>
                      {request.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span>{request.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-orange-500" />
                        <span>{request.created_at ? new Date(request.created_at).toLocaleString() : 'Unknown time'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="max-w-xl rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      {request.subject || 'General enquiry'}
                    </div>
                    <p className="whitespace-pre-line text-sm leading-7 text-gray-700">{request.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
