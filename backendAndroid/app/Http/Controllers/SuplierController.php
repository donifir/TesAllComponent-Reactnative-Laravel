<?php

namespace App\Http\Controllers;

use App\Models\Suplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class SuplierController extends Controller
{

    public function index()
    {
        //
        $suplier = Suplier::orderBy('id', 'desc')->get();
        $response = [
            'success' => true,
            'message' => 'data suplier terbaru',
            'data' => $suplier
        ];
        return response()->json($response, Response::HTTP_OK);
    }



    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'nama_suplier' => 'required',
            'alamat_suplier' => 'required',
            'telp_suplier' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors(),
                'data' => null
            ];
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $suplier = Suplier::create([
                'nama_suplier' => $request->nama_suplier,
                'alamat_suplier' => $request->alamat_suplier,
                'telp_suplier' => $request->telp_suplier,
            ]);
            $response = [
                'success' => true,
                'message' => 'data berhasil ditambahkan',
                'data' => $suplier
            ];
            return response()->json($response, Response::HTTP_OK);
        }
    }

    public function show($id)
    {
        //
        $suplier = Suplier::find($id);
        $response = [
            'success' => true,
            'message' => 'data suplier',
            'data' => $suplier
        ];
        return response()->json($response, Response::HTTP_OK);
    }


    public function update(Request $request, $id)
    {
        //
        
        $validator = Validator::make($request->all(), [
            'nama_suplier' => 'required',
            'alamat_suplier' => 'required',
            'telp_suplier' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors(),
                'data' => null
            ];
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $suplier = Suplier::find($id);
            $suplier->update([
                'nama_suplier' => $request->nama_suplier,
                'alamat_suplier' => $request->alamat_suplier,
                'telp_suplier' => $request->telp_suplier,
            ]);
            $response = [
                'success' => true,
                'message' => 'data berhasil ditambahkan',
                'data' => $suplier
            ];
            return response()->json($response, Response::HTTP_OK);
        }
    }

    public function destroy($id)
    {
        //
        $suplier = Suplier::find($id)->delete();
        $response = [
            'success' => true,
            'message' => 'data berhasil dihapus',
            'data' => $suplier
        ];
        return response()->json($response, Response::HTTP_OK);
    }
}
