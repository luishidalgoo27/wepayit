<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExpenseGetRequest extends FormRequest
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
            'expense_id' => 'required|integer|exists:expenses,id'
        ];
    }

    public function messages()
    {
        return [
            'expense_id.required' => 'El id del gasto es obligatorio',
            'expense_id.integer' => 'El id del gasto debe ser un entero',
            'expense_id.exists' => 'El id del gasto no existe',
        ];
    }
}
