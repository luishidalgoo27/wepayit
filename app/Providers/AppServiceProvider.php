<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if($this->app->environment('production')) {
            URL::forceScheme('https');
        }
        Schema::defaultStringLength(191);

        // Configurar logs para Vercel
            $this->app->make('config')->set('logging.channels.single', [
                'driver' => 'errorlog',
                'level' => env('LOG_LEVEL', 'debug'),
            ]);
            
            $this->app->make('config')->set('logging.default', 'single');
    }
}
