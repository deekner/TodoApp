<?php

namespace App\OptionsResolver;

use Symfony\Component\OptionsResolver\OptionsResolver;

class TodoOptionsResolver extends OptionsResolver
{
  public function configureTask(bool $isRequired = true): self
  {
    $this->setDefined("title")->setAllowedTypes("title", "string");

    if($isRequired) {
      $this->setRequired("title");
    }
    return $this;
  }

  public function configureDescription(bool $isRequired = true): self
  {
    $this->setDefined("description")->setAllowedTypes("description", "string");

    if($isRequired) {
      $this->setRequired("description");
    }

    return $this;
  }

  public function configureCompleted(bool $isRequired = true): self
  {
    $this->setDefined("completed")->setAllowedTypes("completed", "bool");

    if($isRequired) {
      $this->setRequired("completed");
    }

    return $this;
  }
}