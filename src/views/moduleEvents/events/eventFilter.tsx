import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { EventDto } from "../../../domain/createEvent";
import { getEventTypes, } from "../../../services/moduleService";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { EventCategory } from "../../../domain/eventTypes";
import { AllEventsOption, EventsByCreated, EventsByInvitation, EventsByTitleSearch, EventsByType, FilterOption } from "./filterStrategy";


const options = [
    'sin filtro',
    'titulo',
    'categoria',
    'creados',
    'invitaciones'
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
        if (options[index] === "sin filtro") noFilterStrategy();
        if (options[index] === "titulo") filterByTitleStrategy();
        if (options[index] === "categoria") await filterByTypeStrategy();
        if (options[index] === "creados") await filterByCreatedStrategy();
        if (options[index] === "invitaciones") await filterByInvitedStrategy();
        setSelectedIndex(index);
    };

    const getEvents = async () => {
        const events: EventDto[] = await filterStrategy.getEvents(inputRef.current?.value!, eventCategory);
        eventSetter(events);
    };


    useEffect(() => {
        getEvents();
    }, [eventCategory, filterStrategy]);


    return <>
        <div className="container__filter">
            <button className="filter">{options[selectedIndex]}</button>
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
        </div>

        {filterMode === "title" &&
            <form onSubmit={handleSubmit} style={{ width: 'min(100%, 50rem)', alignSelf:'center' }}>
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
            <FormControl fullWidth sx={{ width: 'min(100%, 50rem)', alignSelf:'center' }}>
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
