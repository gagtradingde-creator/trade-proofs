// Bilder nur im Browser speichern (nicht permanent)
function uploadImages() {
  const input = document.getElementById('fileInput');
  const gallery = document.getElementById('gallery');

  for (let file of input.files) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      gallery.appendChild(img);
    }
    reader.readAsDataURL(file);
  }

  input.value = "";
}
