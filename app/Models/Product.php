<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

class Product extends Model
{
    use Notifiable;
    const IMAGE = 'product_image';
    const DIR_IMAGE = 'products';

    protected $fillable = [
        'category_id',
        'name',
        'product_images',
        'price',
        'about_product',
        'product_description',
        'status',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'updated_at',
    ];


    protected $appends = [
        'category_name',
        'image_link',
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d',
        'is_active' => 'boolean',
    ];


    /**
     * Get the order that owns the OrderItem
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'category_id');
    }

    public function productImages()
    {
        return $this->hasMany(ProductImage::class, 'product_id');
    }

    public function getCategoryNameAttribute()
    {
        return Category::find($this->category_id)->name ?? null;
    }

    public function scopeTableSearch($query)
    {

        $query->select('products.*', 'categories.name as category_name', 'categories.slug as category_slug')->leftjoin('categories', 'categories.id', '=', 'products.category_id');

        if (!empty(request()->get('category'))) {
            $query->where(function ($q) {
                $q->where('categories.slug', request()->get('category'))
                    ->orWhere('categories.slug', request()->get('category'));
            });
        }


        if (!empty(request()->get('slug'))) {
            $query->where('categories.slug', request()->get('slug'));
        }

        if (!empty(request()->get('q'))) {
            $query->where(function ($q) {
                $q->where('products.name', request()->get('q'))
                    ->orWhere('products.description', request()->get('q'))
                    ->orWhere('products.about_product', request()->get('q'))
                    ->orWhere('products.price', request()->get('q'))
                    ->orWhere('products.name', 'like', '%' . request()->get('q') . '%');
            });
        }

        return $query;
    }

    public function getImageLinkAttribute()
    {;
        return asset($this->product_images ? asset('storage/' . self::DIR_IMAGE . '/' . $this->product_images) : 'images/default-product.png');
    }
}
