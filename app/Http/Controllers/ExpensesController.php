<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ExpensesService;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\PaymentRequest;
use App\Http\Requests\ExpenseGetRequest;
use App\Http\Requests\ExpensesGetRequest;
use App\Http\Requests\MarkPaidDivRequest;
use App\Http\Requests\MarkPaidExpRequest;
use App\Http\Requests\ExpensesCreateRequest;
use App\Http\Requests\ExpensesDeleteRequest;
use App\Http\Requests\ExpensesUpdateRequest;
use App\Http\Requests\ExpensesDivisionsRequest;

class ExpensesController extends Controller
{
    public function __construct(private ExpensesService $expensesService) {}

    public function getExpenses(ExpensesGetRequest $req)
    {
        $expenses = $this->expensesService->getExpenses($req);
        return response()->json($expenses);
    }

    public function getExpense(ExpenseGetRequest $req)
    {
        $expense = $this->expensesService->getExpense($req);
        return response()->json($expense, 200);
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

    public function getDivisions(ExpensesDivisionsRequest $req)
    {
        $divisions = $this->expensesService->getDivisions($req);
        return response()->json($divisions, 200);
    }
    
    public function markPaidExp(MarkPaidExpRequest $req)
    {
        $this->expensesService->markPaidExp($req);
        return response()->json(['message', 'Gasto marcado como completado']);
    }

    public function markPaidDiv(MarkPaidDivRequest $req)
    {
        $this->expensesService->markPaidDiv($req);
        return response()->json(['message', 'Gasto marcado como completado']);
    }

    public function getPaymentGroup(PaymentRequest $req)
    {
        $payment = $this->expensesService->getPaymentGroup($req);
        return response()->json($payment, 200);
    }
    
    public function getPaymentUser(PaymentRequest $req)
    {
        $payment = $this->expensesService->getPaymentUser($req);
        return response()->json($payment, 200);
    }


    


}
