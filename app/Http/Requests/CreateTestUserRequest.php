<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateTestUserRequest extends FormRequest
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
            'group_id' => ['required', 'exists:groups,id'],
            'username' => ['required', 'string', 'min:2', 'max:50'],
        ];
    }

    
    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'username.required' => 'El nombre de usuario es obligatorio',
            'username.min' => 'El nombre debe tener al menos :min caracteres',
            'username.max' => 'El nombre no puede tener más de :max caracteres',
        ];
    }
}
