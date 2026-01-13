// Date formatting utilities for Kannada dates

const kannadaMonths = [
    'ಜನವರಿ',    // January
    'ಫೆಬ್ರವರಿ',  // February
    'ಮಾರ್ಚ್',    // March
    'ಏಪ್ರಿಲ್',   // April
    'ಮೇ',        // May
    'ಜೂನ್',      // June
    'ಜುಲೈ',      // July
    'ಆಗಸ್ಟ್',    // August
    'ಸೆಪ್ಟೆಂಬರ್', // September
    'ಅಕ್ಟೋಬರ್',  // October
    'ನವೆಂಬರ್',   // November
    'ಡಿಸೆಂಬರ್'   // December
];

/**
 * Format a SQL date (YYYY-MM-DD) to Kannada format (ಮಾರ್ಚ್ 20, 2026)
 * @param dateString - SQL date string in YYYY-MM-DD format
 * @returns Formatted Kannada date string
 */
export function formatKannadaDate(dateString: string): string {
    if (!dateString) return '';

    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; // Return original if invalid

        const month = kannadaMonths[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    } catch (error) {
        console.error('Error formatting Kannada date:', error);
        return dateString;
    }
}

/**
 * Format time from HH:MM:SS to readable format
 * @param timeString - SQL time string
 * @returns Formatted time string
 */
export function formatTime(timeString: string): string {
    if (!timeString) return '';

    try {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const min = minutes;

        if (hour === 0 && min === '00') return 'All Day';

        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);

        return `${displayHour}:${min} ${period}`;
    } catch (error) {
        return timeString;
    }
}
