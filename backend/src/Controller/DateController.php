<?php

namespace App\Controller;

use App\Entity\Extra;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class DateController extends AbstractController
{
    #[Route('/date', name: 'app_date')]
    public function index(EntityManagerInterface $manager): JsonResponse
    {
        $period = $manager->getRepository(Extra::class)->find(1);
        $firstPeriodEndDate = $period ? $period->getFirstPeriodEndDate()->format('Y-m-d') : 'No date available';

        return $this->json([
            $firstPeriodEndDate
        ]);
    }
}
