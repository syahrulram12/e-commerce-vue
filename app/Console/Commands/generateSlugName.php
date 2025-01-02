<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class generateSlugName extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:generate-slug';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $products = Product::get();
        $categories = Category::get();
        foreach ($products as $key => $value) {
            $slug = $this->generateSlug($value->name);
            $value->slug = $slug;
            $value->save();
        }

        foreach ($categories as $key => $category) {
            $slug = $this->generateSlug($category->name);
            $category->slug = $slug;
            $category->save();
        }
        $this->info('Slug generated successfully');
        return 0;
    }

    public function generateSlug($name)
    {
        $slug = Str::slug($name);
        $count = Product::where('slug', $slug)->count();
        if ($count > 0) {
            $slug = $slug . '-' . $count;
        }
        return $slug;
    }
}
