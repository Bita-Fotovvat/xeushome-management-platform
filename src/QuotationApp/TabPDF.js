import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function TabPDF({ quoteItems, setQuoteItems, baseUrl, authHeaders }) {
  const [clientName, setClientName] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [saving, setSaving] = useState(false);

  const grandTotal = quoteItems.reduce((acc, item) => acc + item.total_price, 0);

  const removeRow = (index) => {
    const newItems = [...quoteItems];
    newItems.splice(index, 1);
    setQuoteItems(newItems);
  };

  const saveToDatabase = async () => {
    if (!clientName) return alert("Please enter a Client Name first!");
    
    setSaving(true);
    try {
      const payload = {
        client_name: clientName,
        project_address: projectAddress,
        grand_total: grandTotal,
        line_items: quoteItems
      };
      
      const res = await fetch(`${baseUrl}/api/quoting/quotes`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(payload)
      });
      
      if(res.ok) {
        alert("Quote safely stored in Database!");
        // Clear items
        setQuoteItems([]);
        setClientName("");
      } else {
        alert("Error saving quote.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const generatePDF = () => {
    if (!clientName) return alert("Please enter a Client Name for the PDF!");
    if (quoteItems.length === 0) return alert("Add items to the quote first!");

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(212, 175, 55); // Golden accent
    doc.text("Xeus Home Renovations", 14, 22);
    
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text("Customer Quotation Map", 14, 30);
    doc.text(`Client: ${clientName}`, 14, 38);
    if(projectAddress) doc.text(`Address: ${projectAddress}`, 14, 44);
    
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 38);

    // Table Data
    const tableBody = quoteItems.map(item => [
      item.override_name,
      `${item.calculated_quantity} ${item.unit_type}`,
      `$${item.unit_price.toFixed(2)}`,
      `$${item.total_price.toFixed(2)}`
    ]);

    doc.autoTable({
      startY: 55,
      head: [['Material / Description', 'Quantity', 'Unit Price', 'Total']],
      body: tableBody,
      theme: 'grid',
      headStyles: { fillColor: [44, 62, 80] },
      foot: [['', '', 'Grand Total:', `$${grandTotal.toFixed(2)}`]],
      footStyles: { fillColor: [240, 240, 240], textColor: [0,0,0], fontStyle: 'bold' },
    });

    // Footer note
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for choosing Xeus Home. This is an estimated quotation.", 14, doc.lastAutoTable.finalY + 15);

    // Save
    doc.save(`XeusHome_Quote_${clientName.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="q-pdf">
      <h3>Customer Quotation Preview</h3>
      <p>Review the line items, assign a client, and generate the master PDF.</p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', background: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>
        <div style={{ flex: 1 }}>
          <label>Client Name *</label>
          <input type="text" className="q-input" value={clientName} onChange={e => setClientName(e.target.value)} />
        </div>
        <div style={{ flex: 1 }}>
          <label>Project Address</label>
          <input type="text" className="q-input" value={projectAddress} onChange={e => setProjectAddress(e.target.value)} />
        </div>
      </div>

      {quoteItems.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', background: '#f8f9fa', color: '#666', borderRadius: '4px' }}>
          No items added to quote yet. Go to the Quote Builder tab.
        </div>
      ) : (
        <>
          <table className="q-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {quoteItems.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.override_name}</td>
                  <td>{item.calculated_quantity} {item.unit_type}</td>
                  <td>${item.unit_price.toFixed(2)}</td>
                  <td>${item.total_price.toFixed(2)}</td>
                  <td style={{textAlign: 'right'}}>
                    <button className="q-btn q-btn--small q-btn--danger" onClick={() => removeRow(idx)}>✕</button>
                  </td>
                </tr>
              ))}
              <tr className="q-table__total">
                <td colSpan="3" style={{textAlign: 'right'}}>Grand Total:</td>
                <td colSpan="2">${grandTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button className="q-btn" style={{ background: '#0056b3', border: 'none', color: 'white' }} onClick={generatePDF}>
              📄 Generate & Download PDF
            </button>
            <button className="q-btn q-btn--outline" onClick={saveToDatabase} disabled={saving}>
              {saving ? "Saving..." : "💾 Save Quote to Database"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
