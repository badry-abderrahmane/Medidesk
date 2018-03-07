<?php

namespace App\Listeners;

use App\Events\ClientAdded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ClientListener
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
     * @param  eventNotification  $event
     * @return void
     */
    public function handle(ClientAdded $event)
    {
        //
    }
}
