import { categories } from "../constants";

export function CardImage({ annonce }) {
  const photos = annonce.photos || [];
  if (photos.length > 0) return (
    <div className="cimg">
      <img src={photos[0]} alt={annonce.titre} className="cimg-real" loading="lazy"/>
      <span className="bcat">{categories.find(c => c.id === annonce.categorie)?.label}</span>
      {annonce.urgent && <span className="burg">Urgent</span>}
      {photos.length > 1 && <span className="photo-count">{photos.length} photos</span>}
    </div>
  );
  return (
    <div className="cimg-emoji">
      <span className="bcat">{categories.find(c => c.id === annonce.categorie)?.label}</span>
      {annonce.urgent && <span className="burg">Urgent</span>}
    </div>
  );
}
