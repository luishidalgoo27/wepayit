<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ExpensesUpdateRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de validación.
     */
    public function rules(): array
    {
        return [
            'expense_id' => 'required|integer|exists:expenses,id',
            'title'         => 'sometimes|string|max:255',
            'amount'        => 'sometimes|numeric|min:0',
            'currency_type' => 'sometimes|string|max:10',
            'paid_by'       => 'sometimes|exists:users,id',
            'group_id'      => 'sometimes|exists:groups,id',
            'date'          => 'sometimes|date',
            'description'   => 'nullable|string',
            'category'      => 'nullable|string|max:255',
            'receipt_url'   => 'nullable|url',
            'state'         => 'nullable|string|max:100',
            'recurrent'     => 'sometimes|boolean',
            'frecuency'     => 'nullable|string|max:50',
            'users_division' => 'sometimes|array|min:1',
            'users_division.*.user_id' => 'required_with:users_division|exists:users,id',
            'users_division.*.assigned_amount' => 'required_with:users_division|integer',
        ];
    }

    /**
     * Mensajes personalizados.
     */
    public function messages(): array
    {
        return [
            'expense_id.required' => 'El ID del gasto es obligatorio.',
            'expense_id.exists'   => 'El gasto especificado no existe.',
            
            'title.string'           => 'El título debe ser una cadena de texto.',
            'title.max'              => 'El título no puede tener más de 255 caracteres.',

            'amount.numeric'         => 'El monto debe ser un número.',
            'amount.min'             => 'El monto no puede ser negativo.',

            'currency_type.string'   => 'El tipo de moneda debe ser una cadena de texto.',
            'currency_type.max'      => 'El tipo de moneda no puede tener más de 10 caracteres.',

            'paid_by.exists'         => 'El usuario pagador no existe.',
            'group_id.exists'        => 'El grupo seleccionado no existe.',
            'date.date'              => 'La fecha debe ser válida.',
            'description.string'     => 'La descripción debe ser texto.',
            'category.string'        => 'La categoría debe ser texto.',
            'category.max'           => 'La categoría no puede superar 255 caracteres.',
            'receipt_url.url'        => 'El recibo debe ser una URL válida.',
            'state.string'           => 'El estado debe ser texto.',
            'state.max'              => 'El estado no puede superar 100 caracteres.',
            'recurrent.boolean'      => 'Recurrente debe ser verdadero o falso.',
            'frecuency.string'       => 'La frecuencia debe ser texto.',
            'frecuency.max'          => 'La frecuencia no puede superar 50 caracteres.',

            'users_division.array' => 'La división de usuarios debe ser un array.',
            'users_division.min' => 'Debe haber al menos un usuario.',
            'users_division.*.user_id.required_with' => 'Cada división necesita un user_id.',
            'users_division.*.user_id.exists' => 'El user_id debe existir.',
            'users_division.*.assigned_amount.required_with' => 'Cada división necesita un monto asignado.',
            'users_division.*.assigned_amount.integer' => 'El monto debe ser un número entero.',
        ];
    }

    /**
     * Manejo personalizado del error de validación.
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status'  => false,
            'message' => 'Error de validación',
            'errors'  => $validator->errors()
        ], 422));
    }
}
