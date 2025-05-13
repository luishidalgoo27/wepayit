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
            'descripcion' => 'nullable|string|max:255',
            'photo' => 'string|max:255',
            'currency_type' => 'required|string',
            'description' => 'nullable|string|max:255'
            
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

            'description.nullable' => 'La descripción puede ser nula',
            'description.string' => 'El nombre de la descripción debe ser una cadena de texto.',
            'description.max' => 'El nombre de la descripción no puede tener más de 255 caracteres.',

            'photo.string'  => 'La foto debe ser una cadena de texto.',
            'photo.max'     => 'La foto no puede tener más de 255 caracteres.',

            'currency_type.required' => 'El tipo de moneda es obligatorio.',
            'currency_type.string'   => 'El tipo de moneda debe ser una cadena de texto.',
            
            'description.nullable' => 'La descripcion puede ser null',
            'description.string' => 'La descripcion debe ser una cadena de texto',
            'description.max' => 'La descripcion no puede pasar de los 255 caracteres'
        ];
    }

    
}
