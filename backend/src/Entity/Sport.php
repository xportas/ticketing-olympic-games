<?php

namespace App\Entity;

use App\Repository\SportRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SportRepository::class)]
class Sport
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\OneToMany(targetEntity: Ticket::class, mappedBy: 'sport', orphanRemoval: true)]
    private Collection $Tickets;

    #[ORM\ManyToOne(inversedBy: 'sport_id')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Stadium $stadium = null;

    #[ORM\ManyToMany(targetEntity: Slot::class, inversedBy: 'sports')]
    private Collection $slot_id;

    #[ORM\Column(type: Types::DECIMAL, precision: 2, scale: 0)]
    private ?string $price = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    public function __construct()
    {
        $this->Tickets = new ArrayCollection();
        $this->slot_id = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Event>
     */
    public function getTickets(): Collection
    {
        return $this->Tickets;
    }

    public function addTicket(Ticket $ticket): static
    {
        if (!$this->Tickets->contains($ticket)) {
            $this->Tickets->add($ticket);
            $ticket->setSport($this);
        }

        return $this;
    }

    public function removeTicket(Ticket $ticket): static
    {
        if ($this->Tickets->removeElement($ticket)) {
            // set the owning side to null (unless already changed)
            if ($ticket->getSport() === $this) {
                $ticket->setSport(null);
            }
        }

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
     * @return Collection<int, Slot>
     */
    public function getSlotId(): Collection
    {
        return $this->slot_id;
    }

    public function addSlotId(Slot $slotId): static
    {
        if (!$this->slot_id->contains($slotId)) {
            $this->slot_id->add($slotId);
        }

        return $this;
    }

    public function removeSlotId(Slot $slotId): static
    {
        $this->slot_id->removeElement($slotId);

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }
}
