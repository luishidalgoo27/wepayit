<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GroupInvitationRequest extends FormRequest
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
            'group_id' => 'integer|exists:groups,id',
            'guest_email' => 'required|email|exists:users,email'
        ];
    }

    public function messages(): array
    {
        return [
            'group_id.exists' => 'El grupo seleccionado no existe.',
            'guest_user_id.exists' => 'El usuario que estás intentando invitar no existe.',
        ];
    }
}
