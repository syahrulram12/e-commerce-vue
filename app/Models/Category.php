<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'status',
    ];


    public function scopeTableSearch($query)
    {

        $query->select('categories.*', 'categories.name as category_name');

        if (!empty(request()->get('search'))) {
            $query->where('name', request()->get('search'))
                ->orWhere('name', 'like', '%' . request()->get('search') . '%');
        }


        return $query;
    }
}
