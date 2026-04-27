<?php

namespace App\Imports;

use App\Models\Product;
use App\Models\Branch;
use App\Models\Inventory;
use App\Models\Category;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProductsImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        $branches = Branch::all();

        foreach ($rows as $row) {
            // Find or create category based on name
            $categoryName = $row['kategori'] ?? 'Lainnya';
            $category = Category::firstOrCreate(['name' => $categoryName]);

            // Create product
            $product = Product::create([
                'name' => $row['nama_produk'],
                'category_id' => $category->id,
                'price' => $row['harga'] ?? 0,
                'description' => $row['deskripsi'] ?? null,
                'is_trending' => strtolower($row['viral'] ?? '') === 'ya' ? true : false,
            ]);

            // Auto create inventory records for all branches with 0 stock
            foreach ($branches as $branch) {
                Inventory::create([
                    'product_id' => $product->id,
                    'branch_id' => $branch->id,
                    'stock_quantity' => 0,
                    'min_stock_level' => 5 // default min stock
                ]);
            }
        }
    }
}
