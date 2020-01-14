<?php

use Phalcon\Mvc\Model;

class City extends Model
{
    private $id;

    private $name;

    public function getName(): string
    {
        return $this->name;
    }

    public function getID(): int
    {
        return $this->id;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }
}
