import axios from 'axios';

const API_BASE_URL = 'http://localhost/ashrama-api/api';

export interface Event {
    id: number;
    title: string;
    title_kn: string;
    date: string;
    time: string;
    location: string;
    location_kn: string;
    description: string;
    description_kn: string;
    is_featured: boolean;
    created_at: string;
}

/**
 * Fetch all events from the API
 */
export const fetchEvents = async (): Promise<Event[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/events.php`);
        if (response.data.success) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
};

/**
 * Fetch upcoming events (limit to specified number)
 */
export const fetchUpcomingEvents = async (limit: number = 3): Promise<Event[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/events.php?limit=${limit}`);
        console.log('Events API Response:', response.data);
        if (response.data.success) {
            console.log('Events data:', response.data.data);
            return response.data.data;
        }
        console.log('API returned success=false');
        return [];
    } catch (error) {
        console.error('Error fetching upcoming events:', error);
        return [];
    }
};

/**
 * Fetch featured events
 */
export const fetchFeaturedEvents = async (): Promise<Event[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/events.php?featured=1`);
        if (response.data.success) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        console.error('Error fetching featured events:', error);
        return [];
    }
};
