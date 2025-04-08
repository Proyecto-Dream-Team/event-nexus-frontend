import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { InputApp } from '../components/input/input'
import { ClassNames } from '@emotion/react'
import './login.css'



export const Login = () => {
    const [userName, setUser] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    return(
        <div className='page'>
            <h1 className='title'>Event Nexus</h1>
            <hr className='line'></hr>

            <div className='login-box'>
                <br></br>
                <InputApp label='usuario' type='text' register={true}></InputApp>
                <InputApp label='contraseña' type='text' register={true}></InputApp>

                <button>Iniciar Sesion</button>
            </div>
        </div>
    )

}