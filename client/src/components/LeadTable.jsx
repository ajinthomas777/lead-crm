
export default function LeadTable({ leads, loading, onEdit, onDelete }) {
  if (loading) return <p className="muted">Loading leads...</p>;
  if (leads.length === 0) return <p className="muted">No leads found.</p>;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              {/* <td>{lead.status || 'New'}</td> */}

              <td>
  <span className={`status status-${(lead.status || 'New').toLowerCase()}`}>
    {lead.status || 'New'}
  </span>
</td>

              <td className="row-actions">
                <button
                  className="secondary"
                  onClick={() => onEdit(lead)}
                >
                  Edit
                </button>

                <button
                  className="danger"
                  onClick={() => onDelete(lead)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
