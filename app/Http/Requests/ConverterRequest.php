<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConverterRequest extends FormRequest
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
            'id_expense' => 'required|exists:expenses,id'
        ];
    }

    public function messages()
    {
        return [
            'id_expense.required' => 'El id del gasto es obligatorio',
            'id_expense.exists' => 'El gasto no existe',   
        ];
    }
}
