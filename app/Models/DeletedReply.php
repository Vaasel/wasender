<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeletedReply extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', // Add 'user_id' to the fillable fields
        // Other fillable fields...
    ];
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
