import ReactMarkdown from "react-markdown";

const mainNote = ({ activeNote, onUpdateNote }) => {
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastEdit: Date.now(),
    });
  };

  if (!activeNote) return;

  return (
    <div className="note-main">
      <div className="main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
        />
      </div>
      <p>Markdown preview</p>
      <div className="main-note-preview">
        
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default mainNote;