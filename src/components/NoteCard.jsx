"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";



export const NoteCard = ({ id, content }) => {
    const router = useRouter();
    const [newContent, setNewContent] = useState(content)
    const [editMode, setEditMode] = useState(false)

    async function handleUpdateNote() {
        const res = await fetch(`https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: newContent }),
        });
        const data = await res.json()
        console.log(data);
        setEditMode(false);
        router.refresh();
    }

    async function handleDeleteNote() {
        await fetch(`https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`, {
            method: "DELETE",

            body: JSON.stringify({ content: content, user: "bagusasmoro@me.com" })
        });
        router.refresh();
    }

    return (
        <div className="border-2 p-4 rounded-lg shadow">
            {editMode ? (<input value={newContent || content} onChange={(e) => setNewContent(e.target.value)} />
            ) : (
                <div className="min-h-[120px]">{content}</div>
            )}
            <div className="flex gap-4">
                {editMode ? (<button onClick={handleUpdateNote}>Update</button>
                ) : (
                    <button onClick={() => setEditMode(true)}>Edit</button>
                )}


                <button onClick={handleDeleteNote}>Delete</button>
            </div>
        </div>
    )
}
