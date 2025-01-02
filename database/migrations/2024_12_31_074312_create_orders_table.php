<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('customer_id')->nullable()->unsigned();
            $table->string('customer_name', 255)->nullable();
            $table->string('order_number', 100)->nullable();
            $table->integer('sub_total')->nullable()->unsigned();
            $table->integer('total_tax')->nullable()->unsigned();
            $table->integer('total_price')->nullable()->unsigned();
            $table->dateTime('order_create')->nullable();
            $table->dateTime('order_completed')->nullable();
            $table->string('status', 30)->nullable();
            $table->timestamps();

            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
