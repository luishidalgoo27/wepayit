<?php

namespace App\Services;

use App\Models\Expense;
use App\Models\Payment;
use App\Models\Expense_division;
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
use App\Http\Requests\ExpenseDivisionsExpRequest;

class ExpensesService
{
    public function __construct(private Expense $expense, private Expense_division $expenseDivision) {}

    public function create(ExpensesCreateRequest $req)
    {
        $expense = $this->expense->create([
            'title'         => $req->title,
            'amount'        => $req->amount,
            'currency_type' => $req->currency_type,
            'paid_by'       => $req->paid_by,
            'group_id'      => $req->group_id,
            'date'          => $req->date,
            'description'   => $req->description,
            'category_id'   => $req->category_id,
            'recurrent'     => $req->recurrent ?? false,
            'frecuency'     => $req->frecuency,
        ]);

        foreach ($req->users_division as $user) {
            $this->expenseDivision->create([
                'expense_id' => $expense->id,
                'user_id' => $user['user_id'],
                'assigned_amount' => $user['assigned_amount'],
                'status' => $user['user_id'] == $req->paid_by ? 'paid' : 'pending',
            ]);
        }

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
            'category_id'      => $req->category_id      ?? $expense->category_id,
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

        return $expense;
    }

    public function delete(ExpensesDeleteRequest $req)
    {
        $expense = Expense::where('id', $req->expense_id)->delete();
        return response()->json($expense, 200);
    }

    public function getExpense(ExpenseGetRequest $req)
    {
        $expense = $this->expense::find($req->expense_id);
        return $expense;
    }

    public function getExpenses(ExpensesGetRequest $req)
    {
        $expenses = Expense::where('group_id', $req->group_id)->get();
        return $expenses;
    }

    public function getDivisions(ExpensesDivisionsRequest $req)
    {
        $expenses = Expense::where('group_id', $req->group_id)->get();
        $expensesId = $expenses->pluck('id');
        $divisions = Expense_division::whereIn('expense_id', $expensesId)->get();
        return $divisions;
    }
    
    public function markPaidExp(MarkPaidExpRequest $req)
    {
        $expense = Expense::where('id', $req->expense_id)->update([
            'state' => 'closed'
        ]);
        return $expense;
    }

    public function markPaidDiv(MarkPaidDivRequest $req)
    {
        $division = Expense_division::where('id', $req->division_id)->update([
            'status' => 'paid'
        ]);
        return $division;
    }

    public function getPaymentUser(PaymentRequest $req)
    {
        $groupId = $req->group_id;

        $expenseIds = Expense::where('group_id', $groupId)->pluck('id');
        $paymentUsers = Expense_division::where('user_id', Auth::id())
            ->whereIn('expense_id', $expenseIds)
            ->where('status', 'paid')
            ->sum('assigned_amount');    

        return $paymentUsers;
    }

    public function getPaymentGroup(PaymentRequest $req)
    {
        $groupId = $req->group_id;

        $expenseIds = Expense::where('group_id', $groupId)->pluck('id');
        $paymentUsers = Expense::whereIn('id', $expenseIds)->sum('amount');    

        return $paymentUsers;
    }

    public function getDivisionsExp(ExpenseDivisionsExpRequest $req)
    {
        $divisions = Expense_division::whereIn('id', $req->expense_id)->get();
        return $divisions;
    }
}
?>