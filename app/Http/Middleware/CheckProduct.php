<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Product;

class CheckProduct
{
    public function handle(Request $request, Closure $next)
    {
        $product = $request->route('product');

        // Check if product exists
        if (!$product) {
            return redirect()->back()->with('error', 'المنتج غير موجود');
        }

        // Check if the product is already sold/completed
        if ($product->winner_user_id !== null) {
            return redirect()->back()->with('error', 'هذا المنتج تم بيعه بالفعل');
        }

        // For bid products, check if auction has ended
        if ($product->type === 'bid' && $product->end_date && now()->isAfter($product->end_date)) {
            return redirect()->back()->with('error', 'انتهى وقت المزايدة على هذا المنتج');
        }

        // For giveaways, check if the draw is still active
        if ($product->type === 'giveaway' && $product->end_date && now()->isAfter($product->end_date)) {
            return redirect()->back()->with('error', 'انتهى وقت المشاركة في السحب');
        }

        return $next($request);
    }
}
