<?php

use Phalcon\Mvc\Controller;

class WeatherController extends Controller
{
    public function indexAction()
    {
        $this->assets->addJs('js/weather.js');
        $this->assets->addJs('https://maps.googleapis.com/maps/api/js?key=AIzaSyCjek_Tw3C7tQHJr5hDzlC9gCASadf_b_c&libraries=places&callback=initGoogleAdress', false);
    }
}
