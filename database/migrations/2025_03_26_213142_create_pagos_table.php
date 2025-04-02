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
        Schema::create('pagos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('gasto_id');
            $table->unsignedBigInteger('payer_id');
            $table->foreign('gasto_id')->references('id')->on('gastos');
            $table->foreign('payer_id')->references('id')->on('users');
            $table->integer('cantidad');
            $table->string('metodo_pago');
            $table->date('fecha_pago');
            $table->enum('estado', ['pendiente', 'pagado', 'fallido'])->default('pendiente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pagos');
    }
};
