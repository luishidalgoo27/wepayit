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
        Schema::create('divisiones_gastos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('gasto_id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('gasto_id')->references('id')->on('gastos');
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('cantidad_asignada');
            $table->enum('estado', ['pendiente', 'pagado', 'ajustado'])->default('pendiente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('division_gastos');
    }
};
