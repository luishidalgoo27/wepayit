<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExpensesRequest;
use App\Services\ExpensesService;
use Illuminate\Http\Request;

class ExpensesController extends Controller
{
    public function __construct(private ExpensesService $expensesService) {}

    public function create(ExpensesRequest $req)
    {
        $expense = $this->expensesService->create($req);
        return response()->json($expense, 201);
    }
}
