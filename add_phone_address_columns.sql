-- SQL script to add phone and address columns to existing users table
-- Run this if you want to add these fields later

ALTER TABLE users 
ADD COLUMN phone VARCHAR(20) NULL,
ADD COLUMN address TEXT NULL;

-- Update the User.java entity and UserController.java to include these fields
-- Then restart the backend application 