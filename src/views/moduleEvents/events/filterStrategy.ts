import { EventDto } from "../../../domain/createEvent";
import { EventCategory } from "../../../domain/eventTypes";
import { getEvents, getEventsByCategory, getEventsByTitle } from "../../../services/moduleService";
import { EventType } from "../../../utils/typeEvent";

export interface FilterOption {
    getEvents(eventTitle:string, eventCategory:EventCategory): Promise<EventDto[]>;
}

export class AllEventsOption implements FilterOption {
    public async getEvents(eventTitle:string, eventCategory:EventCategory): Promise<EventDto[]> {
        return await getEvents();
    
    }
}

export class EventsByTitleSearch implements FilterOption {
    public async getEvents(eventTitle:string, eventCategory:EventCategory): Promise<EventDto[]> {
        return await getEventsByTitle(eventTitle);
    }
}

export class EventsByType implements FilterOption {
    public async getEvents(eventTitle:string, eventCategory:EventCategory): Promise<EventDto[]> {
        return await getEventsByCategory(eventCategory);
    }
}