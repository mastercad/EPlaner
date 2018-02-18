<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class IndexController extends Controller {

    public function index() {
        return $this->render('index.html.twig');
    }

    public function fabric() {
        return $this->render('fabric.html.twig');
    }

    public function jcanvas() {
        return $this->render('jcanvas.html.twig');
    }
}