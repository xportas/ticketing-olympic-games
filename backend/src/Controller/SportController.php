<?php

namespace App\Controller;

use App\Entity\Sit;
use App\Entity\Slot;
use App\Entity\Sport;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use App\Entity\Zone;

class SportController extends AbstractController
{
    #[Route('/slot/{id}/sports', name: 'app_sport', methods: ['GET'])]
    public function getSlotSports(string $id, EntityManagerInterface $em): JsonResponse
    {
        $slot = $em->getRepository(Slot::class)->find($id);
    
        if (!$slot) {
            return new JsonResponse(['message' => 'Slot not found'], JsonResponse::HTTP_NOT_FOUND);
        }
    
        $sportsData = [];
        foreach ($slot->getSports() as $sport) {
            $zonesData = [];
            $totalAvailableSits = 0;
    
            foreach ($sport->getStadium()->getZone() as $zone) {
                $query = $em->createQuery('
                    SELECT COUNT(s)
                    FROM App\Entity\Sit s
                    WHERE s.zone = :zone
                    AND NOT EXISTS (
                        SELECT t FROM App\Entity\Ticket t WHERE t.sit = s AND t.sport = :sport
                    )
                ')->setParameters([
                    'zone' => $zone,
                    'sport' => $sport
                ]);
                $availableSitsCount = $query->getSingleScalarResult();
                $totalAvailableSits += $availableSitsCount;
    
                $zonesData[] = [
                    'id' => $zone->getId(),
                    'name' => $zone->getName(),
                    'description' => $zone->getDescription(),
                    'availableSitsCount' => $availableSitsCount,
                    'price_multiplier' => $zone->getPriceMultiplier(),
                ];
            }
    
            $sportsData[] = [
                'id' => $sport->getId(),
                'name' => $sport->getName(),
                'description' => $sport->getDescription(),
                'price' => $sport->getPrice(),
                'date' => $sport->getDate()->format('c'),
                'stadium' => [
                    'id' => $sport->getStadium()->getId(),
                    'name' => $sport->getStadium()->getName(),
                    'location' => $sport->getStadium()->getLocation(),
                    'capacity' => $totalAvailableSits,
                    'zones' => $zonesData,
                ],
            ];
        }
    
        return new JsonResponse(['sports' => $sportsData], JsonResponse::HTTP_OK);
    }

    #[Route('/sports', name: 'app_all_sports', methods: ['GET'])]
    public function getAllSports(EntityManagerInterface $em): JsonResponse
    {
        $sportsRepository = $em->getRepository(Sport::class);
        $sports = $sportsRepository->findAll();

        if (!$sports) {
            return new JsonResponse(['message' => 'No sports found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $sportsData = array_map(function ($sport) {
            return [
                'id' => $sport->getId(),
                'name' => $sport->getName(),
                'description' => $sport->getDescription(),
                'price' => $sport->getPrice(),
                'date' => $sport->getDate()->format('c'),
            ];
        }, $sports);

        return new JsonResponse(['sports' => $sportsData], JsonResponse::HTTP_OK);
    }

    

    

}
