<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('expense_id');
            $table->unsignedBigInteger('payer_id');
            $table->foreign('expense_id')->references('id')->on('expenses');
            $table->foreign('payer_id')->references('id')->on('users');
            $table->integer('amount');
            $table->string('payment_method');
            $table->date('payment_date');
            $table->enum('status', ['pending', 'paid','failed'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
