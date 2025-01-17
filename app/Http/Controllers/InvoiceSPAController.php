<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceSPAController extends Controller
{
    const SPA_PATH = '/spa/order';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orderBy = request()->query('sortBy', 'id');
        $sortBy = request()->query('sortDesc') == 'true' ? 'desc' : 'asc';
        $perPage = request()->query('perPage', 10);
        return response()->json(Invoice::tableSearch()
            ->orderBy($orderBy, $sortBy)
            ->paginate($perPage)
            ->withQueryString()
            ->withPath(self::SPA_PATH));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Invoice  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Invoice $order)
    {
        return response()->json($order);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Invoice  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Invoice $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Invoice  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Invoice $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Invoice  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Invoice $order)
    {
        //
    }
}
