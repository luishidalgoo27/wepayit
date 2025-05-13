<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateAvatarRequest extends FormRequest
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
            'image' => 'nullable|file|image|mimes:jpg,jpeg,png,webp|max:2048',
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
            'image.image' => 'El archivo debe ser una imagen.',
            'image.file' => 'Solo se puede enviar un archivo de imagen.',
            'image.mimes' => 'Solo se permiten imágenes en formato JPG, JPEG, PNG o WEBP.',
            'image.max'   => 'La imagen no debe pesar más de 2MB.',

        ];
    }

}
