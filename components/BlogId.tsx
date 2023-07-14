'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Image from 'next/image'
import ImageUpload from './ImageUpload'
import Input from './input/Input'
import { toast } from 'react-hot-toast'


interface BlogProps {
    name?:string
    description?:string
    imageSrc?:any
    blogId?:string
}


interface InitalStateProps {
    name:string,
    description:string
    imageSrc:string
    
  }   
  
  
  const initialState:InitalStateProps = {
    name:'',
    description:'',
    imageSrc:''
  }
  


export default function BlogId({name,description,imageSrc,blogId}:BlogProps) {


    const router = useRouter()
    const [onActive,setOnActive] = useState(false)
    const [isLoading,setIsLoading] = useState(false)



    const [state,setState] = useState(initialState)

    function handleChange(event:ChangeEvent<HTMLInputElement> ) {
        setState({ ...state, [event.target.name]: event.target.value });
      }
  


      const onSubmit = (event:FormEvent) => {

        setIsLoading(true)

        event.preventDefault()
        axios.put(`/api/blogs/${blogId}`,state)
        .then(() => {
          toast.success('Updated Successfully')
            router.refresh()
            router.push('/')
        })

        .catch((err) => {
            throw new Error(err)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    const onDelete = (event:FormEvent) => {

      setIsLoading(true)

        event.preventDefault()
        axios.delete(`/api/blogs/${blogId}`)
        .then(() => {
            toast.success('Updated Successfully')
            router.refresh()
            router.push('/')
        })

        .catch((err) => {
            throw new Error(err)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }


    const setCustomValue = (id:any, value:any) => {
      setState((prevValues) => ({
        ...prevValues,
        [id]: value,
      }));
    };




  return (
    <div className="w-[500px] mx-auto py-16 bg-blue-200 px-12 flex flex-col gap-4">
    <div className="flex flex-col border-b-2 ">
        <span>{name}</span>
    </div>

    <div>
        <span>{description}</span>
    </div>

    <div>
        <Image src={imageSrc} width={400} height={400} alt='Image'/>
    </div>

<div className="flex justify-center gap-2">
    <button onClick={() => setOnActive(!onActive)} className="uppercase">edit</button>
    <button disabled={isLoading} className="uppercase" onClick={onDelete}>Delete</button>
</div>



{onActive && (
    <form onSubmit={onSubmit}>
      <div>
        <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc',value)}/>
      </div>
        <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
        <Input placeholder='Name' id="name" type='text' value={state.name} name='name' onChange={handleChange}/>
        <Input placeholder='Description' id="description" type='text' value={state.description} name='description' onChange={handleChange}/>
        <div> 
        </div>
        <button type='submit' disabled={isLoading}>Submit</button>
        </div>
        
    </form>
    )}
    </div>
  )
}
