-- Update events table schema to match new bilingual design
-- Run this SQL in phpMyAdmin or MySQL command line

-- Add new bilingual fields
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS title_kn VARCHAR(255) AFTER title,
ADD COLUMN IF NOT EXISTS location_kn VARCHAR(255) AFTER location,
ADD COLUMN IF NOT EXISTS description_kn TEXT AFTER description,
ADD COLUMN IF NOT EXISTS is_featured TINYINT(1) DEFAULT 0 AFTER description_kn;

-- If you have an old title_kannada column, copy data and remove it
-- (This is safe - it won't error if the column doesn't exist)
UPDATE events 
SET title_kn = title_kannada 
WHERE title_kn IS NULL AND title_kannada IS NOT NULL;

-- Optional: Remove old column if it exists
-- ALTER TABLE events DROP COLUMN IF EXISTS title_kannada;

-- Verify the changes
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'events' AND TABLE_SCHEMA = DATABASE()
ORDER BY ORDINAL_POSITION;
