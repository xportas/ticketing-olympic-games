<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240427110034 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE extra (id INT AUTO_INCREMENT NOT NULL, first_period_end_date DATE NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sit (id INT AUTO_INCREMENT NOT NULL, zone_id INT NOT NULL, line INT NOT NULL, seat INT NOT NULL, INDEX IDX_4AA16AD09F2C3FAB (zone_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE slot (id INT AUTO_INCREMENT NOT NULL, date_start DATE NOT NULL, date_end DATE NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sport (id INT AUTO_INCREMENT NOT NULL, stadium_id INT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, price NUMERIC(2, 0) NOT NULL, date DATE NOT NULL, INDEX IDX_1A85EFD27E860E36 (stadium_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sport_slot (sport_id INT NOT NULL, slot_id INT NOT NULL, INDEX IDX_DBD10E9BAC78BCF8 (sport_id), INDEX IDX_DBD10E9B59E5119C (slot_id), PRIMARY KEY(sport_id, slot_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stadium (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, location VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE ticket (id INT AUTO_INCREMENT NOT NULL, sit_id INT NOT NULL, sport_id INT NOT NULL, type VARCHAR(255) NOT NULL, price DOUBLE PRECISION NOT NULL, date DATE NOT NULL, transaction VARCHAR(255) DEFAULT NULL, INDEX IDX_97A0ADA3D50BE019 (sit_id), INDEX IDX_97A0ADA3AC78BCF8 (sport_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL COMMENT \'(DC2Type:json)\', picture VARCHAR(255) DEFAULT NULL, token_auth VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_slot (user_id INT NOT NULL, slot_id INT NOT NULL, INDEX IDX_D68F6CAEA76ED395 (user_id), INDEX IDX_D68F6CAE59E5119C (slot_id), PRIMARY KEY(user_id, slot_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_ticket (user_id INT NOT NULL, ticket_id INT NOT NULL, INDEX IDX_F2F2B69EA76ED395 (user_id), INDEX IDX_F2F2B69E700047D2 (ticket_id), PRIMARY KEY(user_id, ticket_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE zone (id INT AUTO_INCREMENT NOT NULL, stadium_id INT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, price_multiplier DOUBLE PRECISION NOT NULL, INDEX IDX_A0EBC0077E860E36 (stadium_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE sit ADD CONSTRAINT FK_4AA16AD09F2C3FAB FOREIGN KEY (zone_id) REFERENCES zone (id)');
        $this->addSql('ALTER TABLE sport ADD CONSTRAINT FK_1A85EFD27E860E36 FOREIGN KEY (stadium_id) REFERENCES stadium (id)');
        $this->addSql('ALTER TABLE sport_slot ADD CONSTRAINT FK_DBD10E9BAC78BCF8 FOREIGN KEY (sport_id) REFERENCES sport (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE sport_slot ADD CONSTRAINT FK_DBD10E9B59E5119C FOREIGN KEY (slot_id) REFERENCES slot (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE ticket ADD CONSTRAINT FK_97A0ADA3D50BE019 FOREIGN KEY (sit_id) REFERENCES sit (id)');
        $this->addSql('ALTER TABLE ticket ADD CONSTRAINT FK_97A0ADA3AC78BCF8 FOREIGN KEY (sport_id) REFERENCES sport (id)');
        $this->addSql('ALTER TABLE user_slot ADD CONSTRAINT FK_D68F6CAEA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_slot ADD CONSTRAINT FK_D68F6CAE59E5119C FOREIGN KEY (slot_id) REFERENCES slot (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_ticket ADD CONSTRAINT FK_F2F2B69EA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_ticket ADD CONSTRAINT FK_F2F2B69E700047D2 FOREIGN KEY (ticket_id) REFERENCES ticket (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE zone ADD CONSTRAINT FK_A0EBC0077E860E36 FOREIGN KEY (stadium_id) REFERENCES stadium (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sit DROP FOREIGN KEY FK_4AA16AD09F2C3FAB');
        $this->addSql('ALTER TABLE sport DROP FOREIGN KEY FK_1A85EFD27E860E36');
        $this->addSql('ALTER TABLE sport_slot DROP FOREIGN KEY FK_DBD10E9BAC78BCF8');
        $this->addSql('ALTER TABLE sport_slot DROP FOREIGN KEY FK_DBD10E9B59E5119C');
        $this->addSql('ALTER TABLE ticket DROP FOREIGN KEY FK_97A0ADA3D50BE019');
        $this->addSql('ALTER TABLE ticket DROP FOREIGN KEY FK_97A0ADA3AC78BCF8');
        $this->addSql('ALTER TABLE user_slot DROP FOREIGN KEY FK_D68F6CAEA76ED395');
        $this->addSql('ALTER TABLE user_slot DROP FOREIGN KEY FK_D68F6CAE59E5119C');
        $this->addSql('ALTER TABLE user_ticket DROP FOREIGN KEY FK_F2F2B69EA76ED395');
        $this->addSql('ALTER TABLE user_ticket DROP FOREIGN KEY FK_F2F2B69E700047D2');
        $this->addSql('ALTER TABLE zone DROP FOREIGN KEY FK_A0EBC0077E860E36');
        $this->addSql('DROP TABLE extra');
        $this->addSql('DROP TABLE sit');
        $this->addSql('DROP TABLE slot');
        $this->addSql('DROP TABLE sport');
        $this->addSql('DROP TABLE sport_slot');
        $this->addSql('DROP TABLE stadium');
        $this->addSql('DROP TABLE ticket');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_slot');
        $this->addSql('DROP TABLE user_ticket');
        $this->addSql('DROP TABLE zone');
    }
}
