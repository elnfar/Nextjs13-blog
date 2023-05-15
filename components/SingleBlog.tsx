'use client'

import Image from "next/image";
import { SafeListing, SafeUser } from "@/types/type"
import axios from "axios";
import { useRouter } from 'next/navigation'
import {RiDeleteBin5Line} from 'react-icons/ri'
import {BsFillPencilFill} from 'react-icons/bs'

interface BlogProps {
    key:string
    data:SafeListing
    currentUser?:SafeUser | null
}


export default function SingleBlog({key,data,currentUser}:BlogProps) {

    const router = useRouter();

    const onLike = () => {
        axios.post(`/api/like/${data.id}`)
        .then(() => {
          router.refresh()
        })
        .catch((error) => {
        })
        .finally(() => {
        })
    }

    const onDelete = () => {

        axios.delete(`/api/blogs/${data.id}`)
        .then(() => {
          router.refresh()
        })
        .catch((error) => {
        })
        .finally(() => {
        })
      }
    
    

  return (
    <div className="w-[1100px] border-2 p-4">
        <div className="">
            <div className="flex gap-2 justify-between items-center">
                <Image width={400} className="w-[500px] object-contain" height={300} src={data.imageSrc} alt="Blog Image" />

                <div className="w-[530px] flex flex-col gap-4 leading-[1.5]">
                <h1>{data.name}</h1>
                <p>{data.description}</p>
                </div>
            </div>
        </div>

        {data.userId === currentUser?.id && (
            <div className="flex items-center gap-4 mt-4">
          <RiDeleteBin5Line onClick={onDelete} className=" cursor-pointer text-[1.5rem]"/>
          <BsFillPencilFill onClick={() => router.push(`/blogs/${data.id}`)} className=" cursor-pointer text-[1.2rem]"/>
          {/* <button className="bg-red-400 px-6 py-2" onClick={onDelete}>Delete</button> */}
          {/* <button className="bg-yellow-400 px-6 py-2" onClick={() => router.push(`/blogs/${data.id}`)}>Edit</button> */}
          </div>
        )}
    </div>
  )
}
