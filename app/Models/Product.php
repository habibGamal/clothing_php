<?php

namespace App\Models;

use App\Enums\ProductCondition;
use App\Enums\ProductType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'image',
        'price',
        'size',
        'brand',
        'type',
        'condition',
        'current_bid',
        'end_date',
        'description',
        'winner_user_id',
        'final_price'
    ];

    protected $casts = [
        'type' => ProductType::class,
        'condition' => ProductCondition::class,
        'price' => 'decimal:2',
        'current_bid' => 'decimal:2',
        'final_price' => 'decimal:2',
        'end_date' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function winner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'winner_user_id');
    }

    public function bids(): HasMany
    {
        return $this->hasMany(Bid::class);
    }

    public function participants(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'product_participants');
    }
}
