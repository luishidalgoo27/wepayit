<?php

declare(strict_types=1);

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

use App\Repository\Interface\BaseRepositoryInterface;

/**
 * @method object|null find(mixed $id, LockMode|int|null $lockMode = null, ?int $lockVersion = null)
 * @method object|null findOneBy(array $criteria)
 * @method object[] findAll()
 * @method object[] findBy(array $criteria, ?array $orderBy = null, ?int $limit = null, ?int $offset = null)
 */
abstract class BaseRepository extends ServiceEntityRepository implements BaseRepositoryInterface
{
    private EntityManagerInterface $_em;

    public function __construct(
        ManagerRegistry $registry,
        string $entityClass,
        EntityManagerInterface $entityManager
    ) {
        parent::__construct($registry, $entityClass);

        $this->_em = $entityManager;
    }

    /**
     * Create Criteria object based on filters.
     *
     * @param array $filters Associative array of filters (attribute, value, condition).
     *
     * @return Criteria
     */
    private function createCriteria(array $filters): Criteria
    {
        $criteria = Criteria::create();
        
        foreach ($filters as $filter) {
            $attribute = $filter['attribute'];
            $value = $filter['value'];
            $condition = $filter['condition'];
            
            switch ($condition) {
                case '=':
                    $criteria->andWhere(Criteria::expr()->eq($attribute, $value));
                    break;
                case '>':
                    $criteria->andWhere(Criteria::expr()->gt($attribute, $value));
                    break;
                case '<':
                    $criteria->andWhere(Criteria::expr()->lt($attribute, $value));
                    break;
                case '>=':
                    $criteria->andWhere(Criteria::expr()->gte($attribute, $value));
                    break;
                case '<=':
                    $criteria->andWhere(Criteria::expr()->lte($attribute, $value));
                    break;
                case 'contains':
                    $criteria->andWhere(Criteria::expr()->contains($attribute, $value));
                    break;
                case 'in':
                    $criteria->andWhere(Criteria::expr()->in($attribute, $value));
                    break;
                case 'not-in':
                    $criteria->andWhere(Criteria::expr()->notIn($attribute, $value));
                    break;
                case 'is-null':
                    $criteria->andWhere(Criteria::expr()->isNull($attribute));
                    break;
                case 'not-is-null':
                    $criteria->andWhere($criteria->expr()->not($criteria->expr()->isNull($attribute)));
                    break;
                default:
                    throw new \InvalidArgumentException("Unsupported condition: $condition");
            }
        }

        return $criteria;
    }

    /**
     * Fetch entities with optional filtering, ordering, and limiting.
     *
     * @param array $filters Associative array of filters (attribute, value, condition).
     * @param string $orderBy Field to order the results by (e.g., 'createdAt').
     * @param string $order Order direction ('asc' or 'desc').
     * @param int $limit Maximum number of results to return.
     * @param int $offset Offset for paginating results.
     *
     * @return mixed[] The array of filtered and ordered entities.
     */
    public function fetchBy(array $filters, string $orderBy, string $order, int $limit, int $offset): array
    {
        $criteria = $this->createCriteria($filters);
        
        if ($orderBy 
            && 
            $order
        ) {
            $criteria->orderBy([$orderBy => $order]);
        }
        
        if ($limit !== null) {
            $criteria->setMaxResults($limit);
        }
        
        if ($offset !== null) {
            $criteria->setFirstResult($offset);
        }

        $query = $this->createQueryBuilder('e')
            ->addCriteria($criteria)
            ->getQuery();
        
        return $query->getResult();
    }

    /**
     * Count entities with optional filtering.
     *
     * @param array $filters Associative array of filters (attribute, value, condition).
     *
     * @return int The number of entities matching the given criteria.
     */
    public function countBy(array $filters): int
    {
        $criteria = $this->createCriteria($filters);

        $query = $this->createQueryBuilder('e')
            ->select('COUNT(e.id)')
            ->addCriteria($criteria);

        return (int) $query->getQuery()->getSingleScalarResult();
    }

    /**
     * Save an entity to the database.
     *
     * This method persists the given entity to the database and flushes the changes.
     *
     * @param object $entity The entity to be saved.
     * 
     * @return object The saved entity.
     */
    public function save(object $entity): object
    {
        $this->_em->persist($entity);
        $this->_em->flush();

        return $entity;
    }

    /**
     * Remove an entity from the database.
     *
     * This method removes the given entity from the database and flushes the changes.
     *
     * @param object $entity The entity to be deleted.
     * 
     * @return void
     */
    public function remove(object $entity): void
    {
        $classMetadata = $this->_em->getClassMetadata($entity::class);

        $fields = $classMetadata->getFieldNames();

        if (
            in_array('deletedAt', $fields)
            &&
            $entity->getDeletedAt() == null
        ) {
            $entity->setDeletedAt(new \DateTime());
            
            $this->_em->persist($entity);
            $this->_em->flush();

            return;
        } else {
            $this->_em->remove($entity);
            $this->_em->flush();
        }
    }
}