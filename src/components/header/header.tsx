
import { sesionStorage } from '../../domain/user'
import './header.css'

export const Header = () => {



    return(
        <>
            <header className="header"> 
                <div className='data-profile'>
                    <img src={sesionStorage.img} className='image'></img>
                    <p>{sesionStorage.name} {sesionStorage.lastname}</p>
                </div> 
                <p className='cargo'>{sesionStorage.role}</p>
            </header>
        </>
    )
}

