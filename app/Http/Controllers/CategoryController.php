<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    public function __construct(private CategoryService $categoryService) {}

    public function index()
    {
        $categories = $this->categoryService->index();
        return response()->json($categories);
    }
}
