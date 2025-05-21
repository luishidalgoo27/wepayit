<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConvertUserRequest extends FormRequest
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
            'id_division' => 'required|exists:expeses_divisions,id'
        ];
    }

    public function messages()
    {
        return [
            'id_division.required' => 'El id de division es obligatorio',
            'id_division.exists' => 'La division no existe'
        ];
    }
}
