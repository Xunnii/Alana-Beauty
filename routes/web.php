<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/katalog', [\App\Http\Controllers\FrontController::class, 'katalog'])->name('front.katalog');
Route::get('/trending', [\App\Http\Controllers\FrontController::class, 'trending'])->name('front.trending');
Route::get('/beauty-advisor', [\App\Http\Controllers\FrontController::class, 'advisor'])->name('front.advisor');


Route::get('/dashboard', function () {
    $totalProducts = \App\Models\Product::count();
    $totalBranches = \App\Models\Branch::count();
    $lowStockItems = \App\Models\Inventory::whereColumn('stock_quantity', '<=', 'min_stock_level')->count();
    $recentMutations = \App\Models\StockMutation::with(['inventory.product', 'inventory.branch', 'user'])
        ->latest()
        ->take(5)
        ->get();

    return Inertia::render('Dashboard', [
        'stats' => [
            'totalProducts' => $totalProducts,
            'totalBranches' => $totalBranches,
            'lowStockItems' => $lowStockItems,
        ],
        'recentMutations' => $recentMutations
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/products', [\App\Http\Controllers\Admin\ProductController::class, 'index'])->name('products.index');
        Route::get('/products/create', [\App\Http\Controllers\Admin\ProductController::class, 'create'])->name('products.create');
        Route::post('/products', [\App\Http\Controllers\Admin\ProductController::class, 'store'])->name('products.store');
        Route::post('/products/import', [\App\Http\Controllers\Admin\ProductController::class, 'import'])->name('products.import');
        Route::get('/products/template', [\App\Http\Controllers\Admin\ProductController::class, 'downloadTemplate'])->name('products.template');
        Route::get('/products/{product}/edit', [\App\Http\Controllers\Admin\ProductController::class, 'edit'])->name('products.edit');
        Route::put('/products/{product}', [\App\Http\Controllers\Admin\ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [\App\Http\Controllers\Admin\ProductController::class, 'destroy'])->name('products.destroy');

        Route::get('/inventory', [\App\Http\Controllers\Admin\InventoryController::class, 'index'])->name('inventory.index');
        Route::post('/inventory/{inventory}/update-stock', [\App\Http\Controllers\Admin\InventoryController::class, 'updateStock'])->name('inventory.update-stock');
        Route::get('/inventory/mutations', [\App\Http\Controllers\Admin\InventoryController::class, 'mutations'])->name('inventory.mutations');

        Route::resource('users', \App\Http\Controllers\Admin\UserController::class);
    });
});

require __DIR__.'/auth.php';
