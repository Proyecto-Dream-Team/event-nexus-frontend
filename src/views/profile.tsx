import { ProfileFormulary } from '../components/profileForm/profileFormulary';
import './profile.css';


export const Profile = () => {

    return (
        <>
            <div className="profileOptins">
                <a href="" className='menuProfile'>Datos</a>
                <a href="Admin" className='menuProfile'>Admin</a>
            </div>
            <ProfileFormulary></ProfileFormulary>
        </>
    )

}