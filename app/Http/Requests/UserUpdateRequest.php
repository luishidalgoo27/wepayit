<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserUpdateRequest extends FormRequest
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
        $userId = $this->user()->id; // Si usas auth()->user()
        // O si tu ruta es /users/{user}, puedes usar: $this->route('user')->id

        return [
            'name' => 'string',
            'languague' => 'string',
            'username' => 'string|unique:users,username,' . $userId,
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
            'name.string'        => 'El nombre debe ser una cadena de texto.',
            'avatar.string'      => 'El avatar debe ser una cadena de texto.',
            'languague.string'   => 'El idioma debe ser una cadena de texto.',
            'username.string'   => 'El nombre de usuario debe ser una cadena de texto.',
            'username.unique'   => 'Este nombre de usuario ya está en uso.',
            'image.image' => 'El archivo debe ser una imagen.',
            'image.file' => 'Solo se puede enviar un archivo de imagen.',
            'image.mimes' => 'Solo se permiten imágenes en formato JPG, JPEG, PNG o WEBP.',
            'image.max'   => 'La imagen no debe pesar más de 2MB.',
        ];
    }
}
