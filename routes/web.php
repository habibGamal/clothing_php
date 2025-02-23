<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\BidController;
use Inertia\Inertia;

Route::get('/', function () {
    return inertia()->render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Product routes
Route::middleware(['auth'])->group(function () {
    // Product listing and details
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

    Route::middleware(['product.owner'])->group(function () {
        Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
    });

    // User activity routes
    Route::get('/my-products', [ProductController::class, 'userProducts'])->name('user.products');
    Route::get('/my-bids', [ProductController::class, 'userBids'])->name('user.bids');
    Route::get('/my-favorites', [ProductController::class, 'userGiveaways'])->name('user.giveaways');

    // Bid and participation routes with product status check
    Route::middleware(['check.product'])->group(function () {
        Route::post('/products/{product}/bid', [BidController::class, 'store'])->name('products.bid');
        Route::post('/products/{product}/participate', [BidController::class, 'participate'])->name('products.participate');
        Route::delete('/products/{product}/participate', [BidController::class, 'cancelParticipation'])->name('products.cancel-participation');
    });

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/faq', function () {
    return Inertia::render('FAQ');
})->name('faq');

require __DIR__.'/auth.php';
