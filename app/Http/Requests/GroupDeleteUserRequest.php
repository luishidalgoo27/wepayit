<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GroupDeleteUserRequest extends FormRequest
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
            'user_id' => 'integer|exists:users,id'
        ];
    }

    public function messages(): array
    {
        return [
            'group_id.exists' => 'The selected group does not exists.',        
            'user_id.exists' => 'The selected user does not exists.'        
        ];
    }
}
