<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ExpensesCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'         => 'required|string|max:255',
            'amount'        => 'required|numeric|min:0',
            'currency_type' => 'required|string|max:10',
            'paid_by'       => 'required|exists:users,id',
            'group_id'      => 'required|exists:groups,id',
            'date'          => 'sometimes|date',
            'description'   => 'nullable|string',
            'category_id'      => 'nullable|numeric',
            'receipt_url'   => 'nullable|url',
            'state'         => 'nullable|string|max:100',
            'recurrent'     => 'boolean',
            'frecuency'     => 'nullable|string|max:50',
            'users_division' => 'required|array|min:1',
            'users_division.*.user_id' => 'required|exists:users,id',
            'users_division.*.assigned_amount' => 'required|numeric',
        ];
    }

    /**
     * Mensajes de error personalizados para las reglas de validación.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required'         => 'El título es obligatorio.',
            'title.string'           => 'El título debe ser una cadena de texto.',
            'title.max'              => 'El título no puede tener más de 255 caracteres.',

            'amount.required'        => 'El monto es obligatorio.',
            'amount.numeric'         => 'El monto debe ser un número.',
            'amount.min'             => 'El monto no puede ser negativo.',

            'currency_type.required' => 'El tipo de moneda es obligatorio.',
            'currency_type.string'   => 'El tipo de moneda debe ser una cadena de texto.',
            'currency_type.max'      => 'El tipo de moneda no puede tener más de 10 caracteres.',

            'paid_by.required'         => 'Debe haber un usuario pagador.',
            'paid_by.exists'         => 'El usuario pagador seleccionado no existe.',

            'group_id.required'      => 'El grupo es obligatorio.',
            'group_id.exists'        => 'El grupo seleccionado no existe.',

            'date.date'              => 'La fecha debe ser una fecha válida.',

            'description.string'     => 'La descripción debe ser una cadena de texto.',

            'category_id.numeric'    => 'La id de categoría debe ser un número.',

            'receipt_url.url'        => 'El enlace del recibo debe ser una URL válida.',

            'state.string'           => 'El estado debe ser una cadena de texto.',
            'state.max'              => 'El estado no puede tener más de 100 caracteres.',

            'recurrent.boolean'      => 'El campo recurrente debe ser verdadero o falso.',

            'frecuency.string'       => 'La frecuencia debe ser una cadena de texto.',
            'frecuency.max'          => 'La frecuencia no puede tener más de 50 caracteres.',

            'users_division.required' => 'Debes proporcionar al menos un usuario.',
            'users_division.array' => 'Usuarios debe ser un array.',
            'users_division.*.user_id.required' => 'Cada entrada debe tener un user_id.',
            'users_division.*.user_id.exists' => 'El user_id debe existir en la base de datos.',
            'users_division.*.assigned_amount.required' => 'Cada entrada debe tener una cantidad asignada.',
            'users_division.*.assigned_amount.integer' => 'La cantidad debe ser un número entero.',
        ];
    }

    /**
     * En caso de que falle la validación, devuelve un error JSON.
     *
     * @param Validator $validator
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
