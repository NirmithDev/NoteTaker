import React from 'react'
import { useState,useEffect } from 'react'
import api from '../api'
import Notes from '../components/Notes'
import '../styles/Home.scss'

const Home = () => {
  //all notes
  const [notes,setNotes]= useState([]);
  const [content,setContent] = useState("");
  const [title,setTitle] = useState("")

  useEffect(()=>{
    getNotes();
  },[])
  const getNotes = () => {
    api.get("/api/notes/").then((res)=>res.data).then((data)=>{setNotes(data); console.log(data)}).catch((error)=>alert(error))
  }
  //delete notes
  const deleteNote = (id) =>{
    api.delete(`/api/notes/delete/${id}/`).then((res)=>{
      if(res.status === 204) alert("Note Deleted")
      else alert("Note Failed to delete")
      getNotes()
    }).catch((error)=>alert(error))
  }
  //create notes
  const createNote =(e)=>{
    e.preventDefault()
    api.post("/api/notes/",{content,title}).then((res)=>{
      if(res.status === 201) alert("Note created successfully")
      else alert("Failed to make note")
      getNotes()
    }).catch((error)=>alert(error))
  }
  const disabled = false;
  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note)=><Notes note={note} onDelete={deleteNote} onDisabled={disabled} key={note.id}></Notes>)}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor='title'>Title:</label>
        <br></br>
        <input type='text' id="title" name='title' required onChange={(e)=>setTitle(e.target.value)}value={title}></input>
        <label htmlFor='content'>Content:</label>
        <br></br>
        <textarea id="content" name='content' required onChange={(e)=>setContent(e.target.value)}value={content}></textarea>
        <br></br>
        <input type='submit' value="Submit"></input>
      </form>
    </div>
  )
}

export default Home
