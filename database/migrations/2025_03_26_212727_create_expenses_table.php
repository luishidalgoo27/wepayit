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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->float('amount');       
            $table->string('currency_type')->default('EUR');     
            $table->unsignedBigInteger('paid_by');
            $table->unsignedBigInteger('group_id');
            $table->date('date');   
            $table->text('description')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->enum('state', ['pending', 'closed'])->default('pending');
            $table->boolean('recurrent')->default(false);
            $table->string('frecuency')->nullable();
            $table->timestamps();

            $table->foreign('paid_by')->references('id')->on('users');
            $table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
