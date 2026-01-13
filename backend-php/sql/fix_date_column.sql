-- Fix the date column to accept Kannada text
-- Run this SQL in phpMyAdmin

-- Change the date column from DATE to VARCHAR(255)
ALTER TABLE events 
MODIFY COLUMN date VARCHAR(255) NOT NULL;

-- Now update the dates with Kannada format
UPDATE events 
SET date = 'ಏಪ್ರಿಲ್ 6, 2025' 
WHERE title = 'Rama Navami';

UPDATE events 
SET date = 'ಫೆಬ್ರವರಿ 26, 2025' 
WHERE title = 'Maha Shivaratri Celebration';

UPDATE events 
SET date = 'ಮಾರ್ಚ್ 15, 2025' 
WHERE title = 'Siddharoodha Swami Jayanti';

-- Verify the changes
SELECT id, title, title_kn, date, is_past, is_featured FROM events;
