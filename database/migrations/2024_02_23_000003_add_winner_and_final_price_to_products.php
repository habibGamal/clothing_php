<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('winner_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->decimal('final_price', 10, 2)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['winner_user_id']);
            $table->dropColumn(['winner_user_id', 'final_price']);
        });
    }
};
