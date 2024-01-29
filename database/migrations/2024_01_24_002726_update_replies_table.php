<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('replies', function (Blueprint $table) {
            // Drop the existing foreign key constraint if it exists
            if (Schema::hasTable('replies') && Schema::hasColumn('replies', 'device_id')) {
                $table->dropForeign(['device_id']);
            }

            // Modify the column to be nullable
            $table->unsignedBigInteger('device_id')->nullable()->change();

            // Add the new foreign key constraint
            $table->foreign('device_id')
                ->references('id')
                ->on('devices')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('replies', function (Blueprint $table) {
            // Drop the existing foreign key constraint if it exists
            if (Schema::hasTable('replies') && Schema::hasColumn('replies', 'device_id')) {
                $table->dropForeign(['device_id']);
            }

            // Modify the column to be non-nullable
            $table->unsignedBigInteger('device_id')->nullable(false)->change();

            // Add back the old foreign key constraint with CASCADE on delete
            $table->foreign('device_id')
                ->references('id')
                ->on('devices')
                ->onDelete('cascade');
        });
    }
   
};
