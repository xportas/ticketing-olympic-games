<?php

namespace App\Scheduler;

use App\Entity\Extra;
use App\Message\LogSlots;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Scheduler\Attribute\AsSchedule;
use Symfony\Component\Scheduler\RecurringMessage;
use Symfony\Component\Scheduler\Schedule;
use Symfony\Component\Scheduler\ScheduleProviderInterface;

#[AsSchedule]
class MainSchedule implements ScheduleProviderInterface
{
    private EntityManagerInterface $entityManager;
    private LoggerInterface $logger;

    public function __construct(EntityManagerInterface $entityManager, LoggerInterface $logger)
    {
        $this->entityManager = $entityManager;
        $this->logger = $logger;
    }

    public function getSchedule(): Schedule
    {
        $period = $this->entityManager->getRepository(Extra::class)->find(1);

        $firstPeriodEndDate = $period ? $period->getFirstPeriodEndDate()->modify('-1 day')->format('j n *') : '0 0';

        $secondPeriodDate = $period ? $period->getFirstPeriodEndDate()
            ->modify('first day of +2 months')->format('j n *') : '0 0';

        $schedule = new Schedule();
        $schedule->add(
            RecurringMessage::cron("0 0 $firstPeriodEndDate", new LogSlots("First-Slots-Setter-Command")),
            RecurringMessage::cron("0 0 $secondPeriodDate", new LogSlots("Second-Slots-Setter-Command"))
        );

        return $schedule;
    }
}
