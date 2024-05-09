<?php

namespace App\Entity;

use App\Repository\StadiumRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StadiumRepository::class)]
class Stadium
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $location = null;

    #[ORM\OneToMany(targetEntity: Sport::class, mappedBy: 'stadium')]
    private Collection $sport_id;

    #[ORM\OneToMany(targetEntity: Zone::class, mappedBy: 'stadium', orphanRemoval: true)]
    private Collection $zone;

    public function __construct()
    {
        $this->sport_id = new ArrayCollection();
        $this->zone = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): static
    {
        $this->location = $location;

        return $this;
    }

    /**
     * @return Collection<int, Sport>
     */
    public function getSportId(): Collection
    {
        return $this->sport_id;
    }

    public function addSportId(Sport $sportId): static
    {
        if (!$this->sport_id->contains($sportId)) {
            $this->sport_id->add($sportId);
            $sportId->setStadium($this);
        }

        return $this;
    }

    public function removeSportId(Sport $sportId): static
    {
        if ($this->sport_id->removeElement($sportId)) {
            // set the owning side to null (unless already changed)
            if ($sportId->getStadium() === $this) {
                $sportId->setStadium(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Zone>
     */
    public function getZone(): Collection
    {
        return $this->zone;
    }

    public function addZone(zone $zone): static
    {
        if (!$this->zone->contains($zone)) {
            $this->zone->add($zone);
            $zone->setStadium($this);
        }

        return $this;
    }

    public function removeZone(zone $zone): static
    {
        if ($this->zone->removeElement($zone)) {
            // set the owning side to null (unless already changed)
            if ($zone->getStadium() === $this) {
                $zone->setStadium(null);
            }
        }

        return $this;
    }
}
