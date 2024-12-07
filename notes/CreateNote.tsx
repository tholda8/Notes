"use client";
import { useState } from "react";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const create = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8090/api/collections/notes/records",
        {
          method: "POST",
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
    setContent("");
    setTitle("");
  };

  return (
    <div
      className="relative flex flex-wrap rounded-lg
        shadow-2xl shadow-slate-700 bg-slate-700
        h-64 w-64 p-4 mb-5 mr-5"
    >
      <form onSubmit={create} className="h-full w-full">
        <input
          className="flex bg-slate-600 text-gray-100 mb-2
           placeholder-gray-300 w-full h-10 rounded-lg pl-2"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(text) => setTitle(text.target.value)}
        />
        <textarea
          className="pl-2 flex bg-slate-600 text-gray-100 placeholder-gray-300 w-full h-32 rounded-lg"
          placeholder="Content"
          value={content}
          onChange={(text) => setContent(text.target.value)}
        />
        <button
          className=" flex place-self-center bg-green-600 text-gray-100 h-10 w-10 m-2 rounded-lg items-center justify-center"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="5"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
