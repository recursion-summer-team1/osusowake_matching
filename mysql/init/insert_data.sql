INSERT INTO `User` (`userName`, `email`, `password`) 
VALUES
('ユーザー1', 'user1@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー2', 'user2@example.com', '$2a$10$K.OWb./ZeWCEhfBozI6cSOv0/TuUCEUW6Lh06uXMS.dqd59pKH4iO'), -- password: password2
('ユーザー3', 'user3@example.com', '$2a$10$OBWPafO7crSMFkBpiQKk7O2sertGqPtCSW8YdoiZVF3jgPfjvUFfq'), -- password: password3
('ユーザー4', 'user4@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー5', 'user5@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー6', 'user6@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー7', 'user7@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー8', 'user8@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー9', 'user9@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー10', 'user10@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー11', 'user11@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー12', 'user12@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー13', 'user13@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー14', 'user14@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー15', 'user15@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー16', 'user16@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー17', 'user17@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー18', 'user18@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー19', 'user19@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー20', 'user20@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー21', 'user21@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー22', 'user22@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('ユーザー23', 'user23@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'); -- password: password1


INSERT INTO `Food` (userId, foodName, foodImageUrl, expirationDate, quantity, description)
VALUES
(1, 'Apple', "https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg", '2023-09-30', '5 pieces', 'Fresh and delicious apple'),
(1, 'Banana', "https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg", '2023-09-28', '3 pieces', 'Ripe and sweet banana'),
(2, 'Carrot', "https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg", '2023-09-25', '2 pieces', 'Organic carrot for sale');

INSERT INTO `Deal` (`requesterId`, `foodId`, `isComplete`) 
VALUES
(1, 1, TRUE),
(2, 1, FALSE),
(2, 2, TRUE);

INSERT INTO `Chat` (`dealId`, `senderId`, `content`) VALUES
(1, 1, 'ユーザー1からのメッセージ1'),
(1, 2, 'ユーザー2からのメッセージ1'),
(2, 1, 'ユーザー1からのメッセージ2');

INSERT INTO `FriendShip` (`followeeId`, `followerId`)
VALUES
(1, 2),
(2, 3),
(3, 1),
(2, 1),
(1, 3),
(1, 10),
(10, 1),
(1, 11),
(11, 1),
(1, 12),
(12, 1),
(1, 13),
(13, 1),
(1, 14),
(14, 1),
(1, 15),
(15, 1),
(1, 16),
(16, 1),
(1, 17),
(17, 1),
(1, 18),
(18, 1),
(1, 19),
(19, 1),
(1, 20),
(20, 1);
