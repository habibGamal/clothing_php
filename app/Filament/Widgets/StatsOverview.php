<?php

namespace App\Filament\Widgets;

use App\Models\Bid;
use App\Models\Product;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('إجمالي المستخدمين', User::count())
                ->description('المستخدمين النشطين: ' . User::where('is_active', true)->count())
                ->color('success')
                ->icon('heroicon-o-users'),

            Stat::make('إجمالي المنتجات', Product::count())
                ->description('المزادات: ' . Product::where('type', 'auction')->count() . ' | الهدايا: ' . Product::where('type', 'giveaway')->count())
                ->color('warning')
                ->icon('heroicon-o-shopping-bag'),

            Stat::make('إجمالي المزايدات', Bid::count())
                ->description('متوسط المزايدات: ' . number_format(Bid::avg('amount') ?? 0, 2) . ' ريال')
                ->color('primary')
                ->icon('heroicon-o-currency-dollar'),

            Stat::make('المنتجات النشطة', Product::whereNotNull('end_date')->where('end_date', '>', now())->count())
                ->description('المزادات النشطة: ' . Product::where('type', 'auction')->whereNotNull('end_date')->where('end_date', '>', now())->count())
                ->color('info')
                ->icon('heroicon-o-clock'),
        ];
    }
}
