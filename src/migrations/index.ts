import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260123_045304_add_tech_stack from './20260123_045304_add_tech_stack';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260123_045304_add_tech_stack.up,
    down: migration_20260123_045304_add_tech_stack.down,
    name: '20260123_045304_add_tech_stack'
  },
];
