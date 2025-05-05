<?php

namespace App\Services;

use App\Models\Expense;
use App\Models\Payment;
use App\Models\Expense_division;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ExpensesGetRequest;
use App\Http\Requests\ExpensesCreateRequest;

class ExpensesService
{
    public function __construct(private Expense $expense, private Expense_division $expenseDivision, private Payment $payment) {}

    public function create(ExpensesCreateRequest $req)
    {
        $expense = $this->expense->create([
            'title'         => $req->title,
            'amount'        => $req->amount,
            'currency_type' => $req->currency_type,
            'paid_by'       => Auth::id(),
            'group_id'      => $req->group_id,
            'date'          => now()->format('Y-m-d'),
            'description'   => $req->description,
            'category'      => $req->category,
            'receipt_url'   => $req->receipt_url,
            'recurrent'     => $req->recurrent ?? false,
            'frecuency'     => $req->frecuency,
        ]);

        foreach ($req->users_division as $user) {
            $this->expenseDivision->create([
                'expense_id' => $expense->id,
                'user_id' => $user['user_id'],
                'assigned_amount' => $user['assigned_amount'],
            ]);
        }

        $this->payment->create([
            'expense_id' => $expense->id,
            'payer_id' => $expense->paid_by,
            'amount' => $expense->amount,
            'payment_date' => $expense->date
        ]);

        return $expense;
    }

    public function getExpenses(ExpensesGetRequest $req)
    {
        $expenses = Expense::where('group_id', $req->group_id)->get();
        return $expenses;
    }

    
}
?>