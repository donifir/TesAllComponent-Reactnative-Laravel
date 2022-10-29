<?php

namespace Database\Seeders;

use App\Models\Suplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SuplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Suplier::create([
            'nama_suplier' => 'Test User',
            'alamat_suplier' => 'test@example.com',
            'telp_suplier' => '081111',
        ]);
    }
}
