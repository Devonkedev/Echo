document.addEventListener('DOMContentLoaded', () => {
  const addNoteBtn = document.getElementById('addNoteBtn');
  const notesList = document.getElementById('notesList');
  const searchInput = document.getElementById('searchInput');

  let zIndex = 1;
  function saveNotesToStorage() {
    const notes = Array.from(document.querySelectorAll('.note-card')).map(note => ({
      title: note.querySelector('.note-title').innerText,
      body: note.querySelector('.note-body').innerText,
      left: note.style.left,
      top: note.style.top
    }));
    localStorage.setItem('echo_notes', JSON.stringify(notes));
  }

  function loadNotesFromStorage() {
    const notes = JSON.parse(localStorage.getItem('echo_notes') || '[]');
    notes.forEach(note => {
      createNote(note.title, note.body, note.left, note.top);
    });
  }
  function createNote(title = 'New Note', body = 'Type something...', left, top) {
    const note = document.createElement('div');
    note.classList.add('note-card');
    note.innerHTML = `
      <div class="note-content">
        <h3 class="note-title" contenteditable="true">${title}</h3>
        <p class="note-body" contenteditable="true">${body}</p>
      </div>
      <div class="note-actions">
        <button class="edit-note-btn" title="Edit note">Edit</button>
        <button class="delete-note-btn" title="Delete note">Delete</button>
      </div>
    `;
    note.style.left = left || `${100 + Math.random() * 500}px`; 
    note.style.top = top || `${100 + Math.random() * 300}px`;
    note.style.position = 'absolute';

    makeDraggable(note);
    notesList.appendChild(note);
    saveNotesToStorage();
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
      if (isDragging) saveNotesToStorage();
      isDragging = false;
    });

    note.querySelector('.delete-note-btn').addEventListener('click', () => {
      note.remove();
      saveNotesToStorage();
    });

    note.querySelector('.edit-note-btn').addEventListener('click', () => {
      const title = note.querySelector('.note-title');
      const body = note.querySelector('.note-body');
      title.contentEditable = true;
      body.contentEditable = true;
      title.focus();
    });
    note.querySelector('.note-title').addEventListener('blur', saveNotesToStorage);
    note.querySelector('.note-body').addEventListener('blur', saveNotesToStorage);
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
  loadNotesFromStorage();
  if (document.querySelectorAll('.note-card').length === 0) {
    createNote("Sample Note Title", "This is a sample note. Your notes will appear here.");
  }
});
