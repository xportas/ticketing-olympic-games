INSERT INTO `slot` (`id`, `date_start`, `date_end`) VALUES (NULL, '2024-03-25', '2024-03-31');
INSERT INTO `slot` (`id`, `date_start`, `date_end`) VALUES (NULL, '2024-04-1', '2024-03-7');
INSERT INTO `slot` (`id`, `date_start`, `date_end`) VALUES (NULL, '2024-04-8', '2024-04-14');
INSERT INTO `slot` (`id`, `date_start`, `date_end`) VALUES (NULL, '2024-04-15', '2024-04-21');
INSERT INTO `slot` (`id`, `date_start`, `date_end`) VALUES (NULL, '2024-04-22', '2024-04-28');
INSERT INTO `slot` (`id`, `date_start`, `date_end`) VALUES (NULL, '2024-04-29', '2024-05-5');
INSERT INTO `slot` (`id`, `date_start`, `date_end`) VALUES (NULL, '2024-05-6', '2024-05-12');
INSERT INTO `slot` (`id`, `date_start`, `date_end`) VALUES (NULL, '2024-05-13', '2024-05-19');

INSERT INTO `stadium` (`id`, `name`, `location`) VALUES
(NULL, 'Estadio Olímpico', 'Barcelona'),
(NULL, 'Palacio de Deportes', 'Madrid'),
(NULL, 'Centro Acuático', 'Valencia'),
(NULL, 'Arena Deportiva', 'Sevilla');


INSERT INTO `sport` (`name`, `description`, `stadium_id`, `price`, `date`) VALUES
('Fútbol', 'Fútbol profesional', 1, 100.00, '2023-06-01'),
('Baloncesto', 'Baloncesto de competición', 1, 80.00, '2023-06-02'),
('Atletismo', 'Eventos de atletismo y carreras', 1, 50.00, '2023-06-03'),
('Rugby', 'Rugby nacional e internacional', 1, 90.00, '2023-06-04'),
('Fútbol Americano', 'Liga de fútbol americano', 2, 95.00, '2023-06-05'),
('Hockey sobre hierba', 'Hockey local e internacional', 2, 70.00, '2023-06-06'),
('Críquet', 'Críquet competitivo', 2, 60.00, '2023-06-07'),
('Balonmano', 'Balonmano a nivel club', 2, 50.00, '2023-06-08'),
('Tenis', 'Torneos de tenis', 3, 110.00, '2023-06-09'),
('Pádel', 'Competiciones de pádel', 3, 75.00, '2023-06-10'),
('Squash', 'Squash en pista cerrada', 3, 65.00, '2023-06-11'),
('Badminton', 'Badminton para todos los niveles', 3, 55.00, '2023-06-12'),
('Natación', 'Competiciones de natación', 4, 100.00, '2023-06-13'),
('Waterpolo', 'Ligas de waterpolo', 4, 85.00, '2023-06-14'),
('Polo Acuático', 'Encuentros de polo acuático', 4, 90.00, '2023-06-15'),
('Nado Sincronizado', 'Exhibiciones de nado sincronizado', 4, 95.00, '2023-06-16');



INSERT INTO `sport_slot` (`slot_id`, `sport_id`) VALUES ('1', '1');
INSERT INTO `sport_slot` (`slot_id`, `sport_id`) VALUES ('1', '2');
INSERT INTO `sport_slot` (`slot_id`, `sport_id`) VALUES ('2', '3');
INSERT INTO `sport_slot` (`slot_id`, `sport_id`) VALUES ('2', '4');
INSERT INTO `sport_slot` (`slot_id`, `sport_id`) VALUES ('3', '5');
INSERT INTO `sport_slot` (`slot_id`, `sport_id`) VALUES ('3', '6');
INSERT INTO `sport_slot` (`slot_id`, `sport_id`) VALUES ('4', '7');
INSERT INTO `sport_slot` (`slot_id`, `sport_id`) VALUES ('4', '8');
INSERT INTO `sport_slot` (`slot_id`, `sport_id`) VALUES ('5', '9');
INSERT INTO `sport_slot` (`slot_id`, `sport_id`) VALUES ('5', '10');
INSERT INTO `sport_slot` (`slot_id`, `sport_id`) VALUES ('6', '11');
INSERT INTO `sport_slot` (`slot_id`, `sport_id`) VALUES ('6', '12');
INSERT INTO `sport_slot` (`slot_id`, `sport_id`) VALUES ('7', '13');
INSERT INTO `sport_slot` (`slot_id`, `sport_id`) VALUES ('7', '14');
INSERT INTO `sport_slot` (`slot_id`, `sport_id`) VALUES ('8', '15');
INSERT INTO `sport_slot` (`slot_id`, `sport_id`) VALUES ('8', '16');

