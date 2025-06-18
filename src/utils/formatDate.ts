class Utils{

    setDate(date:Date) : string {
        const dateObj = new Date(date);
        const day = dateObj.getDate().toString().padStart(2, '0'); // Día con dos dígitos
        const month = (dateObj.getMonth() + 1).toString(); // Mes (1-12)
        const year = dateObj.getFullYear();

        return `${day}/${month}/${year}`
    }

    setStartTime(date:Date): string {
        const dateObj = new Date(date);
        
        const hours = dateObj.getHours().toString().padStart(2, '0');
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    setEndTime(date:Date, duration: number): string {
        const startDate = new Date(date);
        startDate.setMinutes(startDate.getMinutes() + duration);
        
        const hours = startDate.getHours().toString().padStart(2, '0');
        const minutes = startDate.getMinutes().toString().padStart(2, '0');
        return`${hours}:${minutes}`;
    }
    
}

export const utils = new Utils()