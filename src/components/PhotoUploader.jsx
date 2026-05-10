import { useState, useRef } from "react";
import { compressImage } from "../utils/compressImage";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../constants";

async function uploadToCloudinary(file) {
  const compressed = await compressImage(file);
  const fd = new FormData();
  fd.append("file", compressed);
  fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: fd });
  const data = await res.json();
  if (data.secure_url) return data.secure_url;
  throw new Error(data.error?.message || "Upload échoué");
}

export function PhotoUploader({ photos, setPhotos, showToast }) {
  const inputRef = useRef();
  const [uploading, setUploading] = useState(false);
  const handleFiles = async (e) => {
    const toUpload = Array.from(e.target.files).slice(0, 3 - photos.length);
    if (!toUpload.length) return;
    setUploading(true);
    try {
      const urls = await Promise.all(toUpload.map(f => uploadToCloudinary(f)));
      setPhotos(p => [...p, ...urls]);
    } catch (err) { showToast("Erreur upload : " + err.message, "error"); }
    setUploading(false);
    e.target.value = "";
  };
  return (
    <div className="photo-section">
      <label className="fl">Photos (3 max)</label>
      <div className="photo-grid">
        {photos.map((url, i) => (
          <div key={i} className="photo-slot">
            <img src={url} alt=""/>
            {i === 0 && <span className="photo-main-badge">Principale</span>}
            <button className="photo-del" onClick={() => setPhotos(p => p.filter((_, j) => j !== i))} type="button">×</button>
          </div>
        ))}
        {photos.length < 3 && (
          <div className="photo-slot" onClick={() => !uploading && inputRef.current.click()}>
            {uploading ? <div className="photo-uploading">⏳…</div> : <>📷<span>Ajouter</span></>}
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handleFiles}/>
      </div>
      <div className="photo-limit">{photos.length}/3 — La 1ère photo sera la principale</div>
    </div>
  );
}
