import { JSX } from "preact";
import { useState } from "preact/hooks";

export default function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  const [like, setLike] = useState(false);

  return (
    <button
      onClick={() => setLike(!like)}
      {...props}
      class="px-2 py-1 border(gray-100 2) hover:bg-gray-200"
    >
      {like ? "💖 Dejar que me guste" : "🖤 Me gusta"}
    </button>
  );
}
