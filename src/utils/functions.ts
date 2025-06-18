export function calculateTimeLeft(eventDate: string) {
    const targetDate = new Date(eventDate);
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime(); // Diferencia en milisegundos

    let timeLeft = {
        hours: 0,
        minutes: 0,
    };

    if (difference > 0) {
        timeLeft = {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
        };
    }
    return timeLeft;
};

export function formatDate(dateToFormat: Date) {
    const splitedDate = dateToFormat.toString().split("T");
    const date = splitedDate[0];
    const time = splitedDate[1].split(":");
    const hour = time[0] + ":" + time[1];

    return date + " | " + hour;
}