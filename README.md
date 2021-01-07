This is a composer based installer for the [Open Social distribution](http://www.drupal.org/project/social).

# Prerequisites

1. [Composer](https://getcomposer.org/download/)

It's just composer, isn't it awesome? :)

## Installation of Open Social

```
composer create-project goalgorilla/social_template:dev-master DIRECTORY --no-interaction
```

Composer will create a new directory called DIRECTORY. Inside you will find the html directory with the entire code base of [Open Social distribution](http://www.drupal.org/project/social). You should be able to install it like any other Drupal site. 

## Learn more about Composer for Drupal

Checkout this [presentation](https://docs.google.com/presentation/d/1gxcxT6o47xVrfsZ7ZSQKjBRT-gfE54A1Z9kjvvGHwCo/edit#slide=id.p) from @ModsUnraveled.


## Add settings.local.php
Add settings.local.php to web/sites/default

```
<?php
$databases['default']['default'] = array(
 'database' => 'db',
 'username' => 'db',
 'password' => 'db',
 'host' => 'mariadb',
 'port' => '',
 'driver' => 'mysql',
 'prefix' => '',
);
$settings['hash_salt'] = '';
// And memcached:
$conf['memcache_servers'] = array(
  (getenv('MEMCACHED_HOST') ?: 'memcached').':'.(getenv('MEMCACHED_PORT') ?: 11211) => 'default',
);
$settings['file_private_path'] = 'sites/default/files/private';
$settings['container_yamls'][] = DRUPAL_ROOT . 'sites/development.services.yml';
```

## Add env.local

Add domain to .env.local

