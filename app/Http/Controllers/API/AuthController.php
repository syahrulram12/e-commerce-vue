<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerResource;
use App\Http\Resources\UserResource;
use App\Models\Customer;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages(['email' => 'Invalid email or password']);
        }

        try {
            if (Auth::guard('api')->attempt($request->only('email', 'password'))) {
                $user = Auth::guard('api')->user();
                $user->token = $user->createToken('cust-token')->plainTextToken;
                return response()->json(new CustomerResource($user));
            } else {
                throw new Exception("Credentials not found", 1);
            }
        } catch (\Throwable $th) {
            throw ValidationException::withMessages(['email' => 'Invalid email or password']);
        }
    }

    public function register(Request $request)
    {

        $emailRules = 'unique:customers,email';
        $passwordRules = 'required|string|min:8';

        $validatedData = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'phone_number' => 'required|string|max:15',
            'gender' => 'required|string|max:10',
            'address' => 'required|string',
            'email' => $emailRules,
            'password' => $passwordRules,
        ]);

        if ($validatedData->fails()) {
            return response()->json(['errors' => $validatedData->errors()], 422);
        }

        $transaction = DB::transaction(function () use ($request) {
            $user = Customer::create([
                'name' => $request->name,
                'phone_number' => $request->phone_number,
                'address' => $request->address,
                'gender' => $request->gender,
                'birth_date' => $request->birth_date,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            return compact('user');
        });

        return response()->json(["message" => "success"]);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json(['message' => 'Successfully logged out'], 200);
    }

    public function getAuthUser(Request $request)
    {
        return response()->json(new UserResource($request->user()));
    }
}
