import SingleBlog from "@/components/SingleBlog";
import getBlogs,{IBlogParams} from "./actions/getBlogs"
import getCurrentUser from "./actions/getCurrentUser"
import Link from "next/link";

interface HomeProps {
  searchParams: IBlogParams
};



export default async function Home({searchParams}:HomeProps) {

  const currentUser = await getCurrentUser();

  const blogs = await getBlogs(searchParams)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-4">
        {blogs.map((item:any) => (
          <SingleBlog
          key={item.id}
          data={item}
          currentUser={currentUser}
          />
        ))}
    </main>
  )
  }