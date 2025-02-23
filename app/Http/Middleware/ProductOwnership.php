<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProductOwnership
{
    public function handle(Request $request, Closure $next): Response
    {
        $product = $request->route('product');

        if (!$product || $product->user_id !== auth()->id()) {
            return redirect()->back()->with('error', 'لا يمكنك تعديل هذا المنتج');
        }

        return $next($request);
    }
}
