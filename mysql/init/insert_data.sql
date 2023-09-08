INSERT INTO `User` (`userName`, `avatarUrl`, `email`, `password`) 
VALUES
('Nick', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/10.jpg', 'user1@example.com', '$2a$10$0PbKY.zIWpNzKVQE2LHUp.00h8fMDY5uE1nHfbSF50lRmGcDVB6eq'), -- password: password1
('Kevin', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1000.jpg', 'user2@example.com', '$2a$10$K.OWb./ZeWCEhfBozI6cSOv0/TuUCEUW6Lh06uXMS.dqd59pKH4iO'), -- password: password2
('Curry', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1006.jpg', 'user3@example.com', '$2a$10$OBWPafO7crSMFkBpiQKk7O2sertGqPtCSW8YdoiZVF3jgPfjvUFfq'); -- password: password3

INSERT INTO `Food` (userId, foodName, foodImageUrl, expirationDate, quantity, description)
VALUES
(1, 'Apple', "https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg", '2023-09-30', '5 pieces', 'Fresh and delicious apple'),
(1, 'Banana', "https://www.photolibrary.jp/mhd5/img245/450-20120326195422140257.jpg", '2023-09-28', '1 pieces', 'Ripe and sweet banana'),
(1, 'Carrot', "https://www.alimentarium.org/sites/default/files/media/image/2016-10/AL012-02%20carotte_0.jpg", '2023-09-25', '1 pieces', 'Organic carrot for sale'),
(2, 'Tomato', "https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg", '2023-09-17', '2 pieces', 'Juicy red tomatoes'),
(2, 'Grapes', "https://t3.ftcdn.net/jpg/00/71/10/72/360_F_71107237_3GNipwDTQnsDZN3cMvXr3o9SPdxt4sXx.jpg", '2023-09-18', '1 pieces', 'Sweet seedless grapes'),
(2, 'Eggplant', "https://commongroundpg.com/wp-content/uploads/2022/03/eggplant.jpg", '2023-09-12', '3 pieces', 'Delicious eggplants'),
(2, 'Cucumber', "https://t4.ftcdn.net/jpg/00/54/04/69/360_F_54046932_P1U2PyvYLiNPV8PgglRfT1Nr8wNspZP5.jpg", '2023-09-29', '2 pieces', 'Crunchy cucumbers'),
(3, 'Peach', "https://sakura.co/wp-content/uploads/2022/03/shutterstock_675217411-1.png", '2023-09-24', '3 pieces', 'Sweet and juicy peaches'),
(3, 'Pear', "https://www.daisen-meguminosato.net/data/daisen-megumi/product/daisen_fruits/nashi/nashi_img3.jpg", '2023-09-26', '1 pieces', 'Citrusy and fresh pear'),
(3, 'Lettuce', "https://t3.ftcdn.net/jpg/01/03/98/10/360_F_103981036_YaWjjvRbT6fTUPhNjKn7XnBKyE7AAwNZ.jpg", '2023-09-23', '1 pieces', 'Fresh');

INSERT INTO `Deal` (`requesterId`, `foodId`, `isComplete`)
VALUES
(2, 1, TRUE),
(2, 10, FALSE),
(3, 2, TRUE),
(1, 3, TRUE),
(1, 4, FALSE),
(3, 5, TRUE),
(3, 6, TRUE),
(1, 6, FALSE),
(1, 8, TRUE),
(2, 9, TRUE);

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
(1, 3);
