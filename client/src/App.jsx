import { useEffect, useState } from 'react';
import { getLeads, createLead, updateLead, deleteLead } from './api';
import LeadForm from './components/LeadForm.jsx';
import LeadTable from './components/LeadTable.jsx';

export default function App() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [editingLead, setEditingLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadLeads = async (term = search) => {
    try {
      setLoading(true);
      setLeads(await getLeads(term));
    } catch {
      setError('Could not load leads. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  // Search: re-fetch 300ms after the user stops typing
  useEffect(() => {
    const timer = setTimeout(() => loadLeads(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSubmit = async (data) => {
    setError('');
    setSaving(true);
    try {
      if (editingLead) {
        await updateLead(editingLead._id, data);
        setEditingLead(null);
      } else {
        await createLead(data);
      }
      await loadLeads();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (lead) => {
    if (!window.confirm(`Delete ${lead.name}?`)) return;
    try {
      await deleteLead(lead._id);
      if (editingLead?._id === lead._id) setEditingLead(null);
      await loadLeads();
    } catch {
      setError('Could not delete the lead');
    }
  };

  return (
    <div className="container">
      <h1>Lead CRM</h1>
      {error && <div className="error">{error}</div>}

      <LeadForm
        editingLead={editingLead}
        onSubmit={handleSubmit}
        onCancel={() => setEditingLead(null)}
        saving={saving}
      />

      <div className="card">
        <div className="toolbar">
          <h2>All Leads ({leads.length})</h2>
          <input
            className="search"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <LeadTable leads={leads} loading={loading} onEdit={setEditingLead} onDelete={handleDelete} />
      </div>
    </div>
  );
}
