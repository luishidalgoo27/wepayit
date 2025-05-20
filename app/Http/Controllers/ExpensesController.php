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
        try {
            $expenses = $this->expensesService->getExpenses($req);
            return response()->json([
                'success' => true,
                'data' => $expenses
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener los gastos: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getExpense(ExpenseGetRequest $req)
    {
        try {
            $expense = $this->expensesService->getExpense($req);
            return response()->json([
                'success' => true,
                'data' => $expense
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el gasto: ' . $e->getMessage()
            ], 500);
        }
    }

    public function create(ExpensesCreateRequest $req)
    {
        try {
            $expense = $this->expensesService->create($req);
            return response()->json([
                'success' => true,
                'message' => 'Gasto creado correctamente',
                'data' => $expense
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear el gasto: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(ExpensesUpdateRequest $req)
    {
        try {
            $expense = $this->expensesService->update($req);
            return response()->json([
                'success' => true,
                'message' => 'Gasto actualizado correctamente',
                'data' => $expense
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar el gasto: ' . $e->getMessage()
            ], 500);
        }
    }

    public function delete(ExpensesDeleteRequest $req)
    {
        try {
            $result = $this->expensesService->delete($req);
            return response()->json([
                'success' => true,
                'message' => 'Gasto eliminado correctamente',
                'data' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar el gasto: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getDivisions(ExpensesDivisionsRequest $req)
    {
        try {
            $divisions = $this->expensesService->getDivisions($req);
            return response()->json([
                'success' => true,
                'data' => $divisions
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener las divisiones: ' . $e->getMessage()
            ], 500);
        }
    }

    public function markPaidExp(MarkPaidExpRequest $req)
    {
        try {
            $this->expensesService->markPaidExp($req);
            return response()->json([
                'success' => true,
                'message' => 'Gasto marcado como pagado correctamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al marcar el gasto como pagado: ' . $e->getMessage()
            ], 500);
        }
    }

    public function markPaidDiv(MarkPaidDivRequest $req)
    {
        try {
            $this->expensesService->markPaidDiv($req);
            return response()->json([
                'success' => true,
                'message' => 'División de gasto marcada como pagada correctamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al marcar la división como pagada: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getPaymentGroup(PaymentRequest $req)
    {
        try {
            $payment = $this->expensesService->getPaymentGroup($req);
            return response()->json([
                'success' => true,
                'data' => $payment
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el pago del grupo: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getPaymentUser(PaymentRequest $req)
    {
        try {
            $payment = $this->expensesService->getPaymentUser($req);
            return response()->json([
                'success' => true,
                'data' => $payment
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el pago del usuario: ' . $e->getMessage()
            ], 500);
        }
    }
}
