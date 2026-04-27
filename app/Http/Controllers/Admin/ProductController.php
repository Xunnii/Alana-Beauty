<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category', 'inventories.branch')->get();
        return Inertia::render('Admin/Products/Index', [
            'products' => $products
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'is_trending' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $validated['image'] = '/storage/' . $imagePath;
        }

        $product = Product::create($validated);

        // Auto create inventory records for all branches with 0 stock
        $branches = \App\Models\Branch::all();
        foreach ($branches as $branch) {
            \App\Models\Inventory::create([
                'product_id' => $product->id,
                'branch_id' => $branch->id,
                'stock_quantity' => 0,
                'min_stock_level' => 5 // default min stock
            ]);
        }

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil ditambahkan.');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:5120' // 5MB max
        ]);

        try {
            \Maatwebsite\Excel\Facades\Excel::import(new \App\Imports\ProductsImport, $request->file('file'));
            return redirect()->route('admin.products.index')->with('success', 'Produk berhasil diimpor dari Excel.');
        } catch (\Exception $e) {
            return redirect()->route('admin.products.index')->with('error', 'Gagal mengimpor data: ' . $e->getMessage());
        }
    }

    public function downloadTemplate()
    {
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="template_import_produk.csv"',
        ];

        $callback = function() {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['nama_produk', 'kategori', 'harga', 'deskripsi', 'viral']);
            fputcsv($file, ['Lipstik Matte Alana', 'Makeup', '55000', 'Lipstik tahan lama', 'Ya']);
            fputcsv($file, ['Serum Brightening 30ml', 'Skincare', '125000', 'Serum untuk mencerahkan', 'Tidak']);
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function edit(Product $product)
    {
        $categories = Category::all();
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'is_trending' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $validated['image'] = '/storage/' . $imagePath;
        }

        $product->update($validated);

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Product $product)
    {
        try {
            \Illuminate\Support\Facades\DB::transaction(function () use ($product) {
                // Manually delete related inventories and their mutations first just in case
                $product->inventories()->each(function($inventory) {
                    $inventory->mutations()->delete();
                    $inventory->delete();
                });
                $product->delete();
            });

            return redirect()->route('admin.products.index')->with('success', 'Produk berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->route('admin.products.index')->with('error', 'Gagal menghapus produk: ' . $e->getMessage());
        }
    }
}
