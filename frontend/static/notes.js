document.addEventListener('DOMContentLoaded', () => {
    const addNoteBtn = document.getElementById('addNoteBtn');
    const notesList = document.getElementById('notesList');
    const searchInput = document.getElementById('searchInput');
  
    let zIndex = 1;
  
    function createNote(title = 'New Note', body = 'Type something...') {
      const note = document.createElement('div');
      note.classList.add('note-card');
      note.innerHTML = `
        <div class="note-content">
          <h3 class="note-title" contenteditable="true">${title}</h3>
          <p class="note-body" contenteditable="true">${body}</p>
        </div>
        <div class="note-actions">
          <button class="edit-note-btn">Edit</button>
          <button class="delete-note-btn">Delete</button>
        </div>
      `;
      note.style.left = `${100 + Math.random() * 500}px`;
      note.style.top = `${100 + Math.random() * 300}px`;
      note.style.position = 'absolute';
  
      makeDraggable(note);
      notesList.appendChild(note);
    }
  
    function makeDraggable(note) {
      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;
  
      note.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'BUTTON') return;
  
        isDragging = true;
        offsetX = e.clientX - note.getBoundingClientRect().left;
        offsetY = e.clientY - note.getBoundingClientRect().top;
  
        zIndex++;
        note.style.zIndex = zIndex;
      });
  
      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        note.style.left = `${e.clientX - offsetX}px`;
        note.style.top = `${e.clientY - offsetY}px`;
      });
  
      document.addEventListener('mouseup', () => {
        isDragging = false;
      });
  
      note.querySelector('.delete-note-btn').addEventListener('click', () => {
        note.remove();
      });
  
      note.querySelector('.edit-note-btn').addEventListener('click', () => {
        const title = note.querySelector('.note-title');
        const body = note.querySelector('.note-body');
        title.contentEditable = true;
        body.contentEditable = true;
        title.focus();
      });
    }
  
    addNoteBtn.addEventListener('click', () => {
      createNote();
    });
  
    searchInput.addEventListener('input', () => {
      const filter = searchInput.value.toLowerCase();
      const notes = document.querySelectorAll('.note-card');
      notes.forEach((note) => {
        const text = note.innerText.toLowerCase();
        note.style.display = text.includes(filter) ? 'block' : 'none';
      });
    });
  
    createNote("Sample Note Title", "This is a sample note. Your notes will appear here.");
  });
  