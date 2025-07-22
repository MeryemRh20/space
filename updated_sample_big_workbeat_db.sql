-- Updated sample big database for MySQL: users, reservations, and packs for Workbeat
-- Drop and create tables
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS packs;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  role ENUM('user','admin') DEFAULT 'user',
  phone VARCHAR(20),
  address TEXT
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

-- Insert users with phone and address information
INSERT INTO users (name, email, password, role, phone, address) VALUES
('Alice Smith', 'alice1@workbeat.com', 'pass123', 'user', '+1-555-0101', '123 Main St, New York, NY 10001'),
('Bob Johnson', 'bob2@workbeat.com', 'pass123', 'user', '+1-555-0102', '456 Oak Ave, Los Angeles, CA 90210'),
('Carol Lee', 'carol3@workbeat.com', 'pass123', 'user', '+1-555-0103', '789 Pine Rd, Chicago, IL 60601'),
('David Kim', 'david4@workbeat.com', 'pass123', 'user', '+1-555-0104', '321 Elm St, Houston, TX 77001'),
('Emma Brown', 'emma5@workbeat.com', 'pass123', 'user', '+1-555-0105', '654 Maple Dr, Phoenix, AZ 85001'),
('Frank Green', 'frank6@workbeat.com', 'pass123', 'user', '+1-555-0106', '987 Cedar Ln, Philadelphia, PA 19101'),
('Grace Hall', 'grace7@workbeat.com', 'pass123', 'user', '+1-555-0107', '147 Birch Way, San Antonio, TX 78201'),
('Henry Clark', 'henry8@workbeat.com', 'pass123', 'user', '+1-555-0108', '258 Spruce Ct, San Diego, CA 92101'),
('Ivy Adams', 'ivy9@workbeat.com', 'pass123', 'user', '+1-555-0109', '369 Willow Pl, Dallas, TX 75201'),
('Jack Turner', 'jack10@workbeat.com', 'pass123', 'user', '+1-555-0110', '741 Aspen Blvd, San Jose, CA 95101'),
('Admin User', 'admin@workbeat.com', 'adminpass', 'admin', '+1-555-0000', 'Admin Office, Workbeat HQ'),
-- Add more users for a "big" database
('Liam Scott', 'liam11@workbeat.com', 'pass123', 'user', '+1-555-0111', '852 Poplar St, Austin, TX 73301'),
('Mia King', 'mia12@workbeat.com', 'pass123', 'user', '+1-555-0112', '963 Sycamore Ave, Jacksonville, FL 32099'),
('Noah Young', 'noah13@workbeat.com', 'pass123', 'user', '+1-555-0113', '159 Magnolia Rd, Fort Worth, TX 76101'),
('Olivia Hill', 'olivia14@workbeat.com', 'pass123', 'user', '+1-555-0114', '357 Dogwood Ln, Columbus, OH 43201'),
('Paul Baker', 'paul15@workbeat.com', 'pass123', 'user', '+1-555-0115', '486 Redwood Dr, Charlotte, NC 28201'),
('Quinn Perez', 'quinn16@workbeat.com', 'pass123', 'user', '+1-555-0116', '753 Sequoia Way, San Francisco, CA 94101'),
('Ruby Evans', 'ruby17@workbeat.com', 'pass123', 'user', '+1-555-0117', '951 Cypress Ct, Indianapolis, IN 46201'),
('Sam Foster', 'sam18@workbeat.com', 'pass123', 'user', '+1-555-0118', '264 Juniper Pl, Seattle, WA 98101'),
('Tina Gray', 'tina19@workbeat.com', 'pass123', 'user', '+1-555-0119', '837 Hemlock Blvd, Denver, CO 80201'),
('Uma Harris', 'uma20@workbeat.com', 'pass123', 'user', '+1-555-0120', '429 Fir St, Washington, DC 20001'),
('Victor James', 'victor21@workbeat.com', 'pass123', 'user', '+1-555-0121', '638 Larch Ave, Boston, MA 02101'),
('Wendy Lewis', 'wendy22@workbeat.com', 'pass123', 'user', '+1-555-0122', '847 Hawthorn Rd, El Paso, TX 79901'),
('Xander Martin', 'xander23@workbeat.com', 'pass123', 'user', '+1-555-0123', '156 Chestnut Ln, Nashville, TN 37201'),
('Yara Nelson', 'yara24@workbeat.com', 'pass123', 'user', '+1-555-0124', '273 Acacia Dr, Detroit, MI 48201'),
('Zane Owens', 'zane25@workbeat.com', 'pass123', 'user', '+1-555-0125', '384 Beech Way, Portland, OR 97201');

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