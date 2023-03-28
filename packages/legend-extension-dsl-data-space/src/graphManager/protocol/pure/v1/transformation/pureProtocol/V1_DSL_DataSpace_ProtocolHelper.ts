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

import {
  createModelSchema,
  custom,
  deserialize,
  list,
  object,
  optional,
  primitive,
  serialize,
  SKIP,
} from 'serializr';
import {
  V1_stereotypePtrSchema,
  V1_taggedValueSchema,
  V1_packageableElementPointerDeserializerSchema,
} from '@finos/legend-graph';
import {
  type PlainObject,
  UnsupportedOperationError,
  usingConstantValueSchema,
  usingModelSchema,
  optionalCustomListWithSchema,
  customListWithSchema,
} from '@finos/legend-shared';
import {
  type V1_DataSpaceSupportInfo,
  V1_DataSpace,
  V1_DataSpaceExecutionContext,
  V1_DataSpaceSupportEmail,
  V1_DataSpaceSupportCombinedInfo,
  V1_DataSpaceExecutable,
  V1_DataSpaceDiagram,
} from '../../model/packageableElements/dataSpace/V1_DSL_DataSpace_DataSpace.js';

export const V1_DATA_SPACE_ELEMENT_PROTOCOL_TYPE = 'dataSpace';
const V1_DATA_SPACE_SUPPORT_EMAIL_TYPE = 'email';
const V1_DATA_SPACE_SUPPORT_COMBINED_INFO_TYPE = 'combined';

const V1_dataSpaceExecutionContextModelSchema = createModelSchema(
  V1_DataSpaceExecutionContext,
  {
    defaultRuntime: usingModelSchema(
      V1_packageableElementPointerDeserializerSchema,
    ),
    description: optional(primitive()),
    mapping: usingModelSchema(V1_packageableElementPointerDeserializerSchema),
    name: primitive(),
    title: optional(primitive()),
  },
);

const V1_dataSpaceSupportEmailModelSchema = createModelSchema(
  V1_DataSpaceSupportEmail,
  {
    _type: usingConstantValueSchema(V1_DATA_SPACE_SUPPORT_EMAIL_TYPE),
    address: primitive(),
    documentationUrl: optional(primitive()),
  },
);

const V1_dataSpaceSupportCombinedInfoModelSchema = createModelSchema(
  V1_DataSpaceSupportCombinedInfo,
  {
    _type: usingConstantValueSchema(V1_DATA_SPACE_SUPPORT_COMBINED_INFO_TYPE),
    emails: optional(list(primitive())),
    faqUrl: optional(primitive()),
    documentationUrl: optional(primitive()),
    supportUrl: optional(primitive()),
    website: optional(primitive()),
  },
);

const V1_serializeSupportInfo = (
  protocol: V1_DataSpaceSupportInfo | undefined,
): PlainObject<V1_DataSpaceSupportInfo> | typeof SKIP => {
  if (!protocol) {
    return SKIP;
  }
  if (protocol instanceof V1_DataSpaceSupportEmail) {
    return serialize(V1_dataSpaceSupportEmailModelSchema, protocol);
  } else if (protocol instanceof V1_DataSpaceSupportCombinedInfo) {
    return serialize(V1_dataSpaceSupportCombinedInfoModelSchema, protocol);
  }
  throw new UnsupportedOperationError(`Can't serialize support info`, protocol);
};

export const V1_deserializeSupportInfo = (
  json: PlainObject<V1_DataSpaceSupportInfo> | undefined,
): V1_DataSpaceSupportInfo | undefined => {
  if (!json) {
    return undefined;
  }
  switch (json._type) {
    case V1_DATA_SPACE_SUPPORT_EMAIL_TYPE:
      return deserialize(V1_dataSpaceSupportEmailModelSchema, json);
    case V1_DATA_SPACE_SUPPORT_COMBINED_INFO_TYPE:
      return deserialize(V1_dataSpaceSupportCombinedInfoModelSchema, json);
    default: {
      throw new UnsupportedOperationError(
        `Can't deserialize support info of type '${json._type}'`,
      );
    }
  }
};

const V1_dataSpaceExecutableModelSchema = createModelSchema(
  V1_DataSpaceExecutable,
  {
    description: optional(primitive()),
    executable: usingModelSchema(
      V1_packageableElementPointerDeserializerSchema,
    ),
    title: primitive(),
  },
);

const V1_dataSpaceDiagramModelSchema = createModelSchema(V1_DataSpaceDiagram, {
  description: optional(primitive()),
  diagram: usingModelSchema(V1_packageableElementPointerDeserializerSchema),
  title: primitive(),
});

export const V1_dataSpaceModelSchema = createModelSchema(V1_DataSpace, {
  _type: usingConstantValueSchema(V1_DATA_SPACE_ELEMENT_PROTOCOL_TYPE),
  defaultExecutionContext: primitive(),
  description: optional(primitive()),
  diagrams: list(object(V1_dataSpaceDiagramModelSchema)),
  elements: optionalCustomListWithSchema(
    V1_packageableElementPointerDeserializerSchema,
  ),
  executables: list(object(V1_dataSpaceExecutableModelSchema)),
  executionContexts: list(object(V1_dataSpaceExecutionContextModelSchema)),
  featuredDiagrams: optionalCustomListWithSchema(
    V1_packageableElementPointerDeserializerSchema,
  ),
  name: primitive(),
  package: primitive(),
  stereotypes: customListWithSchema(V1_stereotypePtrSchema, {
    INTERNAL__forceReturnEmptyInTest: true,
  }),
  supportInfo: custom(
    (val) => V1_serializeSupportInfo(val),
    (val) => V1_deserializeSupportInfo(val),
  ),
  taggedValues: customListWithSchema(V1_taggedValueSchema, {
    INTERNAL__forceReturnEmptyInTest: true,
  }),
  title: optional(primitive()),
});
