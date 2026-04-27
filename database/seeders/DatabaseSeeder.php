<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Branch;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Buat cabang terlebih dahulu
        $branchRumbai = Branch::create([
            'name' => 'Rumbai',
            'location' => 'Jl. Yos Sudarso No. 123, Rumbai, Pekanbaru'
        ]);

        $branchAirDingin = Branch::create([
            'name' => 'Air Dingin',
            'location' => 'Jl. Air Dingin Raya No. 45, Bukit Raya, Pekanbaru'
        ]);

        // Buat Kategori
        $catSkincare = \App\Models\Category::create([
            'name' => 'Skincare',
            'description' => 'Produk perawatan kulit wajah dan tubuh.'
        ]);

        $catMakeup = \App\Models\Category::create([
            'name' => 'Makeup',
            'description' => 'Produk kosmetik dan riasan.'
        ]);

        // Buat user Owner
        User::create([
            'name' => 'Owner Alana Beauty',
            'email' => 'owner@alanabeauty.com',
            'password' => Hash::make('password123'),
            'role' => 'owner',
            // Owner bisa melihat semua cabang, jadi branch_id bisa null atau tidak mengikat
            'branch_id' => null, 
        ]);

        // Buat user Pengawas (Kak Rika)
        User::create([
            'name' => 'Kak Rika (Pengawas)',
            'email' => 'pengawas@alanabeauty.com',
            'password' => Hash::make('password123'),
            'role' => 'pengawas',
            'branch_id' => null, // Pengawas mungkin mengawasi kedua cabang
        ]);

        // Buat user Kasir Rumbai
        User::create([
            'name' => 'Kasir Rumbai',
            'email' => 'kasir.rumbai@alanabeauty.com',
            'password' => Hash::make('password123'),
            'role' => 'kasir',
            'branch_id' => $branchRumbai->id,
        ]);

        // Buat user Kasir Air Dingin
        User::create([
            'name' => 'Kasir Air Dingin',
            'email' => 'kasir.airdingin@alanabeauty.com',
            'password' => Hash::make('password123'),
            'role' => 'kasir',
            'branch_id' => $branchAirDingin->id,
        ]);
    }
}
