/**
 * API Service Layer
 * Handles all API calls to the PHP backend
 */

// API Base URL - Auto-detects based on environment
const isProd = import.meta.env.PROD;
// In production, we assume the API is at /api relative to the root
const API_BASE_URL = isProd ? '/api' : 'http://localhost/ashrama-api/api';
const IMAGE_BASE_URL = isProd ? '' : 'http://localhost/ashrama-api';

/**
 * Helper to construct full image URLs
 */
export const getImageUrl = (path: string | null | undefined): string => {
    if (!path) return '';
    // If already a full URL, return as is
    if (path.startsWith('http')) return path;
    // If path already starts with /ashrama-api/, just add localhost
    if (path.startsWith('/ashrama-api/')) {
        return `http://localhost${path}`;
    }
    // Otherwise prepend the full base URL
    return `${IMAGE_BASE_URL}${path}`;
};

/**
 * Generic API call function
 */
export async function apiCall(endpoint: string, options: RequestInit = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Events API
 */
export const eventsAPI = {
    getUpcoming: () => apiCall('/events.php?type=upcoming'),
    getPast: () => apiCall('/events.php?type=past'),
};

/**
 * Trustees API
 */
export const trusteesAPI = {
    getAll: () => apiCall('/trustees.php'),
};

/**
 * Gallery API
 */
export const galleryAPI = {
    getAll: () => apiCall('/gallery.php?category=all'),
    getByCategory: (category) => apiCall(`/gallery.php?category=${category}`),
};

/**
 * Contact Form API
 */
export const contactAPI = {
    submit: (formData) =>
        apiCall('/contact.php', {
            method: 'POST',
            body: JSON.stringify(formData),
        }),
};

/**
 * Payment API
 */
export const paymentAPI = {
    createOrder: (orderData) =>
        apiCall('/payment/create-order.php', {
            method: 'POST',
            body: JSON.stringify(orderData),
        }),
    verifyPayment: (paymentData) =>
        apiCall('/payment/verify.php', {
            method: 'POST',
            body: JSON.stringify(paymentData),
        }),
};

export default {
    events: eventsAPI,
    trustees: trusteesAPI,
    gallery: galleryAPI,
    contact: contactAPI,
    payment: paymentAPI,
};
