import Link from "next/link";

import PostTitle from "@/components/post-title";

export default function PostHeader({
  title,
  author,
  categories,
}) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
        
        </div>
        <div className="mb-6 text-lg">
          dsfdsfsdfsdfsd
        </div>
        <div className="mb-6 text-lg">
         
        </div>
      </div>
    </>
  );
}
