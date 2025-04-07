import { Header } from '../components/header/header';
import { NavBar } from '../components/navbar/navbar';
import { ProfileFormulary } from '../components/profileForm/profileFormulary';
import './profile.css';


export const Profile = () => {




    return (

        <>
            <Header></Header>
            <div className="profileOptins">
                <a href="" className='menuProfile'>Datos</a>
                <a href="Admin" className='menuProfile'>Admin</a>
            </div>
            <NavBar></NavBar>
            <ProfileFormulary></ProfileFormulary>

        </>


    )

}