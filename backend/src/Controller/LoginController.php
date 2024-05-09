<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\DependencyInjection\EnvVarLoaderInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Auth0\SDK\API\Management;
use Auth0\SDK\API\ManagementClient;
use Auth0\SDK\Auth0;
use Auth0\SDK\Configuration\SdkConfiguration;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\HttpFoundation\RedirectResponse;




class LoginController extends AbstractController
{
    private SdkConfiguration $configuration;
    private HttpClientInterface $httpClient;

    public function __construct(
        string $auth0Domain,
        string $auth0ClientId,
        string $auth0ManagementToken,
        string $auth0ClientSecret,
        string $auth0Audience,
        string $cookieSecret,
        string $loginCallback,
        HttpClientInterface $httpClient
    ) {
        $this->configuration = new SdkConfiguration(
            domain: $auth0Domain,
            clientId: $auth0ClientId,
            redirectUri: $loginCallback,
            clientSecret: $auth0ClientSecret,
            audience: [$auth0Audience],
            cookieSecret: $cookieSecret,
            managementToken: $auth0ManagementToken
        );
        $this->httpClient = $httpClient;
    }

    // #[Route('/create-auth0-user', name: 'create-auth0-user')]
    // public function __invoke(): Response
    // {
    //     $auth0Management = new Management($this->configuration);

    //     $response = $auth0Management->users()->create(
    //         'Username-Password-Authentication',
    //         [
    //             'email' => 's.alletti@gmail.com',
    //             'password' => 'Toto1234=:!',
    //             'verify_email' => true,
    //             "app_metadata" => [
    //                 "invitedToMyApp" => true,
    //             ]
    //         ]
    //     );

    //     return new Response($response->getBody()->getContents());
    // }


    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Decode JSON payload from request
        $data = json_decode($request->getContent(), true);

        // Validate required fields
        if (!isset($data['email'], $data['password'])) {
            return new JsonResponse(['error' => 'Email and password are required.'], Response::HTTP_BAD_REQUEST);
        }
        if ($data['email'] === $data['password']) {
            return new JsonResponse(['error' => 'Email and password cannot be the same.'], Response::HTTP_BAD_REQUEST);
        }
        /*
        if ($this->isWeakPassword($data['password'])) {
            return new JsonResponse(['error' => 'Password is weak.'], Response::HTTP_BAD_REQUEST);
        }
        */

        try {
            // Create Auth0 user
            $auth0Management = new Management($this->configuration);
            $response = $auth0Management->users()->create(
                'Username-Password-Authentication',
                [
                    'email' => $data['email'],
                    'password' => $data['password'],
                    'verify_email' => true,
                    "app_metadata" => [
                        "invitedToMyApp" => true,
                    ]
                ]
            );

            $responseData = json_decode($response->getBody(), true);
            if (isset($responseData["error"])) {
                return new JsonResponse($responseData, Response::HTTP_CONFLICT);
            } elseif (isset($responseData["user_id"])) {
                $user = new User();
                $user->setPicture($responseData["picture"]);
                // $user->setPicture('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
                if(!isset($data["name"])){
                    $user->setName($data["name"]);
                }else{
                    $user->setName($responseData["nickname"]);
                }
                $user->setTokenAuth($responseData["user_id"]);
                $user->setEmail($responseData["email"]);
                $entityManager->persist($user);
                $entityManager->flush();
                return new JsonResponse($responseData, Response::HTTP_CREATED);
            } else {
                return new JsonResponse(['error' => 'Unknown error occurred.'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Registration failed: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    #[Route('/login', name: 'app_login')]
    public function login(Request $request): Response
    {
        $auth0 = new Auth0($this->configuration);
        return $this->redirect($auth0->login());

    }












    function isWeakPassword(string $password): bool
    {
        if (strlen($password) < 8) {
            return true;
        }

        if (ctype_alpha($password) || ctype_digit($password)) {
            return true;
        }

        return true;
    }


}

