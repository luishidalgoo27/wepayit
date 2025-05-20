<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ConverterController extends Controller
{
    public function convert(Request $req)
    {
        try {
            $from = $req->input('from');
            $to = $req->input('to');
            $amount = $req->input('amount');
            $apiKey = env('EXCHANGE_API_KEY');

            if (empty($from) || empty($to) || empty($amount)) {
                throw new \InvalidArgumentException('Parámetros de conversión incompletos');
            }

            if (!is_numeric($amount) || $amount <= 0) {
                throw new \InvalidArgumentException('El monto debe ser un número positivo');
            }

            $response = Http::timeout(10)->withoutVerifying()->get('https://api.exchangerate.host/convert', [
                'from' => $from,
                'to' => $to,
                'amount' => $amount,
                'access_key' => $apiKey,
            ]);

            if ($response->failed()) {
                throw new \RuntimeException('Error en la API de conversión: ' . $response->status());
            }

            $result = $response->json();
            
            if (!isset($result['result']) || !is_numeric($result['result'])) {
                throw new \RuntimeException('Respuesta inválida del servicio de conversión');
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'from' => $from,
                    'to' => $to,
                    'original_amount' => (float)$amount,
                    'converted_amount' => (float)$result['result'],
                    'rate' => $result['info']['rate'] ?? null,
                ]
            ]);

        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
            
        } catch (\RuntimeException $e) {
            Log::error('Error en la conversión de moneda: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error al realizar la conversión de moneda',
                'error' => $e->getMessage()
            ], 500);
            
        } catch (\Exception $e) {
            Log::error('Error inesperado en ConverterController: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error inesperado al procesar la solicitud'
            ], 500);
        }
    }
}
