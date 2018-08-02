<?php
/**
 * @file
 * Implements nscn stats block
 */

namespace Drupal\nscn_stats\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides nscn stats content.
 *
 * @Block(
 *   id = "nscn_stats",
 *   admin_label = @Translation("NSCN Stats"),
 * )
 */
class NscnStats extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return array(
      '#type' => 'markup',
      '#theme' => 'nscn_stats_block',
    );
  }
}
