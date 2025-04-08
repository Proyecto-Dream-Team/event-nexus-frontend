import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { InputApp } from '../components/input/input'



export const Login = () => {
    const [userName, setUser] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    return(
        <div style={{justifyContent:'center', alignItems: 'center', justifyItems:'center'}}>
            <h1 style={{marginTop:'50px', marginBottom:'10px'}}>Event Nexus</h1>
            <hr></hr>

            <Box sx={{backgroundColor:'#7289DA', width:'90vmin', height:'100vmin', position:'relative', justifyContent:'center', alignItems: 'center', justifyItems:'center', margin:'5vmin', maxHeight:'500px', maxWidth:'500px', borderRadius:'10%'}}>
                <br></br>
                <InputApp label='usuario' type='text' register={true}></InputApp>
                <InputApp label='contraseña' type='text' register={true}></InputApp>

                <button>Iniciar Sesion</button>
            </Box>
        </div>
    )

}