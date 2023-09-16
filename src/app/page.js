import { NoteEditor } from "@/components/NoteEditor"

async function getNotes() {
  const res = await fetch("https://devscale-mockapi.fly.dev/api/collections/notes/records?filter=(user='bagusasmoro@me.com')", {
    cache: "no-cache",
  });
  const data = await res.json()
  return data;
}

export default async function Page() {
  const { items } = await getNotes()

  return <NoteEditor notedData={items} />;
}
