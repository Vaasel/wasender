<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('replies', function (Blueprint $table) {
            // Drop the existing foreign key constraint if it exists
            if (Schema::hasTable('replies') && Schema::hasColumn('replies', 'device_id')) {
                $table->dropForeign(['device_id']);
            }

            // Add the new foreign key constraint with SET NULL on delete
            $table->foreign('device_id')
                ->references('id')
                ->on('devices')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('replies', function (Blueprint $table) {
            // Drop the foreign key constraint if it exists
            $table->dropForeign(['device_id']);

            // Add back the old foreign key constraint
            $table->foreign('device_id')
                ->references('id')
                ->on('devices');
        });
    }
};