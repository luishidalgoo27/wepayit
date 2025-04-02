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
        Schema::create('solicitudes_pagos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('solicitante_id');
            $table->unsignedBigInteger('destinatario_id');
            $table->foreign('solicitante_id')->references('id')->on('users');
            $table->foreign('destinatario_id')->references('id')->on('users');
            $table->integer('cantidad_solicitada'); 
            $table->text('motivo');
            $table->enum('estado', ['pendiente', 'aceptado', 'rechazado']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitudes_pagos');
    }
};
