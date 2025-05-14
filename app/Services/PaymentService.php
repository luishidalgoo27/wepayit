<?php

namespace App\Services;

use App\Models\Expense;
use App\Models\Payment;
use App\Models\Payment_user;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\PaymentRequest;

class PaymentService
{
    public function __construct() {}

    public function getPaymentUser(PaymentRequest $req)
    {
        $groupId = $req->group_id;

        $expenseIds = Expense::where('group_id', $groupId)->pluck('id');
        $paymentUsers = Payment_user::where('user_id', Auth::id())->whereIn('expense_id', $expenseIds)->sum('amount');    

        return $paymentUsers;
    }

    public function getPaymentGroup(PaymentRequest $req)
    {
        $groupId = $req->group_id;

        $expenseIds = Expense::where('group_id', $groupId)->pluck('id');
        $paymentUsers = Payment::whereIn('expense_id', $expenseIds)->sum('amount');    

        return $paymentUsers;
    }
}
?>