<?php

use Phalcon\Mvc\Controller;

class CityController extends Controller
{
    public function indexAction()
    {
        $postData = $this->request->getPost();

        $city = new City();

        $success = $city->save(
            $postData,
            ['name']
        );

        if ($success) {
            echo 'ok';
        } else {
            echo 'error: ';

            $messages = $city->getMessages();

            foreach ($messages as $message) {
                echo $message->getMessage() . "\n";
            }
        }

        $this->view->disable();
    }
}
