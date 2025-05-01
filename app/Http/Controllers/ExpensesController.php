<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ExpensesService;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ExpensesGetRequest;
use App\Http\Requests\ExpensesCreateRequest;

class ExpensesController extends Controller
{
    public function __construct(private ExpensesService $expensesService) {}

    public function getExpenses(ExpensesGetRequest $req){

    }

    public function create(ExpensesCreateRequest $req)
    {
        $expense = $this->expensesService->create($req);
        return response()->json($expense);
    }
}
