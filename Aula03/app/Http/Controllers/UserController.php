<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateRequest;
use App\Models\User;
use Illuminate\Http\Request;

/**
 * Class UserController
 *
 * @package App\Http\Controllers
 * @author Vinícius Sarmento
 * @link https://github.com/ViniciusSCS
 * @date 2024-08-23 21:48:54
 * @copyright UniEVANGÉLICA
 
 * Atualizado por TheGodwin ~Tmj bro~
 * 
 */
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::select('id', 'name', 'email')->paginate('2');

        return [
            'status' => 200,
            'menssagem' => 'Usuários encontrados!!',
            'user' => $user
        ];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserCreateRequest $request)
    {
        $data = $request->all();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        return [
            'status' => 200,
            'menssagem' => 'Usuário cadastrado com sucesso!!',
            'user' => $user
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $checkData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email,' . $id,
        ]);

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 404,
                'mensagem' => 'Usuário não encontrado. Deu ruim :('
            ], 404);
        }

        $user->update($checkData);

        return [
            'status' => 200,
            'mensagem' => 'Usuário atualizado com sucesso!',
            'user' => $user
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 404,
                'mensagem' => 'Usuário não encontrado. Deu ruim :('
            ], 404);
        }

        $user->delete();

        return [
            'status' => 200,
            'mensagem' => 'Usuário deletado com sucesso!'
        ];
    }
}
