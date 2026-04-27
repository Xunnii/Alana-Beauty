<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontController extends Controller
{
    public function katalog(Request $request)
    {
        $query = Product::with(['category', 'inventories.branch']);

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category_id', $request->category);
        }

        if ($request->has('search') && $request->search !== '') {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $products = $query->latest()->get();
        $categories = Category::all();

        return Inertia::render('Front/Katalog', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['category', 'search'])
        ]);
    }

    public function trending()
    {
        $products = Product::with(['category', 'inventories.branch'])
            ->where('is_trending', true)
            ->latest()
            ->get();

        return Inertia::render('Front/Trending', [
            'products' => $products
        ]);
    }

    public function advisor()
    {
        return Inertia::render('Front/BeautyAdvisor');
    }
}
