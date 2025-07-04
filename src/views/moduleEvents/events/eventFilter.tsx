import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from "@mui/icons-material/Search";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { EventDto } from "../../../domain/createEvent";
import { EventCategory } from "../../../domain/eventTypes";
import { getEventTypes, } from "../../../services/moduleService";
import { AllEventsOption, EventsByCreated, EventsByInvitation, EventsByTitleSearch, EventsByType, FilterOption } from "./filterStrategy";

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
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [eventCategory, setEventCategory] = useState<EventCategory>("SOCIAL");
    const [filterMode, setFilterMode] = useState<FilterMode>("all")
    const [filterStrategy, setFilterStrategy] = useState<FilterOption>(new AllEventsOption);
    const [eventTypes, setEventTypes] = useState<EventCategory[]>()
    const [filterOpen, setFilterOpen] = useState<boolean>(false)
    const [categoryFilterOpen, setCategoryFilterOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchExpanded, setSearchExpanded] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const filterContainerRef = useRef<HTMLDivElement>(null); 

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

    const executeTitleSearch = async () => {
        if (filterMode === 'title') {
            const events: EventDto[] = await filterStrategy.getEvents(searchValue, eventCategory);
            eventSetter(events);
        }
    };

    const handleSearchIconClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (searchExpanded) {
            executeTitleSearch();
        } else {
            setSearchExpanded(true);
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
        setFilterOpen(false); // Cierra el menú al hacer clic en una opción
    };

    const getEvents = async () => {
        const events: EventDto[] = await filterStrategy.getEvents("", eventCategory);
        eventSetter(events);
    };

    useEffect(() => {
        getEvents();
    }, [eventCategory, filterStrategy]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setSearchExpanded(false);
            }
            if (filterContainerRef.current && !filterContainerRef.current.contains(event.target as Node)) {
                setFilterOpen(false);
                setCategoryFilterOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); 


    return <>
        <div 
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}
            ref={filterContainerRef} 
        >
            <div className="container__filter">
                <button
                    className="filter"
                    onClick={(e) => {
                        e.preventDefault()
                        setCategoryFilterOpen(false);
                        setFilterOpen((prev) => !prev)
                    }}>
                        Filtrar
                    <strong> {options[selectedIndex]}</strong>
                    {filterOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </button>

                {filterOpen &&
                    <div className="filter__options">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className="filter__option"
                                onClick={(event) => handleMenuItemClick(event, index)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                }
            </div>

            {filterMode === "type" &&
                <div className="container__filter">
                    <button
                        className="filter"
                        onClick={(e) => {
                            e.preventDefault();
                            setFilterOpen(false);
                            setCategoryFilterOpen((prev) => !prev);
                        }}
                    >
                        <strong>{eventCategory}</strong>
                        {categoryFilterOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </button>

                    {categoryFilterOpen &&
                        <div className="filter__options">
                            {eventTypes?.map((type, index) => (
                                <div
                                    key={index}
                                    className="filter__option"
                                    onClick={() => {
                                        setEventCategory(type);
                                        setCategoryFilterOpen(false); 
                                    }}
                                >
                                    {type}
                                </div>
                            ))}
                        </div>
                    }
                </div>
            }
        </div>

        {filterMode === "title" &&
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '1rem 0' }}>
                <div
                    ref={searchContainerRef}
                    className={`search-container ${searchExpanded ? "expanded" : ""}`}
                    onClick={() => setSearchExpanded(true)}
                >
                    <input
                        type="text"
                        name="search"
                        placeholder="Buscar evento por título..."
                        className="search-input"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { executeTitleSearch(); } }}
                    />
                    <SearchIcon
                        className="search-icon"
                        onClick={handleSearchIconClick}
                        style={{ fontSize: 36, background: "transparent", width: "auto" }}
                    />
                </div>
            </div>
        }
    </>
};