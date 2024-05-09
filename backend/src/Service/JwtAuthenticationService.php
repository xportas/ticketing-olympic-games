<?php

// src/Service/JwtAuthenticationService.php
namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class JwtAuthenticationService
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function authenticate($request)
    {
        $token = $request->headers->get('Authorization');
        if (!$token) {
            throw new \Exception('Token JWT no proporcionado', 401);
        }

        $jwt = str_replace('Bearer ', '', $token);
        $jwtParts = explode('.', $jwt);
        if (count($jwtParts) !== 3) {
            throw new \Exception('Token JWT no válido', 401);
        }

        $decoded = base64_decode($jwtParts[1]);
        $userData = json_decode($decoded, true);

        if (!$userData) {
            throw new \Exception('Token JWT no válido', 401);
        }

        $exp = $userData['exp'] ?? null;
        if ($exp && $exp < time()) {
            throw new \Exception('Token JWT caducado', 401);
        }

        $userId = $userData['sub'] ?? null;
        if (!$userId) {
            throw new \Exception('ID de usuario no encontrado en el token JWT', 401);
        }

        $user = $this->entityManager->getRepository(User::class)->find($userId);
        if (!$user) {
            throw new \Exception('Usuario no encontrado', 404);
        }

        return $user;
    }
}
