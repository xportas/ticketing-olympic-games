<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

class Auth0Controller extends AbstractController
{


    /**
     * @Route("/api/user", name="api_user")
     */
    #[Route('/api/user', methods: ['GET'])]
    public function fetchUser(Request $request, EntityManagerInterface $manager): Response
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
            $user = $manager->getRepository(User::class)->find($userData['sub']);
            if (!$user) {
                throw new \Exception('Usuario no encontrado', 404);
            }
            //return $this->json(['user' => $userData], 200);
        } catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            return $this->json(['error' => $e->getMessage()], $statusCode);
        }
    }
}
