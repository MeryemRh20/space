-- Sample big database for MySQL: users, reservations, and packs for Workbeat
-- Drop and create tables
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS packs;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  role ENUM('user','admin') DEFAULT 'user'
);

CREATE TABLE packs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  price DECIMAL(10,2)
);

CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  pack_id INT,
  date DATE,
  status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pack_id) REFERENCES packs(id)
);

-- Insert users
INSERT INTO users (name, email, password, role) VALUES
('Alice Smith', 'alice1@workbeat.com', 'pass123', 'user'),
('Bob Johnson', 'bob2@workbeat.com', 'pass123', 'user'),
('Carol Lee', 'carol3@workbeat.com', 'pass123', 'user'),
('David Kim', 'david4@workbeat.com', 'pass123', 'user'),
('Emma Brown', 'emma5@workbeat.com', 'pass123', 'user'),
('Frank Green', 'frank6@workbeat.com', 'pass123', 'user'),
('Grace Hall', 'grace7@workbeat.com', 'pass123', 'user'),
('Henry Clark', 'henry8@workbeat.com', 'pass123', 'user'),
('Ivy Adams', 'ivy9@workbeat.com', 'pass123', 'user'),
('Jack Turner', 'jack10@workbeat.com', 'pass123', 'user'),
('Admin User', 'admin@workbeat.com', 'adminpass', 'admin'),
-- Add more users for a "big" database
('Liam Scott', 'liam11@workbeat.com', 'pass123', 'user'),
('Mia King', 'mia12@workbeat.com', 'pass123', 'user'),
('Noah Young', 'noah13@workbeat.com', 'pass123', 'user'),
('Olivia Hill', 'olivia14@workbeat.com', 'pass123', 'user'),
('Paul Baker', 'paul15@workbeat.com', 'pass123', 'user'),
('Quinn Perez', 'quinn16@workbeat.com', 'pass123', 'user'),
('Ruby Evans', 'ruby17@workbeat.com', 'pass123', 'user'),
('Sam Foster', 'sam18@workbeat.com', 'pass123', 'user'),
('Tina Gray', 'tina19@workbeat.com', 'pass123', 'user'),
('Uma Harris', 'uma20@workbeat.com', 'pass123', 'user'),
('Victor James', 'victor21@workbeat.com', 'pass123', 'user'),
('Wendy Lewis', 'wendy22@workbeat.com', 'pass123', 'user'),
('Xander Martin', 'xander23@workbeat.com', 'pass123', 'user'),
('Yara Nelson', 'yara24@workbeat.com', 'pass123', 'user'),
('Zane Owens', 'zane25@workbeat.com', 'pass123', 'user');

-- Insert packs
INSERT INTO packs (name, description, price) VALUES
('Starter Pack', 'Basic coworking access for individuals.', 49.99),
('Team Pack', 'Shared workspace for small teams.', 199.99),
('Pro Pack', 'Premium workspace with extra amenities.', 399.99),
('Enterprise Pack', 'Full office suite for large teams.', 999.99);

-- Insert reservations (randomly distributed)
INSERT INTO reservations (user_id, pack_id, date, status) VALUES
(1, 1, '2025-07-01', 'confirmed'),
(2, 2, '2025-07-02', 'pending'),
(3, 3, '2025-07-03', 'confirmed'),
(4, 2, '2025-07-03', 'cancelled'),
(5, 1, '2025-07-04', 'confirmed'),
(6, 4, '2025-07-04', 'pending'),
(7, 3, '2025-07-05', 'confirmed'),
(8, 1, '2025-07-06', 'confirmed'),
(9, 2, '2025-07-06', 'confirmed'),
(10, 3, '2025-07-07', 'pending'),
(11, 4, '2025-07-07', 'confirmed'),
(12, 1, '2025-07-08', 'pending'),
(13, 2, '2025-07-08', 'confirmed'),
(14, 3, '2025-07-09', 'cancelled'),
(15, 4, '2025-07-09', 'confirmed'),
(16, 1, '2025-07-10', 'confirmed'),
(17, 2, '2025-07-10', 'pending'),
(18, 3, '2025-07-11', 'confirmed'),
(19, 4, '2025-07-11', 'pending'),
(20, 1, '2025-07-12', 'confirmed'),
(21, 2, '2025-07-12', 'confirmed'),
(22, 3, '2025-07-13', 'pending'),
(23, 4, '2025-07-13', 'confirmed'),
(24, 1, '2025-07-14', 'confirmed'),
(25, 2, '2025-07-14', 'confirmed');
-- Add more reservations as needed for testing scale
