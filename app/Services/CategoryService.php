<?php

namespace App\Services;

use App\Models\Category;

class CategoryService
{
    public function __construct(private Category $category) {}

    public function index()
    {
        $categories = $this->category->all();
        return $categories;
    }

}
?>