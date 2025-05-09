<?php

namespace App\Services;

use App\Models\Expense;
use App\Models\Payment;
use App\Models\Expense_division;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ExpensesCreateRequest;
use App\Http\Requests\ExpensesGetRequest;
use App\Http\Requests\ExpensesUpdateRequest;
use App\Http\Requests\ExpensesDeleteRequest;

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
            'date'          => $req->date,
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

    public function update(ExpensesUpdateRequest $req)
    {
        $expense = $this->expense->findOrFail($req->expense_id);

        $expense->update([
            'title'         => $req->title         ?? $expense->title,
            'amount'        => $req->amount        ?? $expense->amount,
            'currency_type' => $req->currency_type ?? $expense->currency_type,
            'group_id'      => $req->group_id      ?? $expense->group_id,
            'date'          => $req->date          ?? $expense->date,
            'description'   => $req->description   ?? $expense->description,
            'category'      => $req->category      ?? $expense->category,
            'receipt_url'   => $req->receipt_url   ?? $expense->receipt_url,
            'recurrent'     => $req->recurrent     ?? $expense->recurrent,
            'frecuency'     => $req->frecuency     ?? $expense->frecuency,
        ]);

        if ($req->has('users_division')) {
            $this->expenseDivision->where('expense_id', $expense->id)->delete();

            foreach ($req->users_division as $user) {
                $this->expenseDivision->create([
                    'expense_id'      => $expense->id,
                    'user_id'         => $user['user_id'],
                    'assigned_amount' => $user['assigned_amount'],
                ]);
            }
        }

        $payment = $this->payment->where('expense_id', $expense->id)->first();
        if ($payment) {
            $payment->update([
                'amount'       => $expense->amount,
                'payment_date' => $expense->date,
            ]);
        }

        return $expense;
    }

    public function delete(ExpensesDeleteRequest $req)
    {
        $expense = Expense::where('id', $req->expense_id)->delete();
        return response()->json($expense, 200);
    }


    public function getExpenses(ExpensesGetRequest $req)
    {
        $expenses = Expense::where('group_id', $req->group_id)->get();
        return $expenses;
    }

    
}
?>