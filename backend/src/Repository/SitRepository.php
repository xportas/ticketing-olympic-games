<?php

namespace App\Repository;

use App\Entity\Sit;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Sit>
 *
 * @method Sit|null find($id, $lockMode = null, $lockVersion = null)
 * @method Sit|null findOneBy(array $criteria, array $orderBy = null)
 * @method Sit[]    findAll()
 * @method Sit[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SitRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Sit::class);
    }

//    /**
//     * @return Sit[] Returns an array of Sit objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Sit
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
