<?php

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $categories = ['T-Shirt', 'Jaket', 'Kemeja', 'Celana Pendek', 'Celana Panjang', 'Celana Cargo'];
        DB::transaction(function () use ($categories) {
            try {
                // foreach ($categories as $key => $category) {
                //     factory(Category::class)->create(['name' => $category]);
                // }
                factory(Product::class, 30)->create();
            } catch (\Throwable $th) {
                Log::error($th->getMessage());
            }
        });
    }
}
