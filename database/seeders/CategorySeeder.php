<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['type' => 'Comida', 'emoji' => '🍽️'],
            ['type' => 'Supermercado', 'emoji' => '🛒'],
            ['type' => 'Alquiler', 'emoji' => '🏠'],
            ['type' => 'Transporte', 'emoji' => '🚌'],
            ['type' => 'Viajes', 'emoji' => '✈️'],
            ['type' => 'Entretenimiento', 'emoji' => '🎮'],
            ['type' => 'Cine', 'emoji' => '🎬'],
            ['type' => 'Compras', 'emoji' => '🛍️'],
            ['type' => 'Regalos', 'emoji' => '🎁'],
            ['type' => 'Salud', 'emoji' => '💊'],
            ['type' => 'Educación', 'emoji' => '📚'],
            ['type' => 'Servicios públicos', 'emoji' => '💡'],
            ['type' => 'Teléfono e Internet', 'emoji' => '📱'],
            ['type' => 'Mascotas', 'emoji' => '🐶'],
            ['type' => 'Eventos', 'emoji' => '📅'],
            ['type' => 'Fiestas', 'emoji' => '🥳'],
            ['type' => 'Hogar', 'emoji' => '🛋️'],
            ['type' => 'Reparaciones', 'emoji' => '🛠️'],
            ['type' => 'Impuestos', 'emoji' => '💸'],
            ['type' => 'Otros', 'emoji' => '🔖'],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert($category);
        }
    }
}
