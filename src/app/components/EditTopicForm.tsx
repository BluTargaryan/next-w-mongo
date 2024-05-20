'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Topic {
id:any,
title:string,
description:string
}

const EditTopicForm = ({id, title, description}:Topic) => {

  const router  = useRouter()

const [newTitle, setNewTitle] = useState(title)
const [newDescription, setNewDescription] = useState(description)

const handleSubmit = async (e:any)=>{
  e.preventDefault()

  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`,{
      method:"PUT",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({newTitle, newDescription})
    })
if(!res.ok){
throw new Error('failed to update topic')
}

router.refresh()
router.push('/')

  } catch (error) {
    console.log(error)
  }
}


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
    <input 
    onChange={(e)=>setNewTitle(e.target.value)}
    className="border border-slate-500 px-8 py-2"
    type="text" 
    value={newTitle}
    placeholder="Topic Title"/>

<input 
    className="border border-slate-500 px-8 py-2"
    type="text" 
    onChange={(e)=>setNewDescription(e.target.value)}
    value={newDescription}
    placeholder="Topic Description"/>

    <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
Update Topic
    </button>
</form>
  )
}

export default EditTopicForm