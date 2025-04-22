<?php

namespace App\Services;

use App\Http\reqs\Expensesreq;
use App\Http\Requests\ExpensesRequest;
use App\Models\Expense;

class ExpensesService
{
    public function __construct(private Expense $expense) {}

    public function create(ExpensesRequest $req)
    {
        $expense = $this->expense->create([
            'title'         => $req->title,
            'amount'        => $req->amount,
            'currency_type' => $req->currency_type,
            'paid_by'       => $req->paid_by,
            'group_id'      => $req->group_id,
            'date'          => $req->date,
            'description'   => $req->description,
            'category'      => $req->category,
            'receipt_url'   => $req->receipt_url,
            'state'         => $req->state,
            'recurrent'     => $req->recurrent ?? false,
            'frecuency'     => $req->frecuency,
        ]);

        return $expense;
    }
}
?>