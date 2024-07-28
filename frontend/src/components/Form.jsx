import {useState} from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN,REFRESH_TOKEN } from '../constants'
import '../styles/Form.scss'
import LoadingIndicator from './LoadingIndicator'

function Form({route,method}){
    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false)
    const navigate=useNavigate();
    const name = method === "login" ? "Login": "Register";
    console.log(name)
    const handleSubmit = async (e) =>{
        setLoading(true)
        e.preventDefault()
        //we are sending a request to whatever the form is trying to do
        try {
            const res = await api.post(route, {username,password})
            //check if the route or method is login
            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN,res.data.access);
                localStorage.setItem(REFRESH_TOKEN,res.data.refresh);
                navigate("/")
            }
            else{
                //register gets redirected to login page
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        }
        finally{
            setLoading(false)
        }
    }


    return <form onSubmit={handleSubmit} className='form-container'>
        <h1>{name}</h1>
        <input className='form-input' type='text' value={username} onChange={e=>setUserName(e.target.value)} placeholder='Username'></input>
        <input className='form-input' type='text' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password'></input>
        {loading && <LoadingIndicator></LoadingIndicator>}
        <button className='form-button' type='submit'>{name}</button>
    </form>
}
export default Form