<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Factory\TodoFactory;

class TodoFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        TodoFactory::createMany(7);
    }
}
