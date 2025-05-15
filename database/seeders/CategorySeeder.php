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
            'Comida',
            'Supermercado',
            'Alquiler',
            'Transporte',
            'Viajes',
            'Entretenimiento',
            'Cine',
            'Compras',
            'Regalos',
            'Salud',
            'Educación',
            'Servicios públicos',
            'Teléfono e Internet',
            'Mascotas',
            'Eventos',
            'Fiestas',
            'Hogar',
            'Reparaciones',
            'Impuestos',
            'Otros'
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'type' => $category
            ]);
        }
    }
}
