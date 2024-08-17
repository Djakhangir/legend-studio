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

import { action, computed, makeObservable, observable } from 'mobx';
import {
  type EditorStore,
  ElementEditorState,
} from '@finos/legend-application-studio';
import {
  PackageableElementExplicitReference,
  type PackageableElement,
} from '@finos/legend-graph';
import {
  DataSpace,
<<<<<<< HEAD
=======
  DataSpaceDiagram,
>>>>>>> elements finished
  DataSpaceExecutionContext,
  DataSpaceSupportEmail,
<<<<<<< HEAD
  observe_DataSpaceExecutionContext,
<<<<<<< HEAD
=======
  observe_DataSpaceDiagram,
=======
>>>>>>> styling WIP, form created
  type DataSpaceElementPointer,
  observe_DataSpaceElementPointer,
  type DataSpaceExecutable,
  observe_DataSpaceSupportInfo,
  DataSpacePackageableElementExecutable,
} from '@finos/legend-extension-dsl-data-space/graph';
import { guaranteeType } from '@finos/legend-shared';
import {
  add_dataSpaceExecutable,
  addDataSpaceDiagram,
  dataSpace_addExecutionContext,
  remove_dataSpaceExecutable,
  removeDataSpaceDiagram,
  set_dataSpaceElements,
  setElementExclude,
} from './studio/DSL_DataSpace_GraphModifierHelper.js';
import { Diagram } from '@finos/legend-extension-dsl-diagram/graph';

export enum SUPPORT_INFO_TYPE {
  EMAIL = 'Email',
  COMBINED_INFO = 'CombinedInfo',
}

export enum DATASPACE_TAB {
  GENERAL = 'GENERAL',
  EXECUTION_CONTEXT = 'EXECUTION_CONTEXT',
<<<<<<< HEAD
=======
  DIAGRAM = 'DIAGRAM',
  ELEMENTS = 'ELEMENTS',
  EXECUTABLES = 'EXECUTABLES',
>>>>>>> elements and executable finished
}
export class DataSpaceEditorState extends ElementEditorState {
  selectedSupportInfoType: SUPPORT_INFO_TYPE;
  selectedTab: DATASPACE_TAB = DATASPACE_TAB.GENERAL;
<<<<<<< HEAD
  selectedExecutionContext?: DataSpaceExecutionContext;
  newExecutionContextName = '';
  selectedMapping: PackageableElementReference<Mapping> | null = null;
  selectedRuntime: PackageableElementReference<PackageableRuntime> | null =
    null;
=======
  selectedExecutionContext?: DataSpaceExecutionContext | null = null;
  diagrams: DataSpaceDiagram[] = [];
<<<<<<< HEAD
  selectedDiagram?: DataSpaceDiagram;
<<<<<<< HEAD
>>>>>>> executionContext is finished
=======
=======
  selectedDiagram?: DataSpaceDiagram | null = null;
>>>>>>> elements finished
  elements: DataSpaceElementPointer[] = [];
  selectedElementPointer?: DataSpaceElementPointer;
  executables: DataSpaceExecutable[] = [];
  selectedExecutable: DataSpaceExecutable | null = null;

  constructor(editorStore: EditorStore, element: PackageableElement) {
    super(editorStore, element);

    makeObservable(this, {
      dataSpace: computed,
      selectedSupportInfoType: observable,
      selectedTab: observable,
<<<<<<< HEAD
      selectedExecutionContext: observable,
<<<<<<< HEAD
<<<<<<< HEAD
      newExecutionContextName: observable,
      selectedMapping: observable,
      selectedRuntime: observable,
=======
      selectedDiagram: observable,
=======
      // selectedDiagram: observable,
>>>>>>> elements finished
=======
>>>>>>> clean up
      elements: observable,
      executables: observable,
      selectedElementPointer: observable,
      setDiagrams: action,
<<<<<<< HEAD
      selectDiagram: action,
>>>>>>> executionContext is finished
=======
      setSelectedDiagram: action,
      addDiagram: action,
      removeDiagram: action,
>>>>>>> elements finished
      setSelectedSupportInfoType: action,
      setSelectedTab: action,
      setSelectedExecutionContext: action,
      setDefaultExecutionContext: action,
<<<<<<< HEAD
<<<<<<< HEAD
      setNewExecutionContextName: action,
      setSelectedMapping: action,
      setSelectedRuntime: action,
      addExecutionContext: action,
=======
>>>>>>> executionContext is finished
=======
      setElements: action,
      selectElementPointer: action,
      setSelectedElementPointer: action,
      setExecutables: action,
      selectedExecutable: observable,
      setSelectedExecutable: action,
      reprocess: action,
    });

    if (!this.dataSpace.supportInfo) {
      this.dataSpace.supportInfo = new DataSpaceSupportEmail();
      observe_DataSpaceSupportInfo(this.dataSpace.supportInfo);
    }
    this.selectedSupportInfoType = SUPPORT_INFO_TYPE.EMAIL;

    this.elements = this.dataSpace.elements ?? [];
    this.executables = this.dataSpace.executables ?? [];
  }

