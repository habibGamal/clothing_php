<?php

namespace Database\Factories;

use App\Enums\ProductCondition;
use App\Enums\ProductType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    private array $unsplashPhotos = [
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
        'https://images.unsplash.com/photo-1578932750294-f5075e85f44a',
        'https://images.unsplash.com/photo-1671726805768-89c5c1b8d3a5',
        'https://images.unsplash.com/photo-1544441893-675973e31985',
        'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0',
        'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8',
        'https://images.unsplash.com/photo-1562157873-818bc0726f68',
        'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f',
        'https://images.unsplash.com/photo-1578587018452-892bacefd3f2',
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3',
        'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe',
        'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab'
    ];

    public function definition(): array
    {
        $type = $this->faker->randomElement([
            ProductType::BID->value,
            ProductType::GIVEAWAY->value
        ]);
        $isBid = $type === ProductType::BID->value;

        return [
            'user_id' => User::factory(),
            'title' => $this->faker->words(3, true),
            'image' => $this->faker->randomElement($this->unsplashPhotos) . '?auto=format&fit=crop&w=800&q=80',
            'price' => $isBid ? null : $this->faker->randomFloat(2, 50, 500),
            'size' => $this->faker->randomElement(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
            'brand' => $this->faker->randomElement(['زارا', 'H&M', 'نايك', 'أديداس', 'بوما']),
            'type' => $type,
            'condition' => $this->faker->randomElement([
                ProductCondition::EXCELLENT->value,
                ProductCondition::VERY_GOOD->value,
                ProductCondition::GOOD->value,
                ProductCondition::FAIR->value
            ]),
            'current_bid' => $isBid ? $this->faker->randomFloat(2, 50, 500) : null,
            'end_date' => $isBid ? $this->faker->dateTimeBetween('+1 day', '+30 days') : null,
            'description' => $this->faker->paragraph(),
        ];
    }
}
