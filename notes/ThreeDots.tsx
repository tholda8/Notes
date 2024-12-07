"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Dir } from "fs";

async function deleteNote(noteId: string) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error creating note:", error);
  }
}

async function updateNote(noteId: string, title: string, content: string) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
  } catch (error) {
    console.error("Error creating note:", error);
  }
}

function ThreeDots({
  noteId,
  setChange,
  change,
}: {
  noteId: string;
  setChange: any;
  change: boolean;
}) {
  const router = useRouter();
  const handleDelete = async () => {
    await deleteNote(noteId);
    router.refresh();
  };
  return (
    <div className="flex">
      <button
        onClick={() => {
          setChange(!change);
        }}
        className="flex flex-wrap bg-blue-500 h-10 w-10 items-center rounded m-1 absolute right-12 bottom-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9 text-white"
          fill="none"
          viewBox="-1 -1 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19H4v-3L16.5 3.5z"
          />
        </svg>
      </button>
      {!change ? (
        <button /*delete */
          onClick={handleDelete}
          className="flex flex-wrap bg-red-700 items-center justify-center h-10 w-10 rounded m-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-white"
            fill="none"
            viewBox="-2.5 -2.5 15 15"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M0 0 L10 10 M10 0 l-10 10"
            />
          </svg>
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}

function ChangeForm({
  title,
  content,
  noteId,
  date,
}: {
  title: string;
  content: string;
  noteId: string;
  date: string;
}) {
  const [newTitle, setTitle] = useState(title);
  const [newContent, setContent] = useState(content);
  const handleSubmit = async () => {
    await updateNote(noteId, newTitle, newContent);
  };
  return (
    <>
      <form className="h-full" onSubmit={handleSubmit}>
        <input
          className="pl-2 rounded-lg text-2xl text-wrap w-full h-10 bg-slate-600 mb-2"
          value={newTitle}
          onChange={(text) => setTitle(text.target.value)}
        />
        <textarea
          className="pl-2 rounded-lg w-full h-32 bg-slate-600"
          value={newContent}
          onChange={(text) => setContent(text.target.value)}
        />
        <button /*confrirm */
          type="submit"
          className="flex flex-wrap bg-green-600 items-center justify-center h-10 w-10
         rounded m-1 absolute bottom-2 right-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-white"
            fill="none"
            viewBox="-2.5 -2.5 15 15"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M0 5 L3 10 M10 0 l-7 10"
            />
          </svg>
        </button>
      </form>
    </>
  );
}

export default function Content({ note }: any) {
  const { id, title, content, created } = note || {};
  const [change, setChange] = useState(false);

  return (
    <div>
      {!change ? (
        <>
          <Link href={`/notes/${id}`}>
            <h2 className="text-2xl text-wrap">{title}</h2>
          </Link>
          <div className="flex absolute right-2 bottom-2">
            <ThreeDots noteId={id} setChange={setChange} change={change} />
          </div>
          <h3>{content}</h3>
        </>
      ) : (
        <>
          <ChangeForm
            title={title}
            content={content}
            noteId={id}
            date={created}
          />
          <div className="flex absolute right-2 bottom-2">
            <ThreeDots noteId={id} setChange={setChange} change={change} />
          </div>
        </>
      )}
      <h4 className="absolute bottom-3">
        {new Date(created).toLocaleDateString("cs-CZ", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </h4>
    </div>
  );
}
