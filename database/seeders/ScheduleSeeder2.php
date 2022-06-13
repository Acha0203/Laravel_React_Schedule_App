<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScheduleSeeder2 extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('schedules')->insert([
            'sch_date' => '2022-06-14',
            'sch_time' => '17:46:10',
            'sch_category' => 'テスト2',
            'sch_contents' => 'テスト2',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
