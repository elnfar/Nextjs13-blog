'use client'

import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/input/Input'
import Link from 'next/link'

interface InitialStateProps {
    name:string,
    email:string,
    password:string
}

const initialState:InitialStateProps = {
    name:'',
    email:'',
    password:''
}

export default function page() {
    const router = useRouter()
    const [state,setState] = useState(initialState)


    const onSubmit = (event:FormEvent) => {

        event.preventDefault()

        axios.post('/api/register',state)
        .then(() => {
          router.refresh()
        })
        .then(() => {
          setTimeout(() => {
            router.push('/login')
          },2500)
        })
        .catch((err:any) => {
        })
        .finally(() => {
        })
    }

    function handleChange(event:any) {
		setState({ ...state, [event.target.name]: event.target.value });
        console.log(event.target.value)
	}
     


  return (
    <form onSubmit={onSubmit} className='text-center'>
        <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
        <Input placeholder='Name' id='name' type='text' name='name' onChange={handleChange} value={state.name}/>
        <Input placeholder='Email' id='email' type='email' name='email' onChange={handleChange} value={state.email}/>
        <Input placeholder='Password' id='password' type='password' name='password' onChange={handleChange} value={state.password}/>
        {/* <input style={{color:'#000'}} className='text-black' type="text" name='name' onChange={handleChange} value={state.name}/>
        <input className='text-black' type="email" name='email' onChange={handleChange} value={state.email}/>
        <input className='text-black' type="password" name='password' onChange={handleChange} value={state.password}/> */}
        <button type='submit'>Submit</button>
        </div>

        <div>
          <div>Do you have an account ? <Link href='/login'>Sign in</Link></div>
        </div>
    </form>
  )
}
