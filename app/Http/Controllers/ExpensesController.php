<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ExpensesService;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ExpensesGetRequest;
use App\Http\Requests\ExpensesDeleteRequest;
use App\Http\Requests\ExpensesCreateRequest;
use App\Http\Requests\ExpensesUpdateRequest;

class ExpensesController extends Controller
{
    public function __construct(private ExpensesService $expensesService) {}

    public function getExpenses(ExpensesGetRequest $req){
        $expenses = $this->expensesService->getExpenses($req);
        return response()->json($expenses);
    }

    public function create(ExpensesCreateRequest $req)
    {
        $expense = $this->expensesService->create($req);
        return response()->json($expense);
    }

    public function update(ExpensesUpdateRequest $req)
    {
        $expense = $this->expensesService->update($req);
        return response()->json($expense, 200);
    }

    public function delete(ExpensesDeleteRequest $req)
    {
        $expense = $this->expensesService->delete($req);
        return response()->json($expense, 200);
    }


}
