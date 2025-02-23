<?php

namespace App\Console\Commands;

use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ProcessExpiredProducts extends Command
{
    protected $signature = 'products:process-expired';
    protected $description = 'Process expired bids and select giveaway winners';

    public function handle()
    {
        // Process expired bids
        $expiredBids = Product::where('type', 'bid')
            ->whereNotNull('end_date')
            ->where('end_date', '<=', now())
            ->whereNull('winner_user_id')
            ->with(['bids' => function($query) {
                $query->orderByDesc('amount')->with('user');
            }])
            ->get();

        foreach ($expiredBids as $product) {
            if ($product->bids->isNotEmpty()) {
                $winningBid = $product->bids->first();
                $product->update([
                    'winner_user_id' => $winningBid->user_id,
                    'final_price' => $winningBid->amount
                ]);
                $this->info("Bid winner selected for product {$product->id}: User {$winningBid->user_id}");
            }
        }

        // Process giveaways that haven't selected a winner
        $giveaways = Product::where('type', 'giveaway')
            ->whereNull('winner_user_id')
            ->has('participants')
            ->with('participants')
            ->get();

        foreach ($giveaways as $product) {
            $winner = $product->participants->random();
            $product->update([
                'winner_user_id' => $winner->id
            ]);
            $this->info("Giveaway winner selected for product {$product->id}: User {$winner->id}");
        }
    }
}
