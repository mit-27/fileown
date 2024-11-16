"use client";

import { QueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

const PostPage = () => {
  const {
    data: postsData,
    isLoading,
    isError,
  } = api.posts.getPosts.useQuery({ queryKey: ["posts"] });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      {!isLoading && isError && <p>Error</p>}
      {!isLoading && !isError && JSON.stringify(postsData)}
      <Button>Default</Button>
      <Button variant={"outline"}>Outline</Button>

      <p>Hello from Mit - [Post Page]</p>
    </div>
  );
};

export default PostPage;
