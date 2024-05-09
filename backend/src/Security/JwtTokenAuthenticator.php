<?php

// src/Security/JwtTokenAuthenticator.php
namespace App\Security;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Security;

class JwtTokenAuthenticator  
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function supports(Request $request)
    {
        return $request->headers->has('Authorization');
    }

    public function getCredentials(Request $request)
    {
        return [
            'token' => $request->headers->get('Authorization')
        ];
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        $token = $credentials['token'];

        $jwt = str_replace('Bearer ', '', $token);
        $jwtParts = explode('.', $jwt);
        if (count($jwtParts) !== 3) {
            throw new CustomUserMessageAuthenticationException('Token JWT no válido');
        }

        $decoded = base64_decode($jwtParts[1]);
        $userData = json_decode($decoded, true);

        if (!$userData) {
            throw new CustomUserMessageAuthenticationException('Token JWT no válido');
        }

        $exp = $userData['exp'] ?? null;
        if ($exp && $exp < time()) {
            throw new CustomUserMessageAuthenticationException('Token JWT caducado');
        }

        $userId = $userData['sub'] ?? null;
        if (!$userId) {
            throw new CustomUserMessageAuthenticationException('ID de usuario no encontrado en el token JWT');
        }

        $user = $this->entityManager->getRepository(User::class)->find($userId);
        if (!$user) {
            throw new CustomUserMessageAuthenticationException('Usuario no encontrado');
        }

        return $user;
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        // Las credenciales ya han sido verificadas en el método getUser
        return true;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        throw $exception;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        // No se requiere ninguna acción adicional en el éxito de la autenticación
    }

    public function start(Request $request, AuthenticationException $authException = null)
    {
        throw new CustomUserMessageAuthenticationException('Autenticación requerida');
    }

    public function supportsRememberMe()
    {
        return false;
    }
}
