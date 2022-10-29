<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BarangResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nama_barang' => $this->nama_barang,
            'harga' => $this->harga,
            'stok' => $this->stok,
            'keterangan' => $this->keterangan,
            'gambar' => $this->gambar,
            'suplier_id' => $this->suplier_id,
            'nama_suplier' => $this->suplier->nama_suplier,
            'alamat_suplier' => $this->suplier->alamat_suplier,
            'telp_suplier' => $this->suplier->telp_suplier,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
