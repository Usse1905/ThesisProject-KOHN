
INSERT INTO Users (userName, email, password,dateOfBirth,dateOfLicense,role) VALUES 
('John Doe', 'john.doe@example.com', 'password1',1995,2017,"user"),
('Jane Smith', 'jane.smith@example.com', 'password2',1990,2009,"user"),
('Michael Brown', 'michael.brown@example.com', 'password3',1991,2011,"user"),
('Emily Davis', 'emily.davis@example.com', 'password4',1993,2013,"user"),
('William Johnson', 'william.johnson@example.com', 'password5',1999,2014,"user"),
('Olivia Wilson', 'olivia.wilson@example.com', 'password6',2000,2020,"user"),
('James Taylor', 'james.taylor@example.com', 'password7',2001,2019,"user"),
('Sophia Martinez', 'sophia.martinez@example.com', 'password8',1995,2012,"user"),
('Benjamin Lee', 'benjamin.lee@example.com', 'password9',1986,2008,"user"),
('Isabella Anderson', 'isabella.anderson@example.com', 'password10',1994,2013,"user"),
('Liam White', 'liam.white@example.com', 'password11',1995,2021,"user"),
('Ava Thompson', 'ava.thompson@example.com', 'password12',1996,2023,"user");


INSERT INTO Admins (userName, email, password) VALUES
('Oussema Karoui', 'oussema.karoui@example.com', 'passwordouss'),
('Hadda jaouabi', 'hadda.jaouabi@example.com', 'passwordhadda'),
('Khouloud Trabelsi', 'khouloud.trabelsioe@example.com', 'passwordkhou'),
('Nourhen Abdellaoui', 'nourhen.abdellaoui@example.com', 'passwordnour');

INSERT INTO Companies (name, address, phoneNumber, website,email,password,isApproved, licensesinceWhen, lei) VALUES
('Tunisia Renting','19 City street Lafayette',71564239,'tunisiarentig.com','tunisiarentig@gmail.com','TR2015',true,2007,1234),
('Ikri','dora street La Marsa',71000111,'ikri.com','ikri@gmail.com','ikri2012',true,2021,5678),
('Karya & Karya','Habib Street Charguia',71221356,'kx2.com','kx2@gmail.com','karya2018',true,2018,10111213),
('AutoTn','38 town street laouina',71457231,'autotn.com','autotn@gmail.com','autotn2015',true,2015,14151617),
('Karhba','5621 Manar buisness complex',71068021,'karhba.com','karhba@gmail.com','karhba2017',true,2017,18192021);


INSERT INTO Cars (Name, price, carType, mileage, year, shift, ac ,location, companyId, userId) VALUES
('Hyundai Grand i10',90,'Compact',50,2020,'Manual','Air Conditionner','Tunis',1,1),
('Kia Picanto',100,'Compact',50,2020,'Automatic','Air Conditionner','Tunis',1,1),
('Hyundai Grand i20',80,'Compact',50,2020,'Automatic','Air Conditionner','Ariana',2,2),
('Suzuki Dzire',99,'Berline',50,2020,'Manual','Air Conditionner','Tunis',1,2),
('Polo Sedan',110,'Compact',50,2020,'Manual','Air Conditionner','Nabeul',3,1),
('Dacia Duster',121,'SUV',51,2020,'Manual','Air Conditionner','Bizerte',4,5),
('Seat Leon',90,'Compact',50,2020,'Manual','Air Conditionner','Tunis',1,8),
('Suzuki Swift',85,'Compact',50,2020,'Manual','Air Conditionner','Ariana',2,12),
('Peugeot 208',100,'Compact',50,2020,'Manual','Air Conditionner','Sfax',5,6),
('Mahindra KUV',75,'SUV',50,2020,'Manual','Air Conditionner','Ariana',2,3),
('Chevrolet Sonic',95,'Compact',50,2020,'Manual','Air Conditionner','Tunis',1,4),
('KIA Sportage',130,'SUV',50,2020,'Manual','Air Conditionner','Nabeul',3,9);










