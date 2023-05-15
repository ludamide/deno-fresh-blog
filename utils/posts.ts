import type { Post } from "../types.d.ts";
import { extract } from "$std/front_matter/any.ts";
import { render } from "https://deno.land/x/gfm@0.2.3/mod.ts";

export async function loadPost(id: string): Promise<Post | null> {
  const raw = await Deno
    .readTextFile(`./content/posts/${id}.md`)
    .catch(() => null);

  if (!raw) return null;

  const { attrs, body } = extract(raw);
  const params = attrs as Record<string, string>;

  const post: Post = {
    id,
    title: params.title,
    body: render(body),
    date: new Date(params.date),
    excerpt: params.excerpt,
  };

  return post;
}

export async function listPosts(): Promise<Post[]> {
  const promises = [];

  for await (const entry of Deno.readDir("./content/posts")) {
    const { name } = entry;
    const [id] = name.split(".");
    if (id) promises.push(loadPost(id));
  }

  const posts = await Promise.all(promises) as Post[]; // en paralelo
  posts.sort((a, b) => {
    // return a.date.getTime() - b.date.getTime(); // ASC
    return b.date.getTime() - a.date.getTime(); // DESC
  });

  return posts;
}

export async function listPostsSequantially(): Promise<Post[]> {
  const posts = [];

  for await (const entry of Deno.readDir("./content/posts")) {
    const { name } = entry;
    const [id] = name.split(".");
    const post = await loadPost(id);
    if (!post) continue;
    posts.push(post);
  }

  return posts;
}
