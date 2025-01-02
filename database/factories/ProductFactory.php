<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Helpers\StrConversion;
use App\Models\Category;
use App\Models\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    $categories = Category::pluck('id')->toArray();
    $name = $faker->words(random_int(1, 3), true);
    return [
        'category_id' => $faker->randomElement($categories),
        'name' => $name,
        'slug' => StrConversion::toSlug($name),
        'description' => $faker->words(9, true),
        'about_product' => $faker->words(5, true),
        'status' => $faker->numberBetween(0, 1),
        'price' => $faker->randomFloat(2, 100000, 400000),
    ];
});
