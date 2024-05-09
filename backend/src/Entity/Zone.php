<?php

namespace App\Entity;

use App\Repository\ZoneRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ZoneRepository::class)]
class Zone
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'zones')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Stadium $stadium = null;

    #[ORM\OneToMany(targetEntity: Sit::class, mappedBy: 'zone', orphanRemoval: true)]
    private Collection $sits;

    #[ORM\Column]
    private ?float $price_multiplier = null;

    public function __construct()
    {
        $this->sits = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;
        return $this;
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;
        return $this;
    }

    public function getStadium(): ?Stadium
    {
        return $this->stadium;
    }

    public function setStadium(?Stadium $stadium): static
    {
        $this->stadium = $stadium;
        return $this;
    }

    /**
     * @return Collection<int, Sit>
     */
    public function getSits(): Collection
    {
        return $this->sits;
    }

    public function addSit(Sit $sit): static
    {
        if (!$this->sits->contains($sit)) {
            $this->sits->add($sit);
            $sit->setZone($this);
        }

        return $this;
    }

    public function removeSit(Sit $sit): static
    {
        if ($this->sits->removeElement($sit)) {
            if ($sit->getZone() === $this) {
                $sit->setZone(null);
            }
        }

        return $this;
    }

    public function getPriceMultiplier(): ?float
    {
        return $this->price_multiplier;
    }

    public function setPriceMultiplier(float $price_multiplier): static
    {
        $this->price_multiplier = $price_multiplier;

        return $this;
    }
}
