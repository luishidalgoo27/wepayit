<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExpensesRequest extends FormRequest
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
            'title'         => 'required|string|max:255',
            'amount'        => 'required|numeric|min:0',
            'currency_type' => 'required|string|max:10',
            'paid_by'       => 'required|exists:users,id',
            'group_id'      => 'required|exists:groups,id',
            'date'          => 'required|date',
            'description'   => 'nullable|string',
            'category'      => 'nullable|string|max:255',
            'receipt_url'   => 'nullable|url',
            'state'         => 'nullable|string|max:100',
            'recurrent'     => 'boolean',
            'frecuency'     => 'nullable|string|max:50',
        ];
    }
}
