import { useState, useRef } from "react";
import { compressImage } from "../utils/compressImage";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../constants";

const UPLOAD_TIMEOUT_MS = 30_000;

async function uploadToCloudinary(file) {
  const compressed = await compressImage(file);
  const fd = new FormData();
  fd.append("file", compressed);
  fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS);
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST", body: fd, signal: controller.signal,
    });
    const data = await res.json();
    if (data.secure_url) return data.secure_url;
    throw new Error(data.error?.message || "Upload échoué");
  } catch (e) {
    if (e.name === "AbortError") throw new Error("Upload trop long. Vérifie ta connexion.");
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

export function PhotoUploader({ photos, setPhotos, showToast }) {
  const inputRef = useRef();
  const [uploading, setUploading] = useState(false);
  const handleFiles = async (e) => {
    const selected = Array.from(e.target.files);
    const slots = 3 - photos.length;
    if (selected.length > slots) {
      showToast(`Maximum 3 photos. Seules les ${slots} première${slots > 1 ? "s" : ""} ont été ajoutées.`, "warn");
    }
    const toUpload = selected.slice(0, slots);
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
