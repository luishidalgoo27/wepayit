<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ExpensesDivisionCreateRequest extends FormRequest
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
            'users_division' => 'required|array|min:1',
            'users_division.*.user_id' => 'required|exists:users,id',
            'users_division.*.assigned_amount' => 'required|integer',
        ];
    }

    public function messages(): array
    {
        return [
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
