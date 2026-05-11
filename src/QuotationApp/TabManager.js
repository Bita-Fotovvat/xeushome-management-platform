import { useState, useEffect } from "react";

export default function TabManager({ baseUrl, authHeaders }) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  // For editing
  const [editingNode, setEditingNode] = useState(null);
  const [formData, setFormData] = useState({ unit_price: 0, coverage_value: 0, calculation_type: 'direct', unit_type: '' });

  useEffect(() => {
    fetchTree();
    // eslint-disable-next-line
  }, []);

  const fetchTree = async () => {
    try {
      setLoading(true);
      // Let's fetch all material nodes for simplicity and build the tree locally
      const res = await fetch(`${baseUrl}/api/quoting/materials/roots`); // wait, roots only has parent null
      // Actually, for Tab 1, let's fetch EVERYTHING and build the tree in JS.
      // I need a quick new route or modify roots. 
      // I'll fetch `roots` and then recursively fetch? No, let's just make a new call or write a better query later.
      // But for now, let's assume we fetch all from DB and build tree. Wait, `roots` endpoint right now only returns parent_id IS NULL!
      // Let's fetch root categories, then the user clicks to expand.
      const data = await res.json();
      setMaterials(data.map(m => ({ ...m, expanded: false, children: [] })));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const expandNode = async (nodeIndex, parentId) => {
    const node = materials[nodeIndex];
    if (node.expanded) {
      // Toggle off
      const newMats = [...materials];
      newMats[nodeIndex].expanded = false;
      setMaterials(newMats);
      return;
    }
    
    // Fetch children
    try {
      const res = await fetch(`${baseUrl}/api/quoting/materials/${parentId}/children`);
      const childrenData = await res.json();
      const newMats = [...materials];
      newMats[nodeIndex].children = childrenData.map(c => ({...c, expanded: false, children: []}));
      newMats[nodeIndex].expanded = true;
      setMaterials(newMats);
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (e, node) => {
    e.stopPropagation();
    setEditingNode(node);
    setFormData({
      unit_price: node.unit_price || 0,
      coverage_value: node.coverage_value || 0,
      calculation_type: node.calculation_type || 'direct',
      unit_type: node.unit_type || ''
    });
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/quoting/materials/${editingNode.id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(formData)
      });
      if(res.ok){
        setEditingNode(null);
        // Refresh entire tree (sloppy but effective for MVP)
        fetchTree();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const renderTree = (nodes, level = 0, isRootList = false) => {
    return (
      <div className="q-tree" style={{ marginLeft: isRootList ? 0 : '1.5rem' }}>
        {nodes.map((n, idx) => (
          <div key={n.id} className="q-tree__node">
            <div className="q-tree__row" onClick={() => isRootList ? expandNode(idx, n.id) : null}>
              <div className="q-tree__info">
                <span className="q-tree__name">{n.name}</span>
                {n.calculation_type !== 'none' && n.unit_price > 0 && (
                  <span className="q-tree__meta">
                     Price: ${n.unit_price} / {n.unit_type} | Calc: {n.calculation_type} ({n.coverage_value})
                  </span>
                )}
                {n.calculation_type !== 'none' && !n.unit_price && (
                  <span className="q-tree__meta" style={{color: 'red'}}>
                     ⚠️ Price not set! | Calc: {n.calculation_type} ({n.coverage_value})
                  </span>
                )}
              </div>
              <div className="q-tree__actions">
                {/* Even if it's not a root, we want to expand inside recursive function.
                    For MVP, let's keep it simple: We only fetch on root click, then we need recursive fetch.
                    I will write a better recursive tree component soon! */}
                <button className="q-btn q-btn--small q-btn--outline" onClick={(e) => startEdit(e, n)}>Edit Info</button>
              </div>
            </div>
            {n.expanded && n.children && n.children.length > 0 && renderTree(n.children, level + 1, false)}
          </div>
        ))}
      </div>
    );
  };

  // Because the MVP API logic currently only fetches Roots -> Depth 1 properly via UI, let me modify this to 
  // recursively fetch when ANY node is clicked!
  const RecursiveNode = ({ node }) => {
    const [expanded, setExpanded] = useState(false);
    const [children, setChildren] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [localNode, setLocalNode] = useState(node);

    const toggleExpand = async () => {
      if(!expanded && children.length === 0){
        try {
          const res = await fetch(`${baseUrl}/api/quoting/materials/${localNode.id}/children`);
          const data = await res.json();
          setChildren(data);
        } catch (e) { console.error(e) }
      }
      setExpanded(!expanded);
    }

    return (
      <div className="q-tree__node">
         <div className="q-tree__row" onClick={toggleExpand} style={{cursor: 'pointer'}}>
            <div className="q-tree__info">
                <span>{children.length > 0 || expanded ? '📂' : '📄'}</span>
                <span className="q-tree__name">{localNode.name}</span>
                {localNode.unit_price !== null && (
                  <span className="q-tree__meta">
                     Price: ${localNode.unit_price} / {localNode.unit_type} | Calc: {localNode.calculation_type} ({localNode.coverage_value})
                  </span>
                )}
            </div>
            <div className="q-tree__actions">
                <button className="q-btn" style={{padding: '0.2rem 0.5rem', fontSize:'0.8rem'}} onClick={(e) => { e.stopPropagation(); startEdit(e, localNode); }}>Edit</button>
            </div>
         </div>
         {expanded && children.length > 0 && (
           <div className="q-tree" style={{marginLeft: '1.5rem'}}>
             {children.map(c => <RecursiveNode key={c.id} node={c} />)}
           </div>
         )}
      </div>
    )
  }

  if (loading) return <div>Loading Database Manager...</div>;

  return (
    <div className="q-manager">
      <h3>Material Database Manager</h3>
      <p>Click on an item folder to expand it. Click "Edit" to set its Price and Calculation Formula.</p>

      {editingNode && (
        <div style={{ background: '#fff9e6', padding: '1rem', border: '1px solid #ffd700', borderRadius: '4px', marginBottom: '1rem' }}>
          <h4>Editing: {editingNode.name}</h4>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <div>
              <label>Unit Price ($)</label>
              <input type="number" className="q-input" value={formData.unit_price} onChange={(e) => setFormData({...formData, unit_price: parseFloat(e.target.value)})} />
            </div>
            <div>
              <label>Calculation Type</label>
              <select className="q-select" value={formData.calculation_type || 'direct'} onChange={(e) => setFormData({...formData, calculation_type: e.target.value})}>
                <option value="direct">Direct (User enters quantity)</option>
                <option value="area">Area (Length x Width / Coverage)</option>
                <option value="linear">Linear (Length / Coverage)</option>
                <option value="framing">Framing (Length/174 + Length/Coverage + 1)</option>
              </select>
            </div>
            <div>
              <label>Coverage Multiplier</label>
              <input type="number" className="q-input" value={formData.coverage_value} onChange={(e) => setFormData({...formData, coverage_value: parseFloat(e.target.value)})} />
            </div>
            <div>
              <label>Unit Name</label>
              <input type="text" className="q-input" placeholder="e.g. piece, sheet" value={formData.unit_type} onChange={(e) => setFormData({...formData, unit_type: e.target.value})} />
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button className="q-btn" onClick={saveEdit}>Save Changes</button>
            <button className="q-btn q-btn--outline" onClick={() => setEditingNode(null)} style={{ marginLeft: '0.5rem' }}>Cancel</button>
          </div>
        </div>
      )}

      <div className="q-tree" style={{marginLeft: 0}}>
         {materials.map(root => <RecursiveNode key={root.id} node={root} />)}
      </div>
    </div>
  );
}
