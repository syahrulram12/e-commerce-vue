<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'customer_id',
        'customer_name',
        'order_number',
        'cart_id',
        'order_date',
        'sub_total',
        'total_tax',
        'total_price',
        'total',
        'status',
        'snap_token',
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

    protected $appends = [
        'last_updated_at'
    ];


    /**
     * Get the customer that owns the Order
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
    /**
     * Get all of the items for the Order
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }


    public function getLastUpdatedAtAttribute()
    {
        $latestDate = OrderHistory::where('order_id', $this->order_id)->orWhere('order_number', $this->orderNumber)->latest()->value('transaction_time');
        return $latestDate ?? $this->created_at;
    }

    public function scopeTableSearch($query)
    {
        $query->select('orders.*', 'customers.name as customer_name')->leftjoin('customers', 'customers.id', '=', 'orders.customer_id');

        if (!empty(request()->get('customer'))) {
            $query->where('customer_id', request()->get('customer'));
        }
        if (!empty(request()->get('q'))) {
            $query->where(function ($q) {
                $q->where('orders.name', request()->get('q'))
                    ->orWhere('orders.description', request()->get('q'))
                    ->orWhere('orders.about_product', request()->get('q'))
                    ->orWhere('orders.price', request()->get('q'))
                    ->orWhere('orders.name', 'like', '%' . request()->get('q') . '%');
            });
        }

        return $query;
    }

    public function scopeFindOrder($query, $orderId)
    {
        return $query->where('id', $orderId)->orWhere('order_number', $orderId);
    }
}
