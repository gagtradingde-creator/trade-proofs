function uploadImages() {
  const input = document.getElementById('fileInput');
  const gallery = document.getElementById('gallery');

  for (let file of input.files) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const card = document.createElement('div');
      card.className = 'card';

      // Bild
      const img = document.createElement('img');
      img.src = e.target.result;

      // Inhalt
      const content = document.createElement('div');
      content.className = 'card-content';

      // Statistiken
      const stats = document.createElement('div');
      stats.className = 'stats';
      stats.innerHTML = `<span>👁️ 0</span> <span>👍 0 👎 0</span>`;

      // Buttons
      const buttons = document.createElement('div');
      buttons.className = 'buttons';
      const upBtn = document.createElement('button');
      upBtn.textContent = '👍';
      const downBtn = document.createElement('button');
      downBtn.textContent = '👎';
      buttons.appendChild(upBtn);
      buttons.appendChild(downBtn);

      // Kommentare
      const comments = document.createElement('div');
      comments.className = 'comments';
      comments.innerHTML = '<b>Kommentare:</b>';

      // Kommentar-Eingabe
      const commentInput = document.createElement('div');
      commentInput.className = 'comment-input';
      const inputBox = document.createElement('input');
      inputBox.placeholder = 'Kommentar schreiben...';
      const sendBtn = document.createElement('button');
      sendBtn.textContent = 'Senden';
      commentInput.appendChild(inputBox);
      commentInput.appendChild(sendBtn);

      // Event-Listener für Up/Downvotes
      let upvotes = 0, downvotes = 0, views = 0;
      img.addEventListener('click', () => {
        views++;
        updateStats();
      });
      upBtn.addEventListener('click', () => { upvotes++; updateStats(); });
      downBtn.addEventListener('click', () => { downvotes++; updateStats(); });

      function updateStats() {
        stats.innerHTML = `👁️ ${views} &nbsp;&nbsp; 👍 ${upvotes} 👎 ${downvotes}`;
      }

      // Kommentar senden
      sendBtn.addEventListener('click', () => {
        if (inputBox.value.trim() !== '') {
          const c = document.createElement('div');
          c.textContent = inputBox.value;
          comments.appendChild(c);
          inputBox.value = '';
        }
      });

      content.appendChild(stats);
      content.appendChild(buttons);
      content.appendChild(comments);
      content.appendChild(commentInput);

      card.appendChild(img);
      card.appendChild(content);

      gallery.appendChild(card);
    }
    reader.readAsDataURL(file);
  }

  input.value = '';
}
