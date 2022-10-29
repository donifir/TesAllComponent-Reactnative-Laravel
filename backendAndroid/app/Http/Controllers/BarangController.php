<?php

namespace App\Http\Controllers;

use App\Http\Resources\BarangResource;
use App\Models\Barang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class BarangController extends Controller
{

    public function index()
    {
        //
        $barang = Barang::orderBy('id', 'desc')->get();
        $response = [
            'success' => true,
            'message' => 'data barang terbaru',
            'data' => BarangResource::collection($barang)
        ];
        return response()->json($response, Response::HTTP_OK);
    }


    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'nama_barang' => ['required'],
            'harga' => ['required', 'numeric'],
            'stok'  => ['required', 'numeric'],
            'keterangan' => ['required'],
            'gambar' => ['required'],
            'suplier_id' => ['required'],
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors(),
                'data' => ''
            ];
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $file = $request->file('gambar');
            $imageName = Str::random() . '-' . time() . '.' . $request->gambar->extension();
            $file->move(public_path('image'), $imageName);


            $barang = Barang::create([
                'nama_barang' => $request->nama_barang,
                'harga' => $request->harga,
                'stok' => $request->stok,
                'keterangan' => $request->keterangan,
                'suplier_id' => $request->suplier_id,
                'gambar' => $imageName,
                // 'gambar' => $request->gambar,
            ]);
            $response    = [
                'success' => true,
                'message' => 'Transaksi Berhasil',
                'data'    => new BarangResource($barang)
            ];
            return response()->json($response, Response::HTTP_OK);
        }
    }



    public function show($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
        $validator = Validator::make($request->all(), [
            'nama_barang' => ['required'],
            'harga' => ['required', 'numeric'],
            'stok'  => ['required', 'numeric'],
            'keterangan' => ['required'],
            'gambar' => ['required'],
            'suplier_id' => ['required'],
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors(),
                'data' => ''
            ];
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $file = $request->file('gambar');
            $imageName = Str::random() . '-' . time() . '.' . $request->gambar->extension();
            $file->move(public_path('image'), $imageName);

            $barang=Barang::find($id);
            $barang->update([
                'nama_barang' => $request->nama_barang,
                'harga' => $request->harga,
                'stok' => $request->stok,
                'keterangan' => $request->keterangan,
                'suplier_id' => $request->suplier_id,
                'gambar' => $imageName,
            ]);
            $response    = [
                'success' => true,
                'message' => 'Transaksi Berhasil',
                'data'    => new BarangResource($barang)
            ];
            return response()->json($response, Response::HTTP_OK);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $suplier = Barang::find($id)->delete();
        $response = [
            'success' => true,
            'message' => 'data berhasil dihapus',
            'data' => $suplier
        ];
        return response()->json($response, Response::HTTP_OK);
    }
}
