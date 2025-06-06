import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { EventDto } from "../../../domain/createEvent";
import { getEventTypes, } from "../../../services/moduleService";
import { FormControl, InputLabel, ListItemButton, ListItemText, Menu, MenuItem, Select, TextField } from "@mui/material";
import { EventCategory } from "../../../domain/eventTypes";
import { AllEventsOption, EventsByCreated, EventsByInvitation, EventsByTitleSearch, EventsByType, FilterOption } from "./filterStrategy";
import { StyleBoxContainer, StyledFloatingButton, StyledList, StyleMenuItem } from "./eventFilter.style";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

const options = [
    'sin filtro',
    'titulo',
    'categoria',
    'creados',
    'invitaciones'
];
type FilterMode = "all" | "title" | "type" | "created" | "invited";
export const EventFilter = ({ eventSetter }: { eventSetter: Dispatch<SetStateAction<EventDto[] | undefined>> }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [eventCategory, setEventCategory] = useState<EventCategory>("SOCIAL");
    const [filterMode, setFilterMode] = useState<FilterMode>("all")
    const [filterStrategy, setFilterStrategy] = useState<FilterOption>(new AllEventsOption);
    const [eventTypes, setEventTypes] = useState<EventCategory[]>()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    
    async function noFilterStrategy() {
        setFilterMode("all");
        setFilterStrategy(new AllEventsOption());
        // getEvents()
    }

    function filterByTitleStrategy() {
        setFilterMode("title");
        setFilterStrategy(new EventsByTitleSearch());
    }

    async function filterByTypeStrategy() {
        setFilterMode("type");
        const eventTypes: EventCategory[] = await getEventTypes();
        setEventTypes(eventTypes)
        setFilterStrategy(new EventsByType());
    }

    async function filterByCreatedStrategy() {
        setFilterMode("created");
        // const eventTypes: string[] = await getEventTypes();
        // setEventTypes(eventTypes)
        setFilterStrategy(new EventsByCreated());
        // getEvents()
    }

    async function filterByInvitedStrategy() {
        setFilterMode("invited");
        // const eventTypes: string[] = await getEventTypes();
        // setEventTypes(eventTypes)
        setFilterStrategy(new EventsByInvitation());
        // getEvents()
    }


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(inputRef.current?.value);
        if (inputRef.current) {
            getEvents();
        }
    };

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    async function handleMenuItemClick(
        event: React.MouseEvent<HTMLElement>,
        index: number
    ) {
        if (options[index] === "sin filtro") noFilterStrategy();
        if (options[index] === "titulo") filterByTitleStrategy();
        if (options[index] === "categoria") await filterByTypeStrategy();
        if (options[index] === "creados") await filterByCreatedStrategy();
        if (options[index] === "invitaciones") await filterByInvitedStrategy();
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const getEvents = async () => {
        const events: EventDto[] = await filterStrategy.getEvents(inputRef.current?.value!, eventCategory);
        eventSetter(events);
    };


    useEffect(() => {
        getEvents();
    }, [eventCategory, filterStrategy]);


    return <>
        <StyleBoxContainer>
            <StyledList
                aria-label="Device settings"
                sx={{ bgcolor: 'background.paper' }}
            >
                <ListItemButton
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="when device is locked"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={handleClickListItem}
                >
                    <ListItemText
                        primary="Filtrar eventos por:"
                        secondary={options[selectedIndex]}
                    />
                </ListItemButton>
            </StyledList>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
            >
                {options.map((option, index) => (
                    <StyleMenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                        
                    >
                        {option}
                    </StyleMenuItem>
                ))}
            </Menu>
            {filterMode === "title" &&
                <form onSubmit={handleSubmit} style={{ width: 'min(100%, 50rem)'}}>
                    <TextField
                        required
                        // id="outlined-required"
                        label="Titulo del evento"
                        color="info"
                        inputRef={inputRef}
                        sx={{ width: '100%' }}
                    />
                </form>
            }
            {filterMode === "type" &&
                    <FormControl fullWidth sx={{width: 'min(100%, 50rem)'}}>
                        <InputLabel id="demo-simple-select-label">CATEGORIA</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            label="Age"
                            value={eventCategory}
                            sx={{borderColor:'red'}}
                        >
                            {eventTypes?.map((eventType, index) => (
                                <MenuItem
                                    key={eventType}
                                    value={eventType}
                                    sx={{height:'5rem'}}
                                    onClick={(e) => {
                                        setEventCategory(eventTypes[index])
                                        console.log(eventTypes[index])
                                    }}
                                >
                                    {eventType}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>                
            }

        </StyleBoxContainer>
        
    </>
};
