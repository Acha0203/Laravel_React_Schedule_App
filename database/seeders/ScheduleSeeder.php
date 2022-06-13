<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('schedules')->insert([
            'sch_date' => '2022-06-13',
            'sch_time' => '14:46:10',
            'sch_category' => 'テスト',
            'sch_contents' => 'テスト',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
