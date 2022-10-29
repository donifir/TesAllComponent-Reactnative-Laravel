<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class Auth extends Controller
{
    ////
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|max:8',
            'confirm_password' => 'required|max:8|same:password',
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors(),
                'data' => null
            ];
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            // $token = $user->createToken($user->email . '_Token')->plainTextToken; //jika perlu
            $response = [
                'success' => true,
                'message' => "data added successfully",
                'data' => $user
            ];
            return response()->json($response, Response::HTTP_OK);
        }
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:191',
            'password' => 'required|min:8',
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => true,
                'message' => $validator->errors(),
                'data' => null
            ];
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $user = User::where('email', $request->email)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                $response = [
                    'status' => 401,
                    'message' => 'invalid credensial'
                ];
                return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
            } else {
                $token = $user->createToken($user->email . '_Token')->plainTextToken;
                $response = [
                    'username' => $user->name,
                    'token' => $token,
                    'message' => 'Login Succesfully',
                ];
                return response()->json($response, Response::HTTP_OK);
            }
        }
    }
    public function logout()
    {
        //
        auth()->user()->tokens()->delete();
        $response = [
            'message' => 'logged out Successfully'
        ];
        return response()->json($response, Response::HTTP_OK);
    }
}
