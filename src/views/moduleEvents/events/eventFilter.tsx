import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { EventDto } from "../../../domain/createEvent";
import { getEventTypes, } from "../../../services/moduleService";
import { ClickAwayListener, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { EventCategory } from "../../../domain/eventTypes";
import { AllEventsOption, EventsByCreated, EventsByInvitation, EventsByTitleSearch, EventsByType, FilterOption } from "./filterStrategy";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const options = [
    'Sin filtro',
    'Titulo',
    'Categoria',
    'Creados',
    'Invitaciones'
];

type FilterMode = "all" | "title" | "type" | "created" | "invited";

export const EventFilter = (
    { eventSetter }: { eventSetter: Dispatch<SetStateAction<EventDto[] | undefined>> }
) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [eventCategory, setEventCategory] = useState<EventCategory>("SOCIAL");
    const [filterMode, setFilterMode] = useState<FilterMode>("all")
    const [filterStrategy, setFilterStrategy] = useState<FilterOption>(new AllEventsOption);
    const [eventTypes, setEventTypes] = useState<EventCategory[]>()
    const [filterOpen, setFilterOpen] = useState<boolean>()
    async function noFilterStrategy() {
        setFilterMode("all");
        setFilterStrategy(new AllEventsOption());
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
        setFilterStrategy(new EventsByCreated());
    }

    async function filterByInvitedStrategy() {
        setFilterMode("invited");
        setFilterStrategy(new EventsByInvitation());
    }


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(inputRef.current?.value);
        if (inputRef.current) {
            getEvents();
        }
    };

    async function handleMenuItemClick(
        event: React.MouseEvent<HTMLElement>,
        index: number
    ) {
        if (options[index] === "Sin filtro") noFilterStrategy();
        if (options[index] === "Titulo") filterByTitleStrategy();
        if (options[index] === "Categoria") await filterByTypeStrategy();
        if (options[index] === "Creados") await filterByCreatedStrategy();
        if (options[index] === "Invitaciones") await filterByInvitedStrategy();
        setSelectedIndex(index);
        setFilterOpen(false)
    };

    const getEvents = async () => {
        const events: EventDto[] = await filterStrategy.getEvents(inputRef.current?.value!, eventCategory);
        eventSetter(events);
    };


    useEffect(() => {
        getEvents();
    }, [eventCategory, filterStrategy]);

    


    return <>
    {/** Componente de Material UI que me permite esuchar los clicks y asignarle un evento */}
    <ClickAwayListener onClickAway={() => filterOpen && setFilterOpen(false)}>  
        <div className="container__filter">
            
            <button
                className="filter"
                onClick={(e) => {
                    e.preventDefault()
                    console.log(filterOpen)
                    setFilterOpen((prev) => !prev)
                    console.log(filterOpen)
            }}>
                Filtrar por 
                <strong>   {options[selectedIndex]}</strong>
                {filterOpen ?
                    <><KeyboardArrowUpIcon /></> :
                    <><KeyboardArrowDownIcon /></>
                }
            </button>

            {filterOpen &&
                <div className="filter__options">
                    {options.map((option, index) => (
                        <div
                            className="filter__option"
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            }

        </div>
    </ClickAwayListener>

        {filterMode === "title" &&
            <form onSubmit={handleSubmit} style={{ width: 'min(100%, 50rem)', alignSelf: 'center' }}>
                <TextField
                    required
                    // id="outlined-required"
                    label="titulo del evento"
                    color="info"
                    inputRef={inputRef}
                    sx={{ width: '100%' }}
                />
            </form>
        }
        {filterMode === "type" &&
            <FormControl fullWidth sx={{ width: 'min(100%, 50rem)', alignSelf: 'center' }}>
                <InputLabel id="demo-simple-select-label">CATEGORIA</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    label="Age"
                    value={eventCategory}
                    sx={{ borderColor: 'red' }}
                >
                    {eventTypes?.map((eventType, index) => (
                        <MenuItem
                            key={eventType}
                            value={eventType}
                            sx={{ height: '5rem' }}
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

    </>
};
