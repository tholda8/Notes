import CreateNote from "./CreateNote";
import Content from "./ThreeDots";

async function getNotes() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.items as any[];
}

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div>
      <div>
        <h1 className="ml-10 text-5xl m-5">Notes</h1>
      </div>
      <div className="ml-10 flex flex-wrap ">
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })}

        <CreateNote />
      </div>
    </div>
  );
}

function Note({ note }: any) {
  return (
    <>
      <div
        className="relative flex flex-wrap rounded-lg
        shadow-2xl shadow-slate-700 bg-slate-700
        h-64 w-64 p-4 mb-5 mr-5"
      >
        <Content note={note} />
      </div>
    </>
  );
}
