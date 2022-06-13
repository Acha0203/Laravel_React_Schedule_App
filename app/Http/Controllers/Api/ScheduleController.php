<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function scheduleindex(Request $request)
    {
        $schedules = Schedule::all();

        return response()->json($schedules);
    }
}
