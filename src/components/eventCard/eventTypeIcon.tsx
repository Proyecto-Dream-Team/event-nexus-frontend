
import { EventCategory } from "../../domain/eventTypes";
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import BusinessIcon from '@mui/icons-material/Business';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { Tooltip } from "@mui/material";
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';
export function mapEventTypeToIcon(eventType: EventCategory) {
    return <>
        <Tooltip
                title={
                        <h2 style={{ color: "black", fontSize: "12px" }}>
                                EVENTO {eventType}
                        </h2>
                } 
                placement="top"
                arrow
        >
            {   eventType === "SOCIAL" ? (
                    <EmojiPeopleIcon sx={{cursor:'pointer'}}/>
            ) : eventType === "DEPORTIVO" ? (
                    <SportsFootballIcon sx={{cursor:'pointer'}}/>
            ) : eventType === "CAPACITACION" ? (
                    <SchoolIcon sx={{cursor:'pointer'}}/>
            ) : eventType === "EJECUTIVO" ? (
                    <BusinessIcon sx={{cursor:'pointer'}}/>
            ) : eventType === "EQUIPO" ? (
                    <GroupIcon sx={{cursor:'pointer'}}/>
            ) : eventType === "BENEFICO" ? (
                    <FoodBankIcon sx={{cursor:'pointer'}}/>
            ): (
                <DeviceUnknownIcon sx={{cursor:'pointer'}}/>
            )}
        </Tooltip>


    </>
}