<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->integer('userId');
            $table->integer('categoryId');
            $table->string('name');
            $table->string('modelCode');
            $table->string('barcode');
            $table->string('brand');
            $table->integer('stok')->default(0);
            $table->text('text')->nullable();
            $table->string('image')->nullable();
            $table->double('buyingPrice')->nullable();
            $table->double('sellingPrice')->nullable();
            $table->double('taxPrice')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
