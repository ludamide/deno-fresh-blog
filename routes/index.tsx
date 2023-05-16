import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../types.d.ts";
import { listPosts } from "../utils/posts.ts";
import { logo } from "../utils/assets.ts";

export const handler: Handlers = {
  async GET(req, context) {
    console.log(context.state.data);
    const posts = await listPosts();
    return context.render({ posts });
  },
};

export default function Home(props: PageProps) {
  const { data } = props;
  const { posts } = data;
  return (
    <main class="p-4">
      <div class="flex">
        <img src={logo} />
        <h1 class="text-2xl font-bold">El blog de Ludvig Amide</h1>
      </div>
      {posts.map((post: Post) => (
        <article class="p-4">
          <h2 class="text-2xl font-bold">
            <a class="hover:text-blue-600" href={`/blog/${post.id}`}>
              {post.title}
            </a>
          </h2>
          <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
        </article>
      ))}
    </main>
  );
}
