<?php
namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class IndexController extends AbstractController
{
    /**
     * @Route("/", name="index")
     *
     * @return void
     */
    public function index() {
        return $this->render('index.html.twig');
    }

    /**
     * @Route("/fabric", name="fabric")
     *
     * @return void
     */
    public function fabric() {
        return $this->render('fabric.html.twig');
    }

    /**
     * @Route("/jcanvas", name="jcanvas")
     *
     * @return void
     */
    public function jcanvas() {
        return $this->render('jcanvas.html.twig');
    }

    /**
     * @Route("/plane", name="plane")
     *
     * @return void
     */
    public function plane() {
        return $this->render('plane.html.twig');
    }
}