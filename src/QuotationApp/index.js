import { useState } from "react";
import "./QuotationApp.scss";
import TabManager from "./TabManager";
import TabBuilder from "./TabBuilder";
import TabPDF from "./TabPDF";

export default function QuotationApp({ token, baseUrl }) {
  const [internalTab, setInternalTab] = useState("builder");
  
  // Shared state: Quote Line Items
  const [quoteItems, setQuoteItems] = useState([]);

  // Auth helper
  const authHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return (
    <div className="quotation-app">
      <header className="quotation-app__header">
        <h2>Xeus Pro Quotation Engine</h2>
      </header>

      <div className="quotation-app__tabs">
        <button 
          className={internalTab === 'manager' ? 'active' : ''} 
          onClick={() => setInternalTab('manager')}
        >
          Manual Data Input (Database)
        </button>
        <button 
          className={internalTab === 'builder' ? 'active' : ''} 
          onClick={() => setInternalTab('builder')}
        >
          Quote Builder (Hierarchy)
        </button>
        <button 
          className={internalTab === 'pdf' ? 'active' : ''} 
          onClick={() => setInternalTab('pdf')}
        >
          Customer Quote ({quoteItems.length} items)
        </button>
      </div>

      <div className="quotation-app__content">
        {internalTab === "manager" && (
          <TabManager baseUrl={baseUrl} authHeaders={authHeaders} />
        )}
        
        {internalTab === "builder" && (
          <TabBuilder 
            baseUrl={baseUrl} 
            authHeaders={authHeaders} 
            quoteItems={quoteItems}
            setQuoteItems={setQuoteItems}
          />
        )}

        {internalTab === "pdf" && (
          <TabPDF 
            quoteItems={quoteItems}
            setQuoteItems={setQuoteItems}
            baseUrl={baseUrl}
            authHeaders={authHeaders}
          />
        )}
      </div>
    </div>
  );
}
