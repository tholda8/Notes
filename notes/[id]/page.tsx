async function getNote(noteId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
    { next: { revalidate: 10 } }
  );
  const data = await res.json();
  return data;
}

export default async function NotePage({ params }: any) {
  const { id } = await params;
  const note = await getNote(id);
  return (
    <div>
      <h1>{id}</h1>
      <h2>{note.title}</h2>
      <h3>{note.content}</h3>
      <h4>{note.created}</h4>
    </div>
  );
}
