<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeletedRepliesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deleted_replies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('keyword')->nullable();
            $table->text('reply')->nullable();
            $table->string('match_type')->default('equal');
            $table->string('reply_type')->default('text');
            $table->string('api_key')->nullable();
            $table->timestamps();
        });

        Schema::table('replies', function (Blueprint $table) {
            $table->foreignId('device_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       

        Schema::dropIfExists('deleted_replies');
    }
}