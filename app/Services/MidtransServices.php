<?php

namespace App\Services;

use App\Models\Order;
use Exception;
use Midtrans\Config;
use Midtrans\Notification;
use Midtrans\Snap;

class MidtransServices
{
    protected $serverKey;
    protected $isProduction;
    protected $isSanitized;
    protected $is3ds;

    public function __construct()
    {
        $this->serverKey = config();
        $this->isProduction = config();
        $this->isSanitized = config();
        $this->is3ds = config();


        Config::$serverKey = $this->serverKey;
        Config::$isProduction = $this->isProduction;
        Config::$isSanitized = $this->isSanitized;
        Config::$is3ds = $this->is3ds;
    }

    public function createSnapToken(Order $order)
    {
        // data transaksi
        $params = [
            'transaction_details' => [
                'order_id' => $order->order_id,
                'gross_amount' => $order->total_price,
            ],
            'item_details' => $this->mapItemsToDetails($order),
            'customer_details' => $this->getCustomerDetails($order),
        ];

        try {
            // Membuat snap token
            return Snap::getSnapToken($params);
        } catch (Exception $e) {
            // Menangani error jika gagal mendapatkan snap token
            throw new Exception($e->getMessage());
        }
    }

    public function isSignatureKeyVerified(): bool
    {
        $notification = new Notification();

        // Membuat signature key lokal dari data notifikasi
        $localSignatureKey = hash(
            'sha512',
            $notification->order_id . $notification->status_code .
                $notification->gross_amount . $this->serverKey
        );

        // Memeriksa apakah signature key valid
        return $localSignatureKey === $notification->signature_key;
    }

    /**
     * Mendapatkan data order berdasarkan order_id yang ada di notifikasi Midtrans.
     *
     * @return Order Objek order yang sesuai dengan order_id yang diterima.
     */
    public function getOrder(): Order
    {
        $notification = new Notification();

        // Mengambil data order dari database berdasarkan order_id
        return Order::where('order_id', $notification->order_id)->first();
    }

    /**
     * Mendapatkan status transaksi berdasarkan status yang diterima dari notifikasi Midtrans.
     *
     * @return string Status transaksi ('success', 'pending', 'expire', 'cancel', 'failed').
     */

    /**
     * Memetakan item dalam order menjadi format yang dibutuhkan oleh Midtrans.
     *
     * @param Order $order Objek order yang berisi daftar item.
     * @return array Daftar item yang dipetakan dalam format yang sesuai.
     */
    protected function mapItemsToDetails(Order $order): array
    {
        $items =  $order->items()->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'price' => $item->price,
                'quantity' => $item->quantity,
                'name' => $item->product_name,
            ];
        })->toArray();

        $taxItem = [
            'id' => $order->items()->count() + 1,
            'price' => $order->total_tax,
            'quantity' => 1,
            'name' => 'Tax PPN 12%'

        ];


        return array_merge($items, $taxItem);
    }

    /**
     * Mendapatkan informasi customer dari order.
     * Data ini dapat diambil dari relasi dengan tabel lain seperti users atau tabel khusus customer.
     *
     * @param Order $order Objek order yang berisi informasi tentang customer.
     * @return array Data customer yang akan dikirim ke Midtrans.
     */
    protected function getCustomerDetails(Order $order): array
    {
        // Sesuaikan data customer dengan informasi yang dimiliki oleh aplikasi Anda
        return [
            'first_name' => 'Test Dulu', // Ganti dengan data nyata
            'email' => 'Test@gmail.com', // Ganti dengan data nyata
            'phone' => '088225720734', // Ganti dengan data nyata
        ];
    }
}
