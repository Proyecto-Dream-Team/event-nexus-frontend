
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
        <Tooltip title={"EVENTO "+eventType.toString()} placement="top" arrow>
            {   eventType === "SOCIAL" ? (
                    <EmojiPeopleIcon />
            ) : eventType === "DEPORTIVO" ? (
                    <SportsFootballIcon />
            ) : eventType === "CAPACITACION" ? (
                    <SchoolIcon />
            ) : eventType === "EJECUTIVO" ? (
                    <BusinessIcon />
            ) : eventType === "EQUIPO" ? (
                    <GroupIcon />
            ) : eventType === "BENEFICO" ? (
                    <FoodBankIcon />
            ): (
                <DeviceUnknownIcon/>
            )}
        </Tooltip>


    </>
}