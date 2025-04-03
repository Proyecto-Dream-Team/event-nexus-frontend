import { useNavigate } from 'react-router-dom'
import './header.css'


export const Header = () => {
    const navigate = useNavigate()

    const gotTo = () => { navigate('/home') }

    return(
        <>
            <header onClick={gotTo} className='header'>Event Nexus</header>
        </>
    )
}

