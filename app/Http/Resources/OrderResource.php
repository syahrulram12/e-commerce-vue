<?php

namespace App\Http\Resources;

use App\Models\Customer;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'order_number' => $this->order_number,
            'customer_name' => $this->customer_name,
            'customer_data' => $this->when($this->customer, new CustomerResource($this->customer)),
            'sub_total' => $this->sub_total,
            'total_tax' => $this->total_tax,
            'total_price' => $this->total_price,
            'items' => $this->items,
            'snap_token' => $this->snap_token,
            'created_at' => $this->created_at,
        ];
    }
}