INSERT INTO `user` (`id`, `email`, `roles`, `picture`, `token_auth`, `name`) VALUES
(1, 'sproplayerxd10@gmail.com', '[]', 'https://s.gravatar.com/avatar/01079f292670d12295ce747b26caaf92?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsp.png', '660563ad6ea7bff45012d239', 'sproplayerxd10'),
(2, 'test1@gmail.com', '[]',  'https://s.gravatar.com/avatar/245cf079454dc9a3374a7c076de247cc?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png', '661a695b51fdb626f4a68a0f', 'test1'),
(3, 'test2@gmail.com', '[]',  'https://s.gravatar.com/avatar/3c4f419e8cd958690d0d14b3b89380d3?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png', '661a6960dba2425e8d033730', 'test2'),
(4, 'test3@gmail.com', '[]',  'https://s.gravatar.com/avatar/19f84906f4412abf6066aaa92fe9d6c1?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png', '661a6963566dda08b038b313', 'test3'),
(5, 'test4@gmail.com', '[]',  'https://s.gravatar.com/avatar/58090ea9184cf410bac8ee57bc5f985f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png', '661a6966566dda08b038b319', 'test4'),
(6, 'test5@gmail.com', '[]',  'https://s.gravatar.com/avatar/065ce1ac58658682423ce60cd1c5d93b?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png', '661a6969dba2425e8d033742', 'test5'),
(7, 'test6@gmail.com', '[]',  'https://s.gravatar.com/avatar/f6d8b3f3ddca53201e716d8992cf15fd?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png', '661a696d80dc198be4ade11d', 'test6'),
(8, 'test7@gmail.com', '[]',  'https://s.gravatar.com/avatar/b754fb5e760dec3d9215cda3b2271da7?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png', '661a697151fdb626f4a68a2e', 'test7'),
(9, 'test8@gmail.com', '[]',  'https://s.gravatar.com/avatar/129adcf96ff3e4667ea64a693e44a377?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png', '661a6974dba2425e8d033755', 'test8');

INSERT INTO `zone` (`stadium_id`, `name`, `description`, `price_multiplier`) VALUES
(1, 'Norte', 'Zona norte del estadio', 1.0),
(1, 'Sur', 'Zona sur del estadio', 1.0),
(1, 'Este', 'Zona este del estadio', 1.0),
(2, 'Principal', 'Cancha principal para baloncesto', 1.5),
(2, 'Secundaria', 'Cancha secundaria para eventos menores', 1.2),
(2, 'VIP', 'Zona VIP con mejores vistas', 2.0),
(3, 'Central', 'Pista central para tenis y otros deportes de raqueta', 1.5),
(3, 'Auxiliar', 'Pistas auxiliares para entrenamientos y eventos menores', 1.1),
(3, 'Especial', 'Zona especial para eventos VIP y prensa', 2.5),
(4, 'Piscina Olímpica', 'Piscina para competiciones olímpicas', 1.8),
(4, 'Piscina de Calentamiento', 'Piscina usada para el calentamiento antes de las competiciones', 1.2),
(4, 'Tribuna', 'Tribunas alrededor de las piscinas para espectadores', 1.3);



DELIMITER $$

CREATE PROCEDURE PopulateSeats()
BEGIN
    DECLARE finished INTEGER DEFAULT 0;
    DECLARE zone_id INT;
    DECLARE num_seats INT DEFAULT 10000;
    DECLARE seat_batch TEXT;
    DECLARE cur1 CURSOR FOR SELECT id FROM zone;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

    OPEN cur1;

    read_loop: LOOP
        FETCH cur1 INTO zone_id;
        IF finished = 1 THEN 
            LEAVE read_loop;
        END IF;

        SET seat_batch = '';

        SET @i = 1;
        WHILE @i <= num_seats DO
            SET seat_batch = CONCAT(
                seat_batch, 
                (IF(LENGTH(seat_batch)=0, '', ',')), 
                '(', 
                zone_id, 
                ',', 
                CEIL(@i / 50), 
                ',', 
                IF(@i % 50 = 0, 50, @i % 50), 
                ')'
            );
            IF @i % 1000 = 0 OR @i = num_seats THEN
                SET @sql = CONCAT('INSERT INTO sit (zone_id, line, seat) VALUES ', seat_batch);
                PREPARE stmt FROM @sql;
                EXECUTE stmt;
                DEALLOCATE PREPARE stmt;
                SET seat_batch = '';
            END IF;
            SET @i = @i + 1;
        END WHILE;
    END LOOP;

    CLOSE cur1;
END$$

DELIMITER ;


CALL PopulateSeats();

INSERT INTO `extra` (`id`, `first_period_end_date`) VALUES (NULL, '2024-03-31');