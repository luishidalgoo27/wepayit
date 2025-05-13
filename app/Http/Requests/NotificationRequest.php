<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class NotificationRequest extends FormRequest
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
            'group_id' => 'required|integer|exists:groups,id',
            'guest_email' => 'required|email|exists:users,email',
            'expense_id' => 'required|integer|exists:expenses,id'
        ];
    }

    public function messages(): array
    {
        return [
            'group_id.required' => 'El grupo es obligatorio.',
            'group_id.integer'  => 'El ID del grupo debe ser un número entero.',
            'group_id.exists'   => 'El grupo seleccionado no existe.',

            'guest_email.required' => 'El correo del invitado es obligatorio.',
            'guest_email.email'    => 'El correo del invitado debe ser un correo válido.',
            'guest_email.exists'   => 'No se encontró ningún usuario con ese correo.',

            'expense_id.required' => 'El gasto es obligatorio.',
            'expense_id.integer'  => 'El ID del gasto debe ser un número entero.',
            'expense_id.exists'   => 'El gasto seleccionado no existe.',
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
