// data-attribute name of module.
export const ECM_MODULE_NAME_ATTRIBUTE = 'data-module-name'
// data-attribute name of plugins.
export const ECM_PLUGIN_NAME_ATTRIBUTE = 'data-plugin-name'
// Keeps track if an element is instantiated.
export const ECM_INITIALIZED_ATTRIBUTE = 'data-initialized'
// If a module is a child of "dynamic-content" module. Automatically set.
export const ECM_DYNAMIC_CONTENT_CHILD_ATTRIBUTE = 'data-dynamic-child'
// Skip initialize on mount if true.
export const ECM_SKIP_INIT_ATTRIBUTE = 'data-skip-init'
// "dynamic-content" module. Watch for changes in an element and initialize if module was added.
export const ECM_DYNAMIC_CONTENT_NAME = 'ecm-dynamic-content'
// Event name for CustomEvent to initialize a single module.
export const ECM_INITIALIZE_EVENT_NAME = 'ecmInitialize'
// Event name for CustomEvent to initialize *all* module inside a block.
export const ECM_INITIALIZE_BLOCK_EVENT_NAME = 'ecmInitializeBlock'

// ECM supported viewport size.
export type ViewportSize = 'sp' | 'md' | 'lg'

export function getCurrentViewport(): ViewportSize {
  if (window.innerWidth >= 1024) return 'lg'
  if (window.innerWidth >= 768) return 'md'
  return 'sp'
}
