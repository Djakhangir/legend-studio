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

import { hashArray, type Hashable } from '@finos/legend-shared';
import { V1_PositionedRectangle } from './geometry/V1_DSL_Diagram_PositionedRectangle.js';
import { DIAGRAM_HASH_STRUCTURE } from '../../../../../../../graph/DSL_Diagram_HashUtils.js';

export class V1_ClassView extends V1_PositionedRectangle implements Hashable {
  id!: string;
  class!: string;
  hideProperties?: boolean | undefined;
  hideTaggedValues?: boolean | undefined;
  hideStereotypes?: boolean | undefined;

  override get hashCode(): string {
    return hashArray([
      DIAGRAM_HASH_STRUCTURE.CLASS_VIEW,
      super.hashCode,
      this.id,
      this.class,
      this.hideProperties?.toString() ?? '',
      this.hideTaggedValues?.toString() ?? '',
      this.hideStereotypes?.toString() ?? '',
    ]);
  }
}
