<?php

namespace App\Entity;

use App\Repository\ExtraRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExtraRepository::class)]
class Extra
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $firstPeriodEndDate = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstPeriodEndDate(): ?\DateTimeInterface
    {
        return $this->firstPeriodEndDate;
    }

    public function setFirstPeriodEndDate(\DateTimeInterface $firstPeriodEndDate): static
    {
        $this->firstPeriodEndDate = $firstPeriodEndDate;

        return $this;
    }
}
