function uploadImages() {
  const input = document.getElementById('fileInput');
  const gallery = document.getElementById('gallery');

  for (let file of input.files) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const card = document.createElement('div');
      card.className = 'card';

      // Vote-Spalte links
      const voteSection = document.createElement('div');
      voteSection.className = 'vote-section';
      const upBtn = document.createElement('button'); upBtn.textContent = '▲';
      const downBtn = document.createElement('button'); downBtn.textContent = '▼';
      const voteCount = document.createElement('div'); voteCount.className = 'vote-count'; voteCount.textContent = '0';
      voteSection.appendChild(upBtn);
      voteSection.appendChild(voteCount);
      voteSection.appendChild(downBtn);

      // Bild + Inhalte rechts
      const content = document.createElement('div');
      content.className = 'card-content';
      const img = document.createElement('img'); img.src = e.target.result;

      const stats = document.createElement('div'); stats.className='stats'; stats.textContent = '👁️ 0 &nbsp; Kommentare: 0';

      const comments = document.createElement('div'); comments.className='comments';

      const commentInput = document.createElement('div'); commentInput.className='comment-input';
      const inputBox = document.createElement('input'); inputBox.placeholder='Kommentar schreiben...';
      const sendBtn = document.createElement('button'); sendBtn.textContent='Senden';
      commentInput.appendChild(inputBox); commentInput.appendChild(sendBtn);

      content.appendChild(img); content.appendChild(stats); content.appendChild(comments); content.appendChild(commentInput);

      card.appendChild(voteSection); card.appendChild(content);

      // Event-Listener
      let votes = 0, views = 0, commentCount=0;
      img.addEventListener('click', () => { views++; stats.textContent=`👁️ ${views} &nbsp; Kommentare: ${commentCount}`; });
      upBtn.addEventListener('click', () => { votes++; voteCount.textContent=votes; });
      downBtn.addEventListener('click', () => { votes--; voteCount.textContent=votes; });
      sendBtn.addEventListener('click', () => {
        if(inputBox.value.trim()!==''){
          const c=document.createElement('div'); c.textContent=inputBox.value;
          comments.appendChild(c); commentCount++; stats.textContent=`👁️ ${views} &nbsp; Kommentare: ${commentCount}`;
          inputBox.value='';
        }
      });

      gallery.appendChild(card);
    }
    reader.readAsDataURL(file);
  }

  input.value='';
}
