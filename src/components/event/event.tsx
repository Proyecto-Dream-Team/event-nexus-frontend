import { Box, Button } from "@mui/material";
import "./event.css"
import { useState } from "react";
import { SesionStorage } from "../../domain/user";
import { ButtonApp } from "../buttons/button";

interface EventProps{
    user: SesionStorage;
    time: string;
    title: string;
    description: string;
    participants: number;
    isActive: boolean;
}

export const Event = ({user, time, title, description, participants, isActive}: EventProps) => {
    const [isOpen, ChangeOpen] = useState(false)

    const HandleOpen = () => {
        ChangeOpen(!isOpen)
    }

    const ArrowOpen = () => {
        if(isOpen){
            return "https://cdn-icons-png.flaticon.com/512/44/44603.png"
        }
        else{
            return "https://cdn-icons-png.flaticon.com/512/44/44969.png"
        }
    }

  return (
    <div
    className="center"
    >
    <Box
    sx={{backgroundColor: isActive ? '#7F73C3' : '#F5F5DC',
        minHeight: '100px',
        width: '90%',
        maxWidth:'500px',
        borderRadius: '10%',
        display:'flex',
        flexDirection:'column',
        margin: '0 auto'
    }}
    >
        <div
        className="user">
            <img className="profile" src={'https://www.giantbomb.com/a/uploads/square_medium/46/462814/3222927-6826564307-latest.jpg'}></img>
            <div className="title">
                <h3>{user.name} {user.lastname}</h3>
                <h4>{time}</h4>
                <h4>{title}</h4>
                <h4>participantes: {participants}</h4>
            </div>
            <img className="arrow" src={ArrowOpen()} onClick={HandleOpen}></img>
        </div>

        {isOpen && (
            <h4 className="description">
                {description}
                <br></br>
                <div style={{marginTop: 'auto'}}>
                <ButtonApp
                              label={isActive ? 'Abandonar': 'Participar'}
                              method={HandleOpen}
                              isCancel={isActive}
                            />
                </div>
            </h4>
        )}


    </Box>
    </div>
  );
};