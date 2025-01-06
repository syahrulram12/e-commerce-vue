<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('order_id')->unsigned()->nullable();
            $table->bigInteger('customer_id')->unsigned()->nullable();
            $table->string('order_number', 255)->nullable();
            $table->string('customer_name', 255)->nullable();
            $table->string('customer_phone_number', 255)->nullable();
            $table->text('transaction_details')->nullable();
            $table->integer('sub_total')->unsigned()->nullable();
            $table->integer('total_tax')->unsigned()->nullable();
            $table->integer('total_price')->unsigned()->nullable();
            $table->string('status', 255)->nullable();
            $table->timestamps();

            $table->foreign('order_id')->references('id')->on('orders')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoices');
    }
}
