-- Sri Siddaroodha Ashrama Database Schema
-- Run this in your InterServer cPanel phpMyAdmin

-- Create database (if needed)
-- CREATE DATABASE ashrama_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE ashrama_db;

-- Events Table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title_kannada VARCHAR(255),
    date DATE NOT NULL,
    time VARCHAR(50),
    location VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255),
    is_past BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_date (date),
    INDEX idx_is_past (is_past)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Trustees Table
CREATE TABLE IF NOT EXISTS trustees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    category ENUM('ashrama', 'events', 'seva', 'festivals') DEFAULT 'ashrama',
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Donations Table
CREATE TABLE IF NOT EXISTS donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    razorpay_order_id VARCHAR(100),
    razorpay_payment_id VARCHAR(100),
    amount DECIMAL(10,2) NOT NULL,
    donor_name VARCHAR(255),
    donor_email VARCHAR(255),
    donor_phone VARCHAR(20),
    status ENUM('pending', 'success', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_submitted (submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Sample Data

-- Sample Events
INSERT INTO events (title, title_kannada, date, time, location, description, is_past) VALUES
('Maha Shivaratri Celebration', 'ಮಹಾ ಶಿವರಾತ್ರಿ ಆಚರಣೆ', '2025-02-26', '6:00 PM onwards', 'Main Temple', 'Grand celebration with all-night bhajans, abhishekam, and prasadam distribution.', 0),
('Guru Purnima', 'ಗುರು ಪೂರ್ಣಿಮಾ', '2025-07-13', '5:00 AM - 9:00 PM', 'Ashrama Grounds', 'Special prayers and guru paduka puja honoring Sri Siddaroodha Swamiji.', 0),
('Navaratri Festival', 'ನವರಾತ್ರಿ ಉತ್ಸವ', '2024-10-03', '6:00 PM - 9:00 PM', 'Main Temple', 'Nine days of devotional celebrations with daily aarti and cultural programs.', 1);

-- Sample Trustees
INSERT INTO trustees (name, role, description, display_order) VALUES
('Sri Rajendra Kumar', 'President', 'Leading the Ashrama with dedication for over 15 years, focusing on spiritual programs and community service.', 1),
('Smt. Lakshmi Devi', 'Secretary', 'Managing daily operations and coordinating seva activities with devotion and efficiency.', 2),
('Sri Venkatesh Rao', 'Treasurer', 'Overseeing financial management and ensuring transparency in all transactions.', 3),
('Sri Mahesh Patil', 'Trustee', 'Coordinating educational programs and youth outreach initiatives.', 4);

-- Sample Gallery Images
INSERT INTO gallery (image_url, alt_text, category) VALUES
('/uploads/temple-main.jpg', 'Main temple sanctum', 'ashrama'),
('/uploads/annadanam-service.jpg', 'Daily annadanam service', 'seva'),
('/uploads/shivaratri-2024.jpg', 'Maha Shivaratri celebration', 'events');

-- Create Default Admin User
-- Username: admin
-- Password: Admin@123 (CHANGE THIS IMMEDIATELY AFTER FIRST LOGIN)
INSERT INTO admin_users (username, password_hash) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Note: The password hash above is for 'Admin@123'
-- You should change this password immediately after first login through the admin panel
