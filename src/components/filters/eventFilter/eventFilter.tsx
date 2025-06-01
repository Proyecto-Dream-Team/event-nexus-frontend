import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { EventDto } from "../../../domain/createEvent";
import { getEventTypes,  } from "../../../services/moduleService";
import "./eventFilter.css";
import { List, ListItemButton, ListItemText, Menu, MenuItem } from "@mui/material";

import { EventCategory } from "../../../domain/eventTypes";
import { AllEventsOption, EventsByTitleSearch, EventsByType, FilterOption } from "../../../views/moduleEvents/events/filterStrategy";

const options = [
    'sin filtro',
    'titulo',
    'categoria'
];
type FilterMode = "all" | "title" | "type"
export const EventFilter = ({eventSetter}:{eventSetter:Dispatch<SetStateAction<EventDto[] | undefined>>}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [eventCategory, setEventCategory] = useState<EventCategory>("SOCIAL");
    const [filterMode, setFilterMode] = useState<FilterMode>("all")
    const [filterStrategy, setFilterStrategy] = useState<FilterOption>(new AllEventsOption);
    const [eventTypes, setEventTypes] = useState<string[]>()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    function noFilterStrategy(){
        setFilterMode("all");
        setFilterStrategy(new AllEventsOption());
        getEvents()
    }

    function filterByTitleStrategy(){
        setFilterMode("title");
        setFilterStrategy(new EventsByTitleSearch());
    }

    async function filterByTypeStrategy() {
        setFilterMode("type");
        const eventTypes: string[] = await getEventTypes();
        setEventTypes(eventTypes)
        setFilterStrategy(new EventsByType());
    }
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
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
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const getEvents = async () => {
        const events: EventDto[] = await filterStrategy.getEvents(inputRef.current?.value!, eventCategory);
        eventSetter(events);
    };


    useEffect(() => {
        getEvents();
    }, [eventCategory]);


    return (
        <div className="containerEvents">
            <div>
                <List
                    component="nav"
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
                </List>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleClose}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>

            {filterMode === "title" &&
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" id="filterValue" ref={inputRef} />
                </form>
            }

            {filterMode === "type" &&
                eventTypes?.map((eventType, index) => (
                    <fieldset>
                        <input
                            id={eventType}
                            type="radio"
                            value={eventType}
                            name="eventType"
                            key={index}
                            onClick={(e) => {
                                setEventCategory(
                                    e.currentTarget.value as EventCategory
                                );
                            }}
                        />
                        <label htmlFor={eventType}>{eventType}</label>
                    </fieldset>
                ))
            }
        </div>
    );
};
