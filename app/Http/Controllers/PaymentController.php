<?php

namespace App\Http\Controllers;

use App\Services\PaymentService;
use App\Http\Requests\PaymentRequest;

class PaymentController extends Controller
{
    public function __construct(private PaymentService $paymentService) {}

    public function getPaymentUser(PaymentRequest $req)
    {
        $payments = $this->paymentService->getPaymentUser($req);
        return response()->json($payments, 200);
    }

    public function getPaymentGroup(PaymentRequest $req)
    {
        $payment = $this->paymentService->getPaymentGroup($req);
        return response()->json($payment, 200);
    }
}
