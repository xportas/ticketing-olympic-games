<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
class User implements UserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    #[ORM\ManyToMany(targetEntity: Slot::class, inversedBy: 'users')]
    private Collection $Slots;

    #[ORM\ManyToMany(targetEntity: Ticket::class, inversedBy: 'users')]
    private Collection $Tickets;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $picture = null;

    #[ORM\Column(length: 255)]
    private ?string $tokenAuth = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    public function __construct()
    {
        $this->Slots = new ArrayCollection();
        $this->Tickets = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection<int, Slot>
     */
    public function getSlots(): Collection
    {
        return $this->Slots;
    }

    public function addSlot(Slot $slot): static
    {
        if (!$this->Slots->contains($slot)) {
            $this->Slots->add($slot);
        }

        return $this;
    }

    public function removeSlot(Slot $slot): static
    {
        $this->Slots->removeElement($slot);

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
        }

        return $this;
    }

    public function removeTicket(Ticket $ticket): static
    {
        $this->Tickets->removeElement($ticket);

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): static
    {
        $this->picture = $picture;

        return $this;
    }

    public function getTokenAuth(): ?string
    {
        return $this->tokenAuth;
    }

    public function setTokenAuth(string $tokenAuth): static
    {
        $this->tokenAuth = $tokenAuth;

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
}
