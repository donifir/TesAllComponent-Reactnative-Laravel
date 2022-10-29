<?php

namespace Database\Seeders;

use App\Models\Barang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Barang::create([
            'nama_barang' => 'Sandal test',
            'suplier_id'=>1,
            'harga' => 100000,
            'stok' => 100,
            'keterangan' => 'haha ini adalah keterangan',
            'gambar' => 'keterangan.jpg',
        ]);
    }
}
