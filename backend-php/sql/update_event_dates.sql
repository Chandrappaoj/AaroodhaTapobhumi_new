-- Update all events with proper Kannada dates
-- Run this SQL in phpMyAdmin

-- Update Rama Navami
UPDATE events 
SET date = 'ಏಪ್ರಿಲ್ 6, 2025' 
WHERE title = 'Rama Navami' OR title_kn = 'ಶ್ರೀ ರಾಮನವಮಿ';

-- Update Maha Shivaratri
UPDATE events 
SET date = 'ಫೆಬ್ರವರಿ 26, 2025' 
WHERE title = 'Maha Shivaratri Celebration' OR title_kn = 'ಮಹಾ ಶಿವರಾತ್ರಿ ಆಚರಣೆ';

-- Update Siddharoodha Swami Jayanti
UPDATE events 
SET date = 'ಮಾರ್ಚ್ 15, 2025' 
WHERE title = 'Siddharoodha Swami Jayanti' OR title_kn = 'ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮಿ ಜಯಂತಿ';

-- Update any other events (adjust as needed)
UPDATE events 
SET date = 'ಪ್ರತೀ ಶನಿವಾರ' 
WHERE title LIKE '%Weekly%' OR title LIKE '%Satsang%';

-- Verify the updates
SELECT id, title, title_kn, date, is_past, is_featured FROM events ORDER BY id;
