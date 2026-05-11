import { useState, useEffect } from "react";

export default function TabBuilder({ baseUrl, authHeaders, quoteItems, setQuoteItems }) {
  const [levels, setLevels] = useState([]); // [{ items: [], selectedItem: null }]
  const [loading, setLoading] = useState(true);

  // Output Form State for the final selected leaf material
  const [finalMaterial, setFinalMaterial] = useState(null);
  const [inputL, setInputL] = useState(0);
  const [inputW, setInputW] = useState(0);
  const [inputQ, setInputQ] = useState(0);
  const [overrideName, setOverrideName] = useState("");

  useEffect(() => {
    fetchRoots();
    // eslint-disable-next-line
  }, []);

  const fetchRoots = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/quoting/materials/roots`);
      const roots = await res.json();
      setLevels([{ items: roots, selectedItem: null }]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSelect = async (levelIndex, itemId) => {
    // Slice off any levels after the current one because they changed path
    const newLevels = levels.slice(0, levelIndex + 1);
    const currentLevel = newLevels[levelIndex];
    const item = currentLevel.items.find(i => i.id === parseInt(itemId));
    
    currentLevel.selectedItem = item;
    setFinalMaterial(null); // reset forms

    if (!item) {
      setLevels(newLevels);
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/quoting/materials/${item.id}/children`);
      const children = await res.json();
      
      if (children.length > 0) {
        // It has children, so push another level dropdown!
        newLevels.push({ items: children, selectedItem: null });
      } else {
        // LEAF NODE! We reached the end. Show the form.
        setFinalMaterial(item);
        setOverrideName(item.name);
        setInputL(0);
        setInputW(0);
        setInputQ(1);
      }
      setLevels(newLevels);
    } catch (err) {
      console.error(err);
    }
  };

  const computeTotals = () => {
    if (!finalMaterial) return { qty: 0, total: 0 };
    let qty = 0;
    
    if (finalMaterial.calculation_type === 'area') {
      const sqft = inputL * inputW;
      qty = Math.ceil(sqft / (finalMaterial.coverage_value || 1));
    } else if (finalMaterial.calculation_type === 'linear') {
      qty = Math.ceil(inputL / (finalMaterial.coverage_value || 1));
    } else if (finalMaterial.calculation_type === 'framing') {
      qty = Math.ceil((inputL / 174) + (inputL / (finalMaterial.coverage_value || 1)) + 1);
    } else {
      qty = inputQ;
    }
    
    // Ensure qty is at least 0
    if(qty < 0 || isNaN(qty)) qty = 0;
    
    const price = finalMaterial.unit_price || 0;
    const total = qty * price;
    return { qty, total };
  };

  const handleAdd = () => {
    const { qty, total } = computeTotals();
    const newItem = {
      material_id: finalMaterial.id,
      override_name: overrideName,
      input_length: inputL,
      input_width: inputW,
      input_quantity: inputQ,
      calculated_quantity: qty,
      unit_price: finalMaterial.unit_price || 0,
      total_price: total,
      unit_type: finalMaterial.unit_type || 'unit'
    };

    setQuoteItems([...quoteItems, newItem]);
    
    // Show success feedback
    alert(`${overrideName} added to Quote! (${qty} units)`);
    
    // Optionally reset builder
    setLevels([{ items: levels[0].items, selectedItem: null }]);
    setFinalMaterial(null);
  };

  if (loading) return <div>Loading Quote Builder Engine...</div>;

  const { qty, total } = computeTotals();

  return (
    <div className="q-builder">
      <h3>Quote Builder</h3>
      <p>Select materials step-by-step from the database hierarchy.</p>

      {/* Cascading Dropdowns */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {levels.map((level, idx) => (
          <div key={idx} className="q-builder__step">
            <h3>Step {idx + 1}</h3>
            <select 
              className="q-select" 
              value={level.selectedItem ? level.selectedItem.id : ""}
              onChange={(e) => handleSelect(idx, e.target.value)}
            >
              <option value="">-- Select an option --</option>
              {level.items.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Output Form for Leaf Nodes */}
      {finalMaterial && (
        <div style={{ background: '#f0f5fa', border: '1px solid #b8daff', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#0056b3', marginTop: 0 }}>Configure Line Item</h3>
          
          <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <div>
              <label>Custom Description (Optional Override)</label>
              <input type="text" className="q-input" value={overrideName} onChange={e => setOverrideName(e.target.value)} />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div>
                <label>Unit Price</label>
                <input type="text" className="q-input" value={`$${finalMaterial.unit_price}`} disabled style={{ background: '#e9ecef'}} />
                <small style={{display:'block', marginTop:'0.2rem'}}>Calc Mode: {finalMaterial.calculation_type}</small>
              </div>

              {/* Dynamic Formula Fields */}
              {finalMaterial.calculation_type === 'area' && (
                <>
                  <div>
                    <label>Wall Length (ft)</label>
                    <input type="number" className="q-input" value={inputL} onChange={e => setInputL(parseFloat(e.target.value))} />
                  </div>
                  <div>
                    <label>Wall Height/Width (ft)</label>
                    <input type="number" className="q-input" value={inputW} onChange={e => setInputW(parseFloat(e.target.value))} />
                  </div>
                </>
              )}

              {finalMaterial.calculation_type === 'linear' && (
                <div>
                  <label>Wall Length (ft)</label>
                  <input type="number" className="q-input" value={inputL} onChange={e => setInputL(parseFloat(e.target.value))} />
                </div>
              )}

              {finalMaterial.calculation_type === 'framing' && (
                <div>
                  <label>Wall Length (ft)</label>
                  <input type="number" className="q-input" value={inputL} onChange={e => setInputL(parseFloat(e.target.value))} />
                </div>
              )}

              {finalMaterial.calculation_type === 'direct' && (
                <div>
                  <label>Manual Quantity</label>
                  <input type="number" className="q-input" value={inputQ} onChange={e => setInputQ(parseFloat(e.target.value))} />
                </div>
              )}
            </div>

            <div className="q-builder__result">
              <div>
                <span>Calculated Requirement: </span>
                <strong>{qty} {finalMaterial.unit_type}(s)</strong>
              </div>
              <div>
                <span>Total Line Price: </span>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>

            <button className="q-btn" style={{alignSelf: 'flex-start', background:'#28a745', border:'none', color:'white'}} onClick={handleAdd}>
              ★ Add to Customer Quote
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
