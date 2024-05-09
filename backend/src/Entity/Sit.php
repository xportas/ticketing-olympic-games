<?php

namespace App\Entity;

use App\Repository\SitRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SitRepository::class)]
class Sit
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $line = null;

    #[ORM\Column]
    private ?int $seat = null;

    #[ORM\OneToMany(targetEntity: Ticket::class, mappedBy: 'sit', orphanRemoval: true)]
    private Collection $Tickets;

    #[ORM\ManyToOne(inversedBy: 'Sit')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Zone $zone = null;

    public function __construct()
    {
        $this->Tickets = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLine(): ?int
    {
        return $this->line;
    }

    public function setLine(int $line): static
    {
        $this->line = $line;

        return $this;
    }

    public function getSeat(): ?int
    {
        return $this->seat;
    }

    public function setSeat(int $seat): static
    {
        $this->seat = $seat;

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
            $ticket->setSit($this);
        }

        return $this;
    }

    public function removeTicket(Ticket $ticket): static
    {
        if ($this->Tickets->removeElement($ticket)) {
            // set the owning side to null (unless already changed)
            if ($ticket->getSit() === $this) {
                $ticket->setSit(null);
            }
        }

        return $this;
    }

    public function getZone(): ?Zone
    {
        return $this->zone;
    }

    public function setZone(?Zone $zone): static
    {
        $this->zone = $zone;

        return $this;
    }
}
