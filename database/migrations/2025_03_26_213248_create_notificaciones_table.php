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
        Schema::create('notificaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('usuarios')->cascadeOnDelete();
            $table->text('mensaje');
            $table->enum('tipo', ['recordatorio de pago', 'nuevo gasto']);
            $table->enum('importancia', ['baja', 'media', 'alta'])->default('media');
            $table->enum('estado', ['leído', 'no leído'])->default('no leído');
            $table->timestamp('fecha_envio')->default(now());
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notificacions');
    }
};
