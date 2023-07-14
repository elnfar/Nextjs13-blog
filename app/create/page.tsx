'use client'

import React,{ChangeEvent, FormEvent, useMemo, useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Input from '@/components/input/Input'
import ImageUpload from '@/components/ImageUpload'



interface InitalStateProps {
    name?:string,
    imageSrc:string
    description:string
}   

const initialState:InitalStateProps = {
    name:'',
    imageSrc:'',
    description:''
}


export default function page() {

    const [state,setState] = useState(initialState)
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()



  

    const onSubmit = (event:FormEvent) => {

        setIsLoading(true)

        event.preventDefault()

        axios.post('/api/blogs',state)
        .then(() => {
            toast.success('Created successfully')
            router.refresh()
            router.push('/')
            // router.push('/')
        })

        .catch(() => {
            toast.error('Went wring') 
        }).finally(() => {
            setIsLoading(false)
        })
    }
	function handleChange(event:ChangeEvent<HTMLInputElement> ) {
		setState({ ...state, [event.target.name]: event.target.value });
	}
    const setCustomValue = (id:any, value:any) => {
        setState((prevValues) => ({
          ...prevValues,
          [id]: value,
        }));
      };
    

  return (
    <form onSubmit={onSubmit} className='w-[600px] h-[700px] mx-auto py-12'>


                        <div>
                            <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc',value)}/>
                        </div>

        <div  className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
        <Input placeholder='Blog header' id='name' type='text' value={state.name} name='name' onChange={handleChange}/>
        <Input big placeholder='Blog content or description' id='description' type='text' value={state.description} name='description' onChange={handleChange}/>
        <div> 
        </div>
        <button type='submit' disabled={isLoading}>Submit</button>
        </div>
        
    </form>
  )
}
