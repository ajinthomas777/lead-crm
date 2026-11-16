
import { useEffect, useState } from 'react';

// Default values when adding a new lead
const empty = {
  name: '',
  email: '',
  phone: '',
  status: 'New'
};

// Used for both "Add Lead" and "Edit Lead"
export default function LeadForm({ editingLead, onSubmit, onCancel, saving }) {
  const [form, setForm] = useState(empty);

  // When editing, fill the form with the selected lead's details
  useEffect(() => {
    setForm(
      editingLead
        ? {
            name: editingLead.name,
            email: editingLead.email,
            phone: editingLead.phone,
            status: editingLead.status || 'New'
          }
        : empty
    );
  }, [editingLead]);

  // Update the field that the user changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit the form to the parent component
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await onSubmit(form);
    if (ok) setForm(empty);
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{editingLead ? 'Edit Lead' : 'Add Lead'}</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Converted">Converted</option>
      </select>

      <div className="actions">
        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : editingLead ? 'Update Lead' : 'Add Lead'}
        </button>

        {editingLead && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
