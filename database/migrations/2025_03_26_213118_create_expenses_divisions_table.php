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
        Schema::create('expenses_divisions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('expense_id');
            $table->unsignedBigInteger('user_id')->references('id')->on('users');
            $table->foreign('expense_id')->references('id')->on('expenses')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users');
            $table->decimal('assigned_amount', 10, 2)->change();
            $table->enum('status', ['pending', 'paid'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses_divisions');
    }
};
