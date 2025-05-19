<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MarkPaidDivRequest extends FormRequest
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
            'division_id' => 'required|exists:expenses_divisions,id'
        ];
    }

    public function messages()
    {
        return [
            'division_id.required' => 'El id de division es obligatorio',
            'division_id.exists' => 'La division no existe'
        ];
    }
}
