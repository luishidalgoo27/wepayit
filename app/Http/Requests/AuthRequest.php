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
        $route = $this->route()->getName(); // Usamos el nombre de la ruta para decidir qué validar

        if ($route === 'auth.register') {
            return [
                'name'     => 'required|string',
                'email'    => 'required|email|unique:users,email',
                'password' => 'required',
                'username' => 'required|string|unique:users,username',
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

    public function messages(): array
    {
        return [
            'name.required'     => 'El nombre es obligatorio.',
            'name.string'       => 'El nombre debe ser una cadena de texto.',
            'email.required'    => 'El correo electrónico es obligatorio.',
            'email.email'       => 'El correo electrónico no es válido.',
            'email.unique'      => 'Este correo ya está registrado.',
            'password.required' => 'La contraseña es obligatoria.',
            'username.required' => 'El nombre de usuario es obligatorio.',
            'username.string'   => 'El nombre de usuario debe ser una cadena de texto.',
            'username.unique'   => 'Este nombre de usuario ya está en uso.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => 'Errores de validación',
            'errors' => $validator->errors()
        ], 422));
    }
}
