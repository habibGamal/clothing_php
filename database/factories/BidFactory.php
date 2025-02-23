<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class BidFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'product_id' => Product::factory()->state(['type' => 'bid']),
            'amount' => $this->faker->randomFloat(2, 50, 1000),
        ];
    }
}