  get dataSpace(): DataSpace {
    return guaranteeType(
      this.element,
      DataSpace,
      'Element inside text element editor state must be a DataSpace',
    );
  }

  //SUPPORTINFO
  setSelectedSupportInfoType(type: SUPPORT_INFO_TYPE): void {
    this.selectedSupportInfoType = type;
  }

  // TAB
  setSelectedTab(tab: DATASPACE_TAB): void {
    this.selectedTab = tab;
  }

<<<<<<< HEAD
  setSelectedExecutionContext(context: DataSpaceExecutionContext): void {
    console.log(context);
=======
  // EXECUTIONCONTEXT

  setSelectedExecutionContext(context: DataSpaceExecutionContext | null): void {
>>>>>>> styling WIP, form created
    this.selectedExecutionContext = context;
  }

  setDefaultExecutionContext(context: DataSpaceExecutionContext): void {
    this.dataSpace.defaultExecutionContext = context;
  }

<<<<<<< HEAD
  setNewExecutionContextName(name: string): void {
    this.newExecutionContextName = name;
  }

  setSelectedMapping(
    mapping: PackageableElementReference<Mapping> | null,
  ): void {
    this.selectedMapping = mapping;
  }

  setSelectedRuntime(
    runtime: PackageableElementReference<PackageableRuntime> | null,
  ): void {
    this.selectedRuntime = runtime;
  }

  addExecutionContext(
    name: string,
    mapping: PackageableElementReference<Mapping>,
    defaultRuntime: PackageableElementReference<PackageableRuntime>,
  ): void {
    const newContext = new DataSpaceExecutionContext();
    newContext.name = name;
    newContext.description = `Description for ${name}`;
    newContext.mapping = mapping;
    newContext.defaultRuntime = defaultRuntime;
=======
  addExecutionContext(): void {
    const defaultMapping = this.editorStore.graphManagerState.usableMappings[0];
    const defaultRuntime = this.editorStore.graphManagerState.usableRuntimes[0];

    if (!defaultMapping || !defaultRuntime) {
      console.error('Default Mapping and Runtime are required.');
      return;
    }
    const newContext = new DataSpaceExecutionContext();
    newContext.name = `ExecutionContext ${this.dataSpace.executionContexts.length + 1}`;
    newContext.title = `Title for ${newContext.name}`;
    newContext.description = `Description for ${newContext.name}`;
    newContext.mapping =
      PackageableElementExplicitReference.create(defaultMapping);
    newContext.defaultRuntime =
      PackageableElementExplicitReference.create(defaultRuntime);
<<<<<<< HEAD
    observe_DataSpaceExecutionContext(newContext);
<<<<<<< HEAD

    // Add the new context to the dataSpace and select it
>>>>>>> executionContext is finished
=======
>>>>>>> elements finished
    this.dataSpace.executionContexts.push(newContext);
=======
    dataSpace_addExecutionContext(this.dataSpace, newContext);
>>>>>>> styling WIP, form created
    this.setSelectedExecutionContext(newContext);
    this.setDefaultExecutionContext(newContext);
    this.setSelectedTab(DATASPACE_TAB.EXECUTION_CONTEXT);
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
  // DIAGRAMS

>>>>>>> styling WIP, form created
  setDiagrams(diagrams: DataSpaceDiagram[]): void {
    this.diagrams = diagrams;
    this.dataSpace.diagrams = diagrams;
  }

  addDiagram(): void {
    const defaultDiagram =
      this.editorStore.graphManagerState.graph.allElements.find(
        (element) => element instanceof Diagram,
      );

    if (!defaultDiagram) {
      console.error('Default Diagram is required.');
      return;
    }

    const newDiagram = new DataSpaceDiagram();
    const diagramCount = this.dataSpace.diagrams?.length ?? 0;
    newDiagram.title = `Diagram ${diagramCount + 1}`;
    newDiagram.description = `Description for ${newDiagram.title}`;
    newDiagram.diagram =
      PackageableElementExplicitReference.create(defaultDiagram);
    addDataSpaceDiagram(this.dataSpace, newDiagram);
    this.dataSpace.diagrams = this.dataSpace.diagrams ?? [];
    this.setSelectedDiagram(newDiagram);
    this.setSelectedTab(DATASPACE_TAB.DIAGRAM);
  }

  setSelectedDiagram(diagram: DataSpaceDiagram | null): void {
    this.selectedDiagram = diagram;
  }

  removeDiagram(diagram: DataSpaceDiagram): void {
    removeDataSpaceDiagram(this.dataSpace, diagram);
    this.setDiagrams(this.dataSpace.diagrams ?? []);
    if (this.selectedDiagram === diagram) {
      this.setSelectedDiagram(null);
    }
  }

  // ELEMENTS
  setElements(elements: DataSpaceElementPointer[]): void {
    elements.forEach(observe_DataSpaceElementPointer);
    set_dataSpaceElements(this.dataSpace, elements);
    this.elements = this.dataSpace.elements ?? [];
  }

  setSelectedElementPointer(element: DataSpaceElementPointer): void {
    this.selectedElementPointer = element;
    observe_DataSpaceElementPointer(element);
  }

  updateElementExclude(
    element: DataSpaceElementPointer,
    exclude: boolean,
  ): void {
    setElementExclude(element, exclude);
  }

  selectElementPointer(element: DataSpaceElementPointer): void {
    this.selectedElementPointer = element;
  }

  updateSelectedElementPointer(
    newElementPointer: DataSpaceElementPointer,
  ): void {
    this.selectedElementPointer = newElementPointer;
  }

  // EXECUTABLES
  setExecutables(executables: DataSpaceExecutable[]): void {
    this.executables = executables;
    this.dataSpace.executables = executables;
  }

<<<<<<< HEAD
<<<<<<< HEAD
  // selectExecutable(executable: DataSpaceExecutable): void {
  //   this.selectedExecutable = executable;
  // }

  // addExecutable(): void {
  //   const newExecutable = new DataSpacePackageableElementExecutable();
  //   newExecutable.title = `Executable ${this.executables.length + 1}`;
  //   newExecutable.description = `Description ${newExecutable.title}`;

  //   // Add the new executable to the DataSpace and observe it
  //   // this.executables.push(newExecutable);
  //   // this.dataSpace.executables = this.executables;
  //   // this.selectExecutable(newExecutable);
  //   newExecutable.executable = PackageableElementExplicitReference.create(
  //     this.editorStore.graphManagerState.graph.ownServices[0],
  //   );
  //   this.executables.push(newExecutable);
  //   this.selectedExecutable = newExecutable;
  // }

  // Reprocess the state when the underlying element is replaced
>>>>>>> elements and executable finished
=======
>>>>>>> clean up
=======
  setSelectedExecutable(executable: DataSpaceExecutable | null): void {
    this.selectedExecutable = executable;
  }

  addExecutable(): void {
    const defaultService = this.editorStore.graphManagerState.usableServices[0];

    if (!defaultService) {
      return;
    }
    const newExecutable = new DataSpacePackageableElementExecutable();
    newExecutable.title = `Executable ${this.dataSpace.executables?.length ?? 0 + 1}`;
    newExecutable.executable =
      PackageableElementExplicitReference.create(defaultService);
    add_dataSpaceExecutable(this.dataSpace, newExecutable);
    // observe_DataSpaceExecutable(newExecutable);
    this.dataSpace.executables = this.dataSpace.executables ?? [];
    // this.dataSpace.executables.push(newExecutable);
    this.setSelectedExecutable(newExecutable);
    this.setSelectedTab(DATASPACE_TAB.EXECUTABLES);
  }

  removeExecutable(executable: DataSpaceExecutable): void {
    remove_dataSpaceExecutable(this.dataSpace, executable);
    this.setDiagrams(this.dataSpace.diagrams ?? []);
    if (this.selectedExecutable === executable) {
      this.setSelectedExecutable(null);
    }
  }

  // REPROCESSING;
>>>>>>> styling WIP, form created
  override reprocess(
    newElement: PackageableElement,
    editorStore: EditorStore,
  ): ElementEditorState {
    const newState = new DataSpaceEditorState(editorStore, newElement);
    return newState;
  }
}