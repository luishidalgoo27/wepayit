<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class GroupUpdateRequest extends FormRequest
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
            'name' => 'string|nullable',
            'photo' => 'string|nullable',
            'currency_type' => 'string',
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
            'group_id.required' => 'El ID del grupo es obligatorio.',
            'group_id.exists'   => 'El grupo especificado no existe.',
            
            'name.string'       => 'El nombre debe ser una cadena de texto.',
            
            'photo.string'      => 'La foto debe ser una cadena de texto.',
            
            'description.nullable' => 'La descripcion puede ser null',
            'description.string' => 'La descripcion debe ser una cadena de texto',
            'description.max' => 'La descripcion no puede pasar de los 255 caracteres'
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
