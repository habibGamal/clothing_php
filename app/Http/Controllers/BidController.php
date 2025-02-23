<?php

namespace App\Http\Controllers;

use App\Enums\ProductType;
use App\Models\Product;
use App\Models\Bid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;

class BidController extends Controller
{
    public function store(Request $request, Product $product)
    {
        if ($product->user_id === auth()->id()) {
            return back()->with('error', 'لا يمكنك المزايدة على منتجك');
        }

        if ($product->type !== ProductType::BID) {
            return back()->with('error', 'هذا المنتج غير متاح للمزايدة');
        }

        if ($product->end_date && now()->isAfter($product->end_date)) {
            return back()->with('error', 'انتهى وقت المزايدة على هذا المنتج');
        }

        $request->validate([
            'amount' => [
                'required',
                'numeric',
                'min:' . ($product->current_bid ? $product->current_bid + 10 : 50),
            ],
        ], [
            'amount.min' => 'يجب أن تكون المزايدة أكبر من السعر الحالي بـ 10 ريال على الأقل'
        ]);

        try {
            DB::transaction(function () use ($request, $product) {
                Bid::create([
                    'user_id' => auth()->id(),
                    'product_id' => $product->id,
                    'amount' => $request->amount,
                ]);

                $product->update([
                    'current_bid' => $request->amount
                ]);
            });

            return back()->with('success', 'تمت المزايدة بنجاح');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء المزايدة، الرجاء المحاولة مرة أخرى');
        }
    }

    public function participate(Product $product)
    {
        if ($product->user_id === auth()->id()) {
            return back()->with('error', 'لا يمكنك المشاركة في منتجك');
        }

        if ($product->type !== ProductType::GIVEAWAY) {
            return back()->with('error', 'هذا المنتج ليس هدية');
        }

        try {
            $product->participants()->attach(auth()->id());
            return back()->with('success', 'تمت المشاركة في السحب بنجاح');
        } catch (\Exception $e) {
            if ($e instanceof \Illuminate\Database\QueryException && $e->errorInfo[1] === 1062) {
                return back()->with('error', 'أنت مشارك بالفعل في هذا السحب');
            }
            return back()->with('error', 'حدث خطأ أثناء المشاركة، الرجاء المحاولة مرة أخرى');
        }
    }

    public function cancelParticipation(Product $product)
    {
        if ($product->type !== ProductType::GIVEAWAY) {
            return back()->with('error', 'هذا المنتج ليس مخصص للسحب');
        }

        try {
            $product->participants()->detach(auth()->id());
            return back()->with('success', 'تم إلغاء المشاركة بنجاح');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء إلغاء المشاركة، الرجاء المحاولة مرة أخرى');
        }
    }
}
