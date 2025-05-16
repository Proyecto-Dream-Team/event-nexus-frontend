import CreateIcon from '@mui/icons-material/Create';
import "./profileCard.css"
import { useProfileImg } from "../../context/contextImg";
import { SesionStorage } from '../../domain/user';

interface userCard{
  user:SesionStorage
}

export const ProfileCard = ({user}: userCard) => {

    return(
        <div className="profile-box">
                <div className="row">
                <div className="title">
                    <h2>{user.name+ " " + user.lastname}</h2>
                    {user.rol}
                </div>
                <img className="img" src={useProfileImg().img}></img>
            </div>
            <div className='icon'>
                <CreateIcon fontSize="large" />
            </div>
        </div>
    )
}