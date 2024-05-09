<?php

namespace App\Controller;

use App\Entity\Sit;
use App\Entity\Slot;
use App\Entity\Sport;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Ticket;
use App\Entity\User;
use App\Entity\Zone;
use PhpParser\JsonDecoder;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Repository\UserRepository;
use Doctrine\DBAL\Query;
use Doctrine\ORM\Query as ORMQuery;
use Symfony\Component\Messenger\Transport\Serialization\SerializerInterface as SerializationSerializerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Firebase\JWT\JWT;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use \Firebase\JWT\Key;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;


class TicketController extends AbstractController
{
  #[Route('/user/{userId}/tickets', methods: ['GET'])]
    public function getTicketByUserId(int $userId, EntityManagerInterface $manager, Request $request): JsonResponse
    {
        try {
            $user = $manager->getRepository(User::class)->find($userId);

            if (!$user) {
                return new JsonResponse([
                    'code' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'Ticket not found'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }
            
            $ticketsCollection = $user->getTickets();
            $tickets = $ticketsCollection->map(function($ticket) {
            return [
                'id' => $ticket->getId(),
                'type' => $ticket->getType(),
                'price' => $ticket->getPrice(),
                'date' => $ticket->getDate()->format('c'),
                'sit' => [
                  'id' => $ticket->getSit()->getId(),
                  'line' => $ticket->getSit()->getLine(),
                  'seat' => $ticket->getSit()->getSeat(),
                  'zone' => $ticket->getSit()->getZone()->getName(),
              ],
              'sport' => [
                  'id' => $ticket->getSport()->getId(),
                  'name' => $ticket->getSport()->getName(),
                  'description' => $ticket->getSport()->getDescription(),
                  'stadium' => $ticket->getSport()->getStadium()->getName(),
              ],
            ];
            })->toArray();

            return new JsonResponse([
                'code' => JsonResponse::HTTP_OK,
                'data' => $tickets
            ], JsonResponse::HTTP_OK);

        } catch (\Exception $e) {
            $statusCode = JsonResponse::HTTP_INTERNAL_SERVER_ERROR;

            return new JsonResponse([
                'code' => $statusCode,
                'message' => $e->getMessage()
            ], $statusCode);
        }
    }

    #[Route('/user/{id}/tickets', methods: ['POST'])]
    public function postTickets(string $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $token = $request->headers->get('Authorization');
        $jwt = str_replace('Bearer ', '', $token);
        try {
            $jwt = explode('.', $jwt);
            $decoded = base64_decode($jwt[1]);
            $userData = json_decode($decoded, true);
            if (!$userData) {
                throw new \Exception('Token JWT no proporcionado', 401);
            }
            $exp = $userData['exp'] ?? null;
            if ($exp && $exp < time()) {
                throw new \Exception('Token JWT caducado', 401);
            }

            $id_parts = explode('|', $id);
            if (!empty($id_parts[1])) {
                $id = $id_parts[1];
            }

             $user = $em->getRepository(User::class)->findOneBy(['tokenAuth' => $id]);
            if (!$user) {
                throw new \Exception('Usuario no encontrado', 404);
            }
            //return $this->json(['user' => $userData], 200);
        } catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            return $this->json(['error' => $e->getMessage()], $statusCode);
        }
    
        $jsonContent = $request->getContent();
        $ticketsData = json_decode($jsonContent, true);
        if (!is_array($ticketsData)) {
            return new JsonResponse(['code' => JsonResponse::HTTP_BAD_REQUEST, 'message' => 'Invalid data format.']);
        }
    
        $usedSeats = [];
        $sportsTicketCount = $this->retrieveUserTicketCounts($user, $em);
        $totalTicketsRequested = 0;
    
        try {
            foreach ($ticketsData as $ticketData) {
                $sport = $em->getRepository(Sport::class)->find($ticketData['sport_id']);
                $zone = $em->getRepository(Zone::class)->find($ticketData['zone_id']);
                if (!$sport || !$zone) {
                    throw new \Exception('Sport or Zone not found.');
                }
    
                if ($zone->getStadium() !== $sport->getStadium()) {
                    throw new \Exception('Invalid or mismatched zone for the specified sport’s stadium.');
                }
    
                $sportId = $sport->getId();
                $transactionId = $ticketData['transaction'] ?? null;
                if ($transactionId === null) {
                    throw new \Exception('Transaction ID is required.');
                }
    
                if (!isset($sportsTicketCount[$sportId])) {
                    $sportsTicketCount[$sportId] = 0;
                }
                $sportsTicketCount[$sportId]++;
                $totalTicketsRequested++;
    
                if ($sportsTicketCount[$sportId] > 5) {
                    throw new \Exception("Cannot buy more than 5 tickets for sport ID $sportId.");
                }
                if (count(array_keys($sportsTicketCount)) > 3) {
                    throw new \Exception("Cannot buy tickets for more than 3 different sports.");
                }
                if ($totalTicketsRequested > 15) {
                    throw new \Exception("Cannot have more than 15 tickets in total.");
                }
    
                $query = $this->getAvailableSeatsQuery($em, $zone, $sport, $usedSeats);
                $availableSits = $query->getResult();
                if (empty($availableSits)) {
                    throw new \Exception("No available seats found for the specified zone and sport.");
                }
    
                $selectedSit = array_shift($availableSits);
                $usedSeats[] = $selectedSit->getId();
    
                $ticket = new Ticket();
                $ticket->setType($ticketData['type'] ?? 'Default Type');
                $ticket->setPrice($ticketData['price'] ?? 0);
                $ticket->setTransaction($transactionId);
                $date = \DateTime::createFromFormat('d/m/Y', $ticketData['date']);
                if (!$date) {
                    throw new \Exception("Invalid date format.");
                }
                $ticket->setDate($date);
                $ticket->setSit($selectedSit);
                $ticket->setSport($sport);
                $ticket->addUser($user);
                $em->persist($ticket);
            }
    
            $em->flush();
            $em->clear();
    
            return new JsonResponse([
                'code' => JsonResponse::HTTP_CREATED,
                'message' => 'Tickets successfully created'
            ], JsonResponse::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse([
                'code' => JsonResponse::HTTP_BAD_REQUEST,
                'message' => $e->getMessage()
            ], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
    
    private function retrieveUserTicketCounts(User $user, EntityManagerInterface $em) {
        $dql = '
        SELECT s.id, COUNT(t.id) as ticketCount
        FROM App\Entity\Ticket t
        JOIN t.sport s
        WHERE t.user = :user
        GROUP BY s.id';
        $results = $em->createQuery($dql)->setParameter('user', $user)->getResult();
        $ticketCounts = [];
        foreach ($results as $result) {
            $ticketCounts[$result['id']] = (int) $result['ticketCount'];
        }
        return $ticketCounts;
    }
    

private function getAvailableSeatsQuery(EntityManagerInterface $em, Zone $zone, Sport $sport, array $usedSeats): ORMQuery
{
    $dql = '
        SELECT s
        FROM App\Entity\Sit s
        WHERE s.zone = :zone AND s.id NOT IN (
            SELECT sit.id FROM App\Entity\Ticket t JOIN t.sit sit WHERE t.sit IS NOT NULL AND t.sport = :sport
        )
    ';
    if (!empty($usedSeats)) {
        $dql .= ' AND s.id NOT IN (:usedSeats)';
    }

    $query = $em->createQuery($dql)
        ->setParameter('zone', $zone)
        ->setParameter('sport', $sport);

    if (!empty($usedSeats)) {
        $query->setParameter('usedSeats', $usedSeats);
    }

    return $query;
}





    

    


}
