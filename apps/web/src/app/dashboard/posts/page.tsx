"use client";

import { api } from "@/lib/api-client";

const PostPage = () => {
  const {
    data: postsData,
    isLoading,
    isError,
  } = api.posts.getPosts.useQuery({ queryKey: ["posts"] });

  return (
    <div className="flex min-h-full items-center justify-center">
      {!isLoading && isError && <p>Error</p>}
      {!isLoading && !isError && JSON.stringify(postsData)}
    </div>
  );
};

export default PostPage;
