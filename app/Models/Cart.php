<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cart extends Model
{
    protected $fillable = [
        'customer_id',
        'customer_name',
        'sub_total',
        'total_tax',
        'total_price',
        'total',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'updated_at',
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d',
        'total_price' => 'integer',
    ];

    /**
     * Get all of the items for the Order
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class, 'cart_id');
    }

    public function scopeTableSearch($query)
    {
        $query->select('carts.*', 'customers.name as customer_name')->leftjoin('customers', 'customers.id', '=', 'carts.customer_id');

        if (!empty(request()->get('customer'))) {
            $query->where('customer_id', request()->get('customer'));
        }

        return $query;
    }
}
