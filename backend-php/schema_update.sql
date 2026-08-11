-- Database Schema Updates for Charitre and Donation Settings

CREATE TABLE IF NOT EXISTS charitre_chapters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chapter_number INT NOT NULL,
    title_kn VARCHAR(255) NOT NULL,
    subtitle_kn VARCHAR(255),
    content_kn LONGTEXT,
    audio_file VARCHAR(255),
    cover_image VARCHAR(255),
    is_published TINYINT(1) DEFAULT 1,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS donation_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_name VARCHAR(255) NOT NULL,
    account_number VARCHAR(100) NOT NULL,
    ifsc_code VARCHAR(50) NOT NULL,
    bank_name VARCHAR(255) NOT NULL,
    upi_id VARCHAR(100) NOT NULL,
    qr_code VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default donation settings
INSERT INTO donation_settings (account_name, account_number, ifsc_code, bank_name, upi_id, qr_code)
SELECT 'Sri Aaroodha Tapobhumi Trust', '1234567890123456', 'ICIC0001234', 'ICICI Bank, Bangalore Branch', 'ashrama@okicici', ''
WHERE NOT EXISTS (SELECT * FROM donation_settings);
