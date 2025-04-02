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
        Schema::create('balance_users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('balance_id');
            $table->unsignedBigInteger('deudor_id');
            $table->unsignedBigInteger('creditor_id');
            $table->foreign('balance_id')->references('id')->on('balances');
            $table->foreign('deudor_id')->references('id')->on('users');
            $table->foreign('creditor_id')->references('id')->on('users');
            $table->integer('cantidad');
            $table->enum('estado', ['pendiente', 'pagado'])->default('pendiente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('balance_users');
    }
};
