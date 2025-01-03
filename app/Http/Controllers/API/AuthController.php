<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken()->accessToken;
            return response()->json(['token' => $token], 200);
        } else {
            return response()->json(['errors' => 'Unauthorized'], 401);
        }
    }

    public function register(Request $request)
    {
        $emailRules = 'unique:users,email';
        $passwordRules = 'required|string|min:8';

        if (!empty($request->get('id'))) {
            $emailRules = ['email', Rule::unique('users')->ignore($request->get('id'))];
            $passwordRules = 'nullable|string|min:8';
        }
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'phone_number' => 'required|string|max:15',
            'gender' => 'required|string|max:10',
            'address' => 'required|string',
            'email' => $emailRules,
            'password' => $passwordRules,
        ]);

        $transaction = DB::transaction(function () use ($validatedData) {
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'is_admin' => false
            ]);


            if ($user->is_admin === false) {
                Customer::updateOrCreate(['user_id' => $user->id], [
                    'user_id' => $user->id,
                    'name' => $validatedData['name'],
                    'phone_number' => $validatedData['phone_number'],
                    'address' => $validatedData['address'],
                    'gender' => $validatedData['gender'],
                    'birth_date' => $validatedData['birth_date'],
                    'email' => $validatedData['email'],
                    'password' => $validatedData['password'],
                ]);
            }
            // Auth::login($user);

            return compact('user');
        });

        return response()->json(['user' => $transaction['user']]);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json(['message' => 'Successfully logged out'], 200);
    }
}
