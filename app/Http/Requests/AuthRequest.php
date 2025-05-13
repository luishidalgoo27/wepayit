<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthRequest extends FormRequest
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
        $route = $this->route()->getName(); 

        if ($route === 'auth.register') {
            return [
                'name'     => 'required|string|max:255',
                'email'    => 'required|string|email|unique:users,email',
                'password' => [
                    'required',
                    'string',
                    'min:8',
                    'regex:/[A-Z]/',
                    'regex:/[a-z]/', 
                    'regex:/[0-9]/',  
                ],
                'username' => 'required|string|max:255|unique:users',
            ];
        }

        if ($route === 'auth.login') {
            return [
                'email'    => 'required|email',
                'password' => 'required',
            ];
        }

        return [];
    }

    /**
     * Custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'name.required'     => 'El nombre es obligatorio.',
            'name.string'       => 'El nombre debe ser una cadena de texto.',
            'email.required'    => 'El correo electrónico es obligatorio.',
            'email.email'       => 'El correo electrónico no es válido.',
            'email.unique'      => 'Este correo ya está registrado.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.min'      => 'La contraseña debe tener al menos 8 caracteres.',
            'password.regex'    => 'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número.',
            'username.required' => 'El nombre de usuario es obligatorio.',
            'username.string'   => 'El nombre de usuario debe ser una cadena de texto.',
            'username.unique'   => 'Este nombre de usuario ya está en uso.',
        ];
    }
}
