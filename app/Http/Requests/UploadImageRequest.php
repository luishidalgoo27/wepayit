<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UploadImageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048'
        ];
    }

    public function messages(): array
    {
        return [
            'image.required' => 'La imagen es obligatoria.',
            'image.image' => 'El archivo debe ser una imagen válida.',
            'image.mimes' => 'Solo se permiten imágenes jpeg, png, jpg y webp.',
            'image.max' => 'La imagen no debe superar los 2MB.'
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
