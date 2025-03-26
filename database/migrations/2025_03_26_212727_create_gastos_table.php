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
        Schema::create('gastos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->decimal('cantidad', 10, 2);
            $table->string('tipo_moneda')->default('EUR');
            $table->unsignedBigInteger('pagado_por');
            $table->unsignedBigInteger('solicitado_por');
            $table->unsignedBigInteger('group_id');
            $table->date('fecha');
            $table->text('descripcion')->nullable();
            $table->string('categoria')->nullable();
            $table->string('url_recibo')->nullable();
            $table->enum('estado', ['pendiente', 'cerrado'])->default('pendiente');
            $table->boolean('recurrente')->default(false);
            $table->string('frecuencia')->nullable(); 
            $table->timestamps();

            $table->foreign('pagado_por')->references('id')->on('users');
            $table->foreign('solicitado_por')->references('id')->on('users');
            $table->foreign('group_id')->references('id')->on('grupos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gastos');
    }
};
