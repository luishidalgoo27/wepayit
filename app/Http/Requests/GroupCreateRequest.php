<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class GroupCreateRequest extends FormRequest
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
            'name' => 'required|string|max:50',
            'photo' => 'string|max:255',
            'coin' => 'required|string'
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
            'name.required' => 'El nombre del grupo es obligatorio.',
            'name.string'   => 'El nombre del grupo debe ser una cadena de texto.',
            'name.max'      => 'El nombre del grupo no puede tener más de 50 caracteres.',

            'photo.string'  => 'La foto debe ser una cadena de texto.',
            'photo.max'     => 'La foto no puede tener más de 255 caracteres.',

            'coin.required' => 'El tipo de moneda es obligatorio.',
            'coin.string'   => 'El tipo de moneda debe ser una cadena de texto.',
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
