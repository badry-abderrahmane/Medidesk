<?php

namespace App\Listeners;

use App\Events\emailArrived;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendEmailNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  emailArrived  $event
     * @return void
     */
    public function handle(emailArrived $event)
    {
        //
    }
}
