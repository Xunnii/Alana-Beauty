<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('branch')->where('id', '!=', auth()->id())->get();
        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        $branches = Branch::all();
        return Inertia::render('Admin/Users/Create', [
            'branches' => $branches
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:pengawas,kasir',
            'branch_id' => 'required_if:role,kasir|nullable|exists:branches,id',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'branch_id' => $validated['branch_id'],
        ]);

        return redirect()->route('admin.users.index')->with('success', 'Staf berhasil ditambahkan.');
    }

    public function edit(User $user)
    {
        $branches = Branch::all();
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'branches' => $branches
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'role' => 'required|in:owner,pengawas,kasir',
            'branch_id' => 'required_if:role,kasir|nullable|exists:branches,id',
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->role = $validated['role'];
        $user->branch_id = $validated['branch_id'];

        if ($request->filled('password')) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return redirect()->route('admin.users.index')->with('success', 'Data staf berhasil diperbarui.');
    }

    public function destroy(User $user)
    {
        if ($user->role === 'owner') {
            return back()->with('error', 'Tidak dapat menghapus akun Owner.');
        }

        $user->delete();
        return redirect()->route('admin.users.index')->with('success', 'Staf berhasil dihapus.');
    }
}
