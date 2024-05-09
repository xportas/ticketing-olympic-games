<?php

namespace App\Controller;

use App\Entity\Monitor;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('/user/auth0/{auth0Id}', name: 'retrieve_user_by_auth0_id', methods: ['GET'])]
    public function retrieveUserByAuth0Id(string $auth0Id, EntityManagerInterface $manager): JsonResponse
    {
        try {
            $user = $manager->getRepository(User::class)->findOneBy(['tokenAuth' => $auth0Id]);

            if (!$user) {
                return new JsonResponse([
                    'code' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'User not found'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            $slotsCollection = $user->getSlots();
            $slots = $slotsCollection->map(function($slot) {
                return [
                    'id' => $slot->getId(),
                    'dateStart' => $slot->getDateStart()->format('c'),
                    'dateEnd' => $slot->getDateEnd()->format('c'),
                ];
            })->toArray();

            $tickets = $user->getTickets()->map(function ($ticket) {
                return [
                    'id' => $ticket->getId(),
                ];
            })->toArray();

            $userData = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles(),
                'picture' => $user->getPicture(),
                'tokenAuth' => $user->getTokenAuth(),
                'name' => $user->getName(),
                'slots' => $slots,
                'tickets' => $tickets,
            ];

            return new JsonResponse([
                'code' => JsonResponse::HTTP_OK,
                'data' => $userData
            ], JsonResponse::HTTP_OK);

        } catch (\Exception $e) {
            $statusCode = JsonResponse::HTTP_INTERNAL_SERVER_ERROR;
            return new JsonResponse([
                'code' => $statusCode,
                'message' => $e->getMessage()
            ], $statusCode);
        }
    }

}