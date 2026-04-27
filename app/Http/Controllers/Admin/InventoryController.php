<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\StockMutation;
use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index()
    {
        $inventories = Inventory::with(['product', 'branch'])->get();
        return Inertia::render('Admin/Inventory/Index', [
            'inventories' => $inventories
        ]);
    }

    public function updateStock(Request $request, Inventory $inventory)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer',
            'type' => 'required|in:in,out',
            'notes' => 'nullable|string'
        ]);

        // Logic for updating stock based on type
        if ($validated['type'] === 'in') {
            $inventory->stock_quantity += $validated['quantity'];
        } else {
            $inventory->stock_quantity -= $validated['quantity'];
        }
        $inventory->save();

        // Create log mutation
        StockMutation::create([
            'inventory_id' => $inventory->id,
            'user_id' => auth()->id(),
            'type' => $validated['type'],
            'quantity' => $validated['quantity'],
            'notes' => $validated['notes']
        ]);

        return back()->with('success', 'Stok berhasil diperbarui.');
    }

    public function mutations()
    {
        $mutations = StockMutation::with(['inventory.product', 'inventory.branch', 'user'])
            ->latest()
            ->get();
            
        return Inertia::render('Admin/Inventory/Mutations', [
            'mutations' => $mutations
        ]);
    }
}
