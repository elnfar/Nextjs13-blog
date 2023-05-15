import getCurrentUser from "@/app/actions/getCurrentUser"
import getBlogsById from "@/app/actions/getBlogsById";
import SingleBlog from "@/components/SingleBlog";
import BlogId from "@/components/BlogId";


interface IParams {
    blogId:string,
}



export default async function page({params}:{params:IParams}) {

    const blog  = await getBlogsById(params)
    const currentUser = await getCurrentUser();


    const date = blog?.createdAt
    const date2 = new Date(date ?? 2023).toDateString()




 
  return (


    <div className="">
        <div>
        <BlogId
          name={blog?.name}
          description={blog?.description}
          blogId={blog?.id}
          imageSrc={blog?.imageSrc}
        />
      </div>
    </div>
  )
}
