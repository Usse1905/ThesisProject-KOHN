
.
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

source 
INSERT INTO admins (userName, email, password) VALUES
('Oussema Karoui', 'oussema.karoui@example.com', 'passwordouss'),
('Hadda jaouabi', 'hadda.jaouabi@example.com', 'passwordhadda'),
('Khouloud Trabelsi', 'khouloud.trabelsioe@example.com', 'passwordkhou'),
('Nourhen Abdellaoui', 'nourhen.abdellaoui@example.com', 'passwordnour');


INSERT INTO cars (Name,image, price, carType, mileage, year, shift, ac , companyId, userId) VALUES
('Hyundai Grand i10','https://catalogue.automobile.tn/big/2023/12/46462.webp?t=1',90,'Compact',50,2020,'Manual','Air Conditionner',1,1),
('Kia Picanto','https://catalogue.automobile.tn/big/2024/08/47191.webp?t=1',100,'Compact',50,2020,'Automatic','Air Conditionner',1,1),
('Hyundai Grand i20',"https://imgd.aeplcdn.com/664x374/n/cw/ec/150603/i20-exterior-right-front-three-quarter-7.jpeg?isig=0&q=80",80,'Compact',50,2020,'Automatic','Air Conditionner',2,2),
('Suzuki Dzire',"https://www.suzuki.tn/wp-content/uploads/2023/05/dzire-exterieur-02.jpg",99,'Berline',50,2020,'Manual','Air Conditionner',1,2),
('Polo Sedan',"https://i.ytimg.com/vi/Xks7tJHDAE0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDELt2BRNQA8fZICahNGtWKMrjdwg",110,'Compact',50,2020,'Manual','Air Conditionner',3,1),
('Dacia Duster',"https://catalogue.automobile.tn/big/2023/01/46876.webp?t=1",121,'SUV',51,2020,'Manual','Air Conditionner',4,5),
('Seat Leon',"https://www.seat.be/content/dam/public/seat-website/myco/2425/carworlds/leon/overview/version-view/leon-style/seat-leon-5d-midnight-black-style-trim-colour-alloy-wheels.png",90,'Compact',50,2020,'Manual','Air Conditionner',1,8),
('Suzuki Swift',"https://pim.suzuki.be/image/trimLevel/1500/1000/contain/webp/new-swift-gl-1710859311169.png",85,'Compact',50,2020,'Manual','Air Conditionner',2,12),
('Peugeot 208',"https://www.peugeottunisie.com/content/dam/peugeot/master/b2c/our-range/showroom/208/2023-10-new-208/mobile/208_ACTIVEEV_M.jpg?imwidth=768",100,'Compact',50,2020,'Manual','Air Conditionner',5,6),
('Mahindra KUV',"https://www.sayarti.tn/wp-content/uploads/2018/07/voiture_mahindra_sousse-970x577.jpg",75,'SUV',50,2020,'Manual','Air Conditionner',2,3),
('Chevrolet Sonic',"https://file.kelleybluebookimages.com/kbb/base/house/2020/2020-Chevrolet-Sonic-FrontSide_CHSON2001_640x480.jpg?downsize=750:*",95,'Compact',50,2020,'Manual','Air Conditionner',1,4),
('KIA Sportage',"https://catalogue.automobile.tn/big/2023/09/46768.webp?t=1",130,'SUV',50,2020,'Manual','Air Conditionner',3,9);


INSERT INTO Users (userName, password, email, phoneNumber,dateOfBirth,dateOfLicense,role) VALUES 
('John Doe', 'password1','john.doe@example.com',54123698 ,1995,2017,"user"),
('Jane Smith', 'password2','jane.smith@example.com',94223687 ,1990,2009,"user"),
('Michael Brown', 'password3','michael.brown@example.com', 93214568,1991,2011,"user"),
('Emily Davis', 'password4','emily.davis@example.com',26457888 ,1993,2013,"user");



INSERT INTO Companies (name, address, phoneNumber, website,email,password,isApproved, licensesinceWhen, lei) VALUES
('Tunisia Renting','19 City street Lafayette',71564239,'tunisiarentig.com','tunisiarentig@gmail.com','TR2015',true,2007,1234),
('Ikri','dora street La Marsa',71000111,'ikri.com','ikri@gmail.com','ikri2012',true,2021,5678),
('Karya & Karya','Habib Street Charguia',71221356,'kx2.com','kx2@gmail.com','karya2018',true,2018,10111213),
('AutoTn','38 town street laouina',71457231,'autotn.com','autotn@gmail.com','autotn2015',true,2015,14151617),
('Karhba','5621 Manar buisness complex',71068021,'karhba.com','karhba@gmail.com','karhba2017',true,2017,18192021);


INSERT INTO Cars (userId, companyId, Name,image, price, carType, mileage, year, shift, ac , companyId, ) VALUES
(1,1,'Hyundai Grand i10','https://catalogue.automobile.tn/big/2023/12/46462.webp?t=1',90,'Compact',50,2020,'Manual','Air Conditionner'),
(1,1,'Kia Picanto','https://catalogue.automobile.tn/big/2024/08/47191.webp?t=1',100,'Compact',50,2018,'Automatic','Air Conditionner'),
(2,2,'Hyundai Grand i20',"https://imgd.aeplcdn.com/664x374/n/cw/ec/150603/i20-exterior-right-front-three-quarter-7.jpeg?isig=0&q=80",80,'Compact',50,2022,'Automatic','Air Conditionner'),
(1,2,'Suzuki Dzire',"https://www.suzuki.tn/wp-content/uploads/2023/05/dzire-exterieur-02.jpg",99,'Berline',50,2017,'Manual','Air Conditionner'),
(1,3,'Polo Sedan',"https://i.ytimg.com/vi/Xks7tJHDAE0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDELt2BRNQA8fZICahNGtWKMrjdwg",110,'Compact',50,2019,'Manual','Air Conditionner'),
(2,4,'Dacia Duster',"https://catalogue.automobile.tn/big/2023/01/46876.webp?t=1",121,'SUV',51,2021,'Manual','Air Conditionner'),
(3,1,'Seat Leon',"https://www.seat.be/content/dam/public/seat-website/myco/2425/carworlds/leon/overview/version-view/leon-style/seat-leon-5d-midnight-black-style-trim-colour-alloy-wheels.png",90,'Compact',50,2020,'Manual','Air Conditionner'),
(2,2,'Suzuki Swift',"https://pim.suzuki.be/image/trimLevel/1500/1000/contain/webp/new-swift-gl-1710859311169.png",85,'Compact',50,2020,'Manual','Air Conditionner'),
(1,5,'Peugeot 208',"https://www.peugeottunisie.com/content/dam/peugeot/master/b2c/our-range/showroom/208/2023-10-new-208/mobile/208_ACTIVEEV_M.jpg?imwidth=768",100,'Compact',50,2015,'Manual','Air Conditionner'),
(3,2,'Mahindra KUV',"https://www.sayarti.tn/wp-content/uploads/2018/07/voiture_mahindra_sousse-970x577.jpg",75,'SUV',50,2016,'Manual','Air Conditionner'),
(3,1,'Chevrolet Sonic',"https://file.kelleybluebookimages.com/kbb/base/house/2020/2020-Chevrolet-Sonic-FrontSide_CHSON2001_640x480.jpg?downsize=750:*",95,'Compact',50,2020,'Manual','Air Conditionner'),
(1,3,'KIA Sportage',"https://catalogue.automobile.tn/big/2023/09/46768.webp?t=1",130,'SUV',50,2024,'Manual','Air Conditionner');














