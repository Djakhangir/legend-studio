/**
 * Copyright (c) 2020-present, Goldman Sachs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { type Hashable, hashArray } from '@finos/legend-shared';
import { PERSISTENCE_HASH_STRUCTURE } from '../../../../../../../graph/DSL_Persistence_HashUtils.js';
import type { V1_ActionIndicatorFields } from './V1_DSL_Persistence_ActionIndicatorFields.js';
import type { V1_Partitioning } from './V1_DSL_Persistence_Partitioning.js';

export abstract class V1_DatasetType implements Hashable {
  abstract get hashCode(): string;
}

export class V1_Snapshot extends V1_DatasetType {
  partitioning!: V1_Partitioning;

  override get hashCode(): string {
    return hashArray([PERSISTENCE_HASH_STRUCTURE.SNAPSHOT, this.partitioning]);
  }
}

export class V1_Delta extends V1_DatasetType {
  actionIndicator!: V1_ActionIndicatorFields;

  override get hashCode(): string {
    return hashArray([PERSISTENCE_HASH_STRUCTURE.DELTA, this.actionIndicator]);
  }
}
