<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Enums\ProductType;
use App\Enums\ProductCondition;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()->latest();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('brand', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if (auth()->check()) {
            $query->with(['bids' => function($query) {
                $query->where('user_id', auth()->id())
                    ->latest();
            }]);
        }

        $products = $query->get()
            ->map(function($product) {
                return array_merge($product->toArray(), [
                    'user_bid' => $product->bids->first()?->amount ?? null,
                    'is_owner' => auth()->check() && $product->user_id === auth()->id()
                ]);
            });

        return Inertia::render('ProductList', [
            'products' => $products,
            'filters' => $request->only(['search'])
        ]);
    }

    public function show(Product $product)
    {
        $userBid = null;
        $isOwner = false;

        if (auth()->check()) {
            $userBid = $product->bids()
                ->where('user_id', auth()->id())
                ->latest()
                ->first();
            $isOwner = $product->user_id === auth()->id();
        }

        return Inertia::render('SingleProduct', [
            'product' => array_merge($product->toArray(), [
                'user_bid' => $userBid?->amount,
                'is_owner' => $isOwner
            ])
        ]);
    }

    public function userProducts()
    {
        $products = Product::where('user_id', auth()->id())
            ->latest()
            ->get();

        $products = $products->map(function($product) {
            return array_merge($product->toArray(), [
                'is_owner' => true
            ]);
        });

        return Inertia::render('User/ProductList', [
            'title' => 'منتجاتي',
            'subtitle' => 'جميع المنتجات التي قمت بإضافتها',
            'products' => $products,
            'emptyMessage' => 'لم تقم بإضافة أي منتجات بعد'
        ]);
    }

    public function userBids()
    {
        $products = Product::whereHas('bids', function($query) {
            $query->where('user_id', auth()->id());
        })
        ->with(['bids' => function($query) {
            $query->where('user_id', auth()->id())
                ->latest();
        }])
        ->latest()
        ->get()
        ->map(function($product) {
            return array_merge($product->toArray(), [
                'user_bid' => $product->bids->first()?->amount
            ]);
        });

        return Inertia::render('MyBids', [
            'products' => $products,
        ]);
    }

    public function userGiveaways()
    {
        $products = Product::where('type', 'giveaway')
            ->whereHas('participants', function($query) {
                $query->where('user_id', auth()->id());
            })->latest()->get();

        return Inertia::render('MyFavorites', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        return Inertia::render('CreateProduct');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required_if:type,'.ProductType::BID->value.'|numeric|min:0',
            'size' => 'required|string|max:50',
            'brand' => 'required|string|max:100',
            'type' => 'required|in:'.implode(',', array_column(ProductType::cases(), 'value')),
            'condition' => 'required|in:'.implode(',', array_column(ProductCondition::cases(), 'value')),
            'end_date' => 'required|date|after:now',
            'image' => 'required|image|max:2048',
        ], [
            'title.required' => 'عنوان المنتج مطلوب',
            'description.required' => 'وصف المنتج مطلوب',
            'price.required_if' => 'السعر مطلوب للمزادات',
            'size.required' => 'المقاس مطلوب',
            'brand.required' => 'الماركة مطلوبة',
            'type.required' => 'نوع العرض مطلوب',
            'condition.required' => 'حالة المنتج مطلوبة',
            'end_date.required' => 'تاريخ الانتهاء مطلوب',
            'end_date.after' => 'يجب أن يكون تاريخ الانتهاء بعد الوقت الحالي',
            'image.required' => 'صورة المنتج مطلوبة',
            'image.image' => 'الملف المرفق يجب أن يكون صورة',
            'image.max' => 'حجم الصورة يجب أن لا يتجاوز 2 ميجابايت',
        ]);

        $imagePath = '/storage\/' . $request->file('image')->store('products', 'public');

        $product = Product::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->type === ProductType::BID->value ? $request->price : 0,
            'size' => $request->size,
            'brand' => $request->brand,
            'type' => $request->type,
            'condition' => $request->condition,
            'end_date' => $request->end_date,
            'image' => $imagePath,
        ]);

        return redirect()->route('products.show', $product)
            ->with('success', 'تم إضافة المنتج بنجاح');
    }

    public function edit(Product $product)
    {
        if ($product->user_id !== auth()->id()) {
            return redirect()->back()->with('error', 'لا يمكنك تعديل هذا المنتج');
        }

        return Inertia::render('EditProduct', [
            'product' => $product
        ]);
    }

    public function update(Request $request, Product $product)
    {
        if ($product->user_id !== auth()->id()) {
            return redirect()->back()->with('error', 'لا يمكنك تعديل هذا المنتج');
        }

        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'size' => 'required|string|max:50',
            'brand' => 'required|string|max:100',
            'type' => 'required|in:'.implode(',', array_column(ProductType::cases(), 'value')),
            'condition' => 'required|in:'.implode(',', array_column(ProductCondition::cases(), 'value')),
            'end_date' => 'required|date|after:now',
            'image' => 'nullable|image|max:2048',
        ];

        // Add price validation for bid type products
        if ($request->type === ProductType::BID->value) {
            $rules['price'] = 'required|numeric|min:0';

            // If product has bids, don't allow lowering the price below current_bid
            if ($product->current_bid) {
                $rules['price'] .= '|min:'.$product->current_bid;
            }
        }

        $validatedData = $request->validate($rules, [
            'title.required' => 'عنوان المنتج مطلوب',
            'description.required' => 'وصف المنتج مطلوب',
            'price.required' => 'السعر مطلوب للمزادات',
            'price.min' => $product->current_bid ? 'لا يمكن تحديد سعر أقل من المزايدة الحالية' : 'السعر يجب أن يكون أكبر من 0',
            'size.required' => 'المقاس مطلوب',
            'brand.required' => 'الماركة مطلوبة',
            'type.required' => 'نوع العرض مطلوب',
            'condition.required' => 'حالة المنتج مطلوبة',
            'end_date.required' => 'تاريخ الانتهاء مطلوب',
            'end_date.after' => 'يجب أن يكون تاريخ الانتهاء بعد الوقت الحالي',
            'image.image' => 'الملف المرفق يجب أن يكون صورة',
            'image.max' => 'حجم الصورة يجب أن لا يتجاوز 2 ميجابايت',
        ]);

        if ($request->hasFile('image')) {
            $validatedData['image'] = '/storage/' . $request->file('image')->store('products', 'public');
        }

        // Set price to 0 for giveaway products
        if ($validatedData['type'] === ProductType::GIVEAWAY->value) {
            $validatedData['price'] = 0;
            $validatedData['current_bid'] = null;
        }

        $product->update($validatedData);

        return redirect()->back()->with('success', 'تم تحديث المنتج بنجاح');
    }

    public function destroy(Product $product)
    {
        if ($product->user_id !== auth()->id()) {
            return redirect()->back()->with('error', 'لا يمكنك حذف هذا المنتج');
        }

        // Delete the product
        $product->delete();

        return redirect()->route('user.products')
            ->with('success', 'تم حذف المنتج بنجاح');
    }
}
