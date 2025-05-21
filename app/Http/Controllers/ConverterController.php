<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\ConverterRequest;
use App\Http\Requests\ConvertUserRequest;
use App\Models\Expense_division;

class ConverterController extends Controller
{
    public function convert(ConverterRequest $req)
    {
        $expense = Expense::findOrFail($req->id_expense);
        
        $currencyGroup = Group::where('id', $expense->group_id)->value('currency_type');
        
        if ($expense->currency_type === $currencyGroup) {
            return response()->json([
                'converted_amount' => $expense->amount,
                'currency' => $expense->currency_type
            ]);
        }

        $response = Http::withoutVerifying()->get('https://api.exchangerate.host/convert', [
            'from' => $expense->currency_type,
            'to' => $currencyGroup,
            'amount' => $expense->amount,
            'access_key' => env('EXCHANGE_API_KEY'), 
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'API request failed'], 500);
        }

        return response()->json([
            'converted_amount' => $response->json()['result'],
            'currency' => $currencyGroup
        ]);
    }

    public function convertUser(ConvertUserRequest $req)
    {
        $division = Expense_division::find($req->id_division);
        $expense = Expense::where('id', $division->expense_id);
    }
}
