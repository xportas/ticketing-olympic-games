<?php
namespace App\MessageHandler;
ini_set('memory_limit', '1024M'); // Increases the memory limit to 1024 MB
use App\Entity\Sit;
use App\Entity\Slot;
use App\Entity\Sport;
use App\Entity\Ticket;
use App\Entity\User;
use App\Message\LogSlots;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
final class LogSlotsHandler
{
    private EntityManagerInterface $entityManager;
    private LoggerInterface $logger;

    public function __construct(EntityManagerInterface $entityManager, LoggerInterface $logger)
    {
        $this->entityManager = $entityManager;
        $this->logger = $logger;
    }

    public function __invoke(LogSlots $message)
{
    try {
        $userRepository = $this->entityManager->getRepository(User::class);
        $users = $userRepository->findAll();

        $slotRepository = $this->entityManager->getRepository(SLot::class);
        $slots = $slotRepository->findAll();

        $this->logger->warning("[" . $message->taskName . "] Task executed successfully! Count-> " . count($slots));

        $useFirstFourSlots = $message->taskName === "First-Slots-Setter-Command";
        $selectedSlots = $useFirstFourSlots ? array_slice($slots, 0, 4) : array_slice($slots, 4, 4);

        if (!$useFirstFourSlots) {
            $this->clearSlotUserAssignments($users);
            $nonFilledSports = $this->findNonFilledSports(array_slice($slots, 0, 4));
            $this->distributeSportsToSlots($selectedSlots, $nonFilledSports);
        }

        $this->assignSlotsPerUser($users, $selectedSlots);

        $this->entityManager->flush();

        $this->logger->warning("[" . $message->taskName . "] Task executed successfully! Data-> " . json_encode($selectedSlots));
    } catch (\Exception $e) {
        $this->logger->error("[" . $message->taskName . "] Task failed: " . $e->getMessage());
    }
}

    private function clearSlotUserAssignments(array $users)
    {
        foreach ($users as $user) {
            $user->getSlots()->clear();
            $this->entityManager->persist($user);
        }
    }

    private function assignSlotsPerUser(array $users, array $slots)
    {
        $slotsCount = count($slots);
        foreach ($users as $index => $user) {
            $slotIndex = $index % $slotsCount;
            
            $user->addSlot($slots[$slotIndex]);
            
            $this->entityManager->persist($slots[$slotIndex]);
        }
    }

    private function findNonFilledSports(array $slots)
    {
        $nonFilledSports = [];
        $queryData = [];
    
        // Prepare data for query
        foreach ($slots as $slot) {
            foreach ($slot->getSports() as $sport) {
                foreach ($sport->getStadium()->getZone() as $zone) {
                    $queryData[$sport->getId()]['zones'][] = $zone->getId();
                }
            }
        }
    
        // Execute queries to fetch all necessary data
        foreach ($queryData as $sportId => $data) {
            // Query to count available seats
            $availableSeatsQuery = $this->entityManager->createQuery('
                SELECT z.id, COUNT(s.id) as availableSeats
                FROM App\Entity\Sit s
                LEFT JOIN s.zone z
                WHERE z.id IN (:zones) AND s NOT IN (
                    SELECT IDENTITY(t.sit) FROM App\Entity\Ticket t WHERE t.sport = :sport
                )
            ')->setParameters([
                'zones' => $data['zones'],
                'sport' => $sportId
            ]);
    
            $availableSeatsResults = $availableSeatsQuery->getResult();
            $totalAvailableSeats = array_sum(array_column($availableSeatsResults, 'availableSeats'));
    
            // Query to count total seats in all zones
            $totalSeatsQuery = $this->entityManager->createQuery('
                SELECT COUNT(s.id) as totalSeats
                FROM App\Entity\Sit s
                JOIN s.zone z
                WHERE z.id IN (:zones)
            ')->setParameter('zones', $data['zones']);
    
            $totalSeats = $totalSeatsQuery->getSingleScalarResult();
    
            // Add to non-filled sports if conditions are met
            if ($totalAvailableSeats <= $totalSeats) {
                $nonFilledSports[] = $sportId;
            }
        }
    
        return $nonFilledSports;
    }
    

    


    private function distributeSportsToSlots(array $selectedSlots, array $nonFilledSports)
{
    $sportRepository = $this->entityManager->getRepository(Sport::class);
    $totalSlots = count($selectedSlots);
    $totalSports = count($nonFilledSports);
    if ($totalSlots == 0 || $totalSports == 0) {
        return;
    }

    $sportIndex = 0;

    while ($sportIndex < $totalSports) {
        foreach ($selectedSlots as $slot) {
            if ($sportIndex >= $totalSports) {
                break;
            }
            echo "Adding sport ID {$nonFilledSports[$sportIndex]} to slot ID {$slot->getId()}\n";

            $slot->addSport($sportRepository->find($nonFilledSports[$sportIndex++]));

            $this->entityManager->persist($slot);
        }
    }

    $this->entityManager->flush();
}

}