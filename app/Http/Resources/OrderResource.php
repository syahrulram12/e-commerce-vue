<?php

namespace App\Http\Resources;

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
            'customer_data' => $this->has($this->customer, $this->customer()->select('id', 'name', 'email', 'phone')->first()),
            'status' => $this->status,
            'total' => $this->total,
            'items' => $this->items,
            'snap_token' => $this->snap_token,
            'created_at' => $this->created_at,
        ];
    }
}
