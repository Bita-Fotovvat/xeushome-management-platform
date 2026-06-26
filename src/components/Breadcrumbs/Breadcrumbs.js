import { Link } from "react-router-dom";
import "./Breadcrumbs.scss";

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/" className="breadcrumbs__link">Home</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="breadcrumbs__item">
            <span className="breadcrumbs__separator">/</span>
            {item.to ? (
              <Link to={item.to} className="breadcrumbs__link">{item.label}</Link>
            ) : (
              <span className="breadcrumbs__current">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
