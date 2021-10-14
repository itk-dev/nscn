<?php

/**
 * Add development service settings.
 */
if (file_exists(__DIR__ . '/services.local.yml')) {
  $settings['container_yamls'][] = __DIR__ . '/services.local.yml';
}

/**
 * Disable CSS and JS aggregation.
 */
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;

/**
 * Disable caching.
 */
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
$settings['cache']['bins']['page'] = 'cache.backend.null';

/**
 * Define database connection.
 */
$databases['default']['default'] = array(
  'database' => 'db',
  'username' => 'db',
  'password' => 'db',
  'host' => 'mariadb',
  'port' => '',
  'driver' => 'mysql',
  'prefix' => '',
);

/**
 * Set hash salt.
 */
$settings['hash_salt'] = '1234';

/**
 * Set private files path.
 */
$settings['file_private_path'] = '../private-files';

/**
 * Set trusted host pattern.
 */
$settings['trusted_host_patterns'] = [
  '^nscn\.local\.itkdev\.dk$',
];
