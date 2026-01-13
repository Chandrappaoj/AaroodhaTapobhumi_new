-- Create site_images table for managing dynamic website images
CREATE TABLE IF NOT EXISTS site_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section VARCHAR(50) UNIQUE NOT NULL,
    image_url VARCHAR(255),
    mobile_image_url VARCHAR(255),
    alt_text VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default entries for all sections
INSERT INTO site_images (section, image_url, mobile_image_url, alt_text) VALUES
('hero_bg', NULL, NULL, 'Hero section background - Sri Siddaroodha Swamiji Ashrama'),
('about_banner', NULL, NULL, 'About page banner image'),
('seva_puja', NULL, NULL, 'Seva section - Spiritual programs and puja'),
('seva_education', NULL, NULL, 'Seva section - Education support'),
('seva_healthcare', NULL, NULL, 'Seva section - Healthcare and social service'),
('annadanam', NULL, NULL, 'Annadanam - Sacred food service'),
('events_bg', NULL, NULL, 'Events page background'),
('donate_bg', NULL, NULL, 'Donate page background')
ON DUPLICATE KEY UPDATE section = section;
