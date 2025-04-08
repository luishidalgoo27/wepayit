<?php

namespace App\Services;

use App\Repositories\GroupRepository;

class GroupService
{
    public function __construct(private GroupRepository $repository){}

    public function getAll(): array
    {
        return $this->repository->all();
    }
}
?>