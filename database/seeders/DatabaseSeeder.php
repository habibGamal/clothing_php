<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use App\Models\Bid;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create a default user
        User::create([
            'name' => env('DEFAULT_USER_NAME', 'John Doe'),
            'email' => env('DEFAULT_USER_EMAIL', 'admin@example.com'),
            'password' => bcrypt(env('DEFAULT_USER_PASSWORD', 'password')),
            'is_admin' => true,
        ]);
        // Create some users
        $users = User::factory(10)->create();

        // Create different types of products
        $bidProducts = Product::factory(15)->state(['type' => 'bid'])->create();
        $giveawayProducts = Product::factory(15)->state(['type' => 'giveaway'])->create();

        // Create bids for bid products
        $bidProducts->each(function ($product) use ($users) {
            Bid::factory(rand(3, 8))->create([
                'product_id' => $product->id,
                'user_id' => $users->random()->id,
            ]);
        });

        // Add participants to giveaway products
        $giveawayProducts->each(function ($product) use ($users) {
            $participants = $users->random(rand(3, 8));
            $product->participants()->attach($participants);
        });
    }
}
