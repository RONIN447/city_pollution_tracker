CREATE DATABASE city_pollution_tracker;

USE city_pollution_tracker;

-- Table for areas
CREATE TABLE Areas (
    area_id INT AUTO_INCREMENT PRIMARY KEY,
    area_name VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8)
);

-- Table for pollution data
CREATE TABLE Pollution_Data (
    data_id INT AUTO_INCREMENT PRIMARY KEY,
    area_id INT,
    pollution_type VARCHAR(50),
    reading DECIMAL(10, 2),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (area_id) REFERENCES Areas(area_id)
);

-- Table for user submissions
CREATE TABLE User_Submissions (
    submission_id INT AUTO_INCREMENT PRIMARY KEY,
    area_id INT,
    pollution_type VARCHAR(50),
    description TEXT,
    submitted_by VARCHAR(100),
    submission_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (area_id) REFERENCES Areas(area_id)
);

-- Insert Sample Data
INSERT INTO Areas (area_name, latitude, longitude) VALUES 
('Downtown', 40.7128, -74.0060),
('Uptown', 40.8148, -73.9364),
('Midtown', 40.7549, -73.9840);


INSERT INTO Pollution_Data (area_id, pollution_type, reading) VALUES
(1, 'Air Quality', 55.2),
(2, 'Noise Level', 72.5),
(3, 'Air Quality', 65.3);

INSERT INTO Areas (area_name, latitude, longitude) VALUES 
('Jabalpur', 41.7128, -73.0060),
('Mumbai', 54.8148, -21.9364),
('Delhi', 77.7549, -43.9840);

INSERT INTO Pollution_Data (area_id, pollution_type, reading) VALUES
(4, 'Air Quality', 55.2),
(5, 'UV Index', 72.5),
(6, 'Wind Speed', 65.3);

SELECT * FROM Areas;

DELETE FROM Areas
WHERE area_name='Downtown';

SELECT * FROM User_Submissions;

DROP TABLE Areas;
