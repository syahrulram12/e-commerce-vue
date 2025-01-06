<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'order_id',
        'customer_id',
        'order_number',
        'customer_name',
        'customer_phone_number',
        'transaction_details',
        'sub_total',
        'total_tax',
        'total_price',
        'status',
    ];
}
