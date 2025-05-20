<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ConverterController extends Controller
{
    public function convert(Request $req)
    {
        $from = $req->input('from');
        $to = $req->input('to');
        $amount = $req->input('amount');
        $apiKey = env('EXCHANGE_API_KEY'); 

        $response = Http::withoutVerifying()->get('https://api.exchangerate.host/convert', [
            'from' => $from,
            'to' => $to,
            'amount' => $amount,
            'access_key' => $apiKey, 
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'API request failed'], 500);
        }

        return response()->json([
            'from' => $from,
            'to' => $to,
            'original_amount' => $amount,
            'converted_amount' => $response->json()['result'] ?? null,
        ]);
    }
}
