import { apiCall } from './api';

export interface SiteImage {
    id: number;
    section: string;
    image_url: string | null;
    mobile_image_url: string | null;
    alt_text: string;
    updated_at: string;
    created_at: string;
}

/**
 * Fetch all site images
 */
export const fetchSiteImages = async (): Promise<SiteImage[]> => {
    const response = await apiCall('/site-images.php');
    return response.data || [];
};

/**
 * Fetch a specific site image by section
 */
export const fetchSiteImageBySection = async (section: string): Promise<SiteImage | null> => {
    const response = await apiCall(`/site-images.php?section=${encodeURIComponent(section)}`);
    return response.data || null;
};
