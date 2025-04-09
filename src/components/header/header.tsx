
import './header.css'

export const Header = () => {

    return(
        <>
            <header className="header"> 
                <div className='data-profile'>
                    <img src='profileImage.png' className='image'></img>
                    <p>Pepe el pollo</p>
                </div> 
                <p className='cargo'>Admin</p>
            </header>
        </>
    )
}

