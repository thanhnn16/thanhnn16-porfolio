export default defineAppConfig({
  ui: {
    primary: 'sky',
    gray: 'cool',

    strategy: 'merge',
    notifications: {
      position: 'top-right'
    },

    button: {
      default: {
        color: 'primary',
        variant: 'solid',
        size: 'md',
        loadingIcon: 'i-heroicons-arrow-path-20-solid'
      }
    },

    input: {
      default: {
        color: 'primary',
        size: 'md',
        loadingIcon: 'i-heroicons-arrow-path-20-solid'
      }
    },

    select: {
      default: {
        color: 'primary',
        size: 'md',
        loadingIcon: 'i-heroicons-arrow-path-20-solid',
        trailingIcon: 'i-heroicons-chevron-down-20-solid'
      }
    },

    selectMenu: {
      default: {
        selectedIcon: 'i-heroicons-check-20-solid'
      }
    },

    notification: {
      default: {
        color: 'primary',
        closeButton: {
          icon: 'i-heroicons-x-mark-20-solid'
        }
      }
    },

    commandPalette: {
      default: {
        icon: 'i-heroicons-magnifying-glass-20-solid',
        loadingIcon: 'i-heroicons-arrow-path-20-solid',
        selectedIcon: 'i-heroicons-check-20-solid',
        emptyState: {
          icon: 'i-heroicons-magnifying-glass-20-solid'
        }
      }
    },

    table: {
      default: {
        sortAscIcon: 'i-heroicons-arrows-up-down-20-solid',
        sortDescIcon: 'i-heroicons-arrows-up-down-20-solid',
        sortButton: {
          icon: 'i-heroicons-arrows-up-down-20-solid'
        },
        loadingState: {
          icon: 'i-heroicons-arrow-path-20-solid'
        },
        emptyState: {
          icon: 'i-heroicons-circle-stack-20-solid'
        }
      }
    }
  }
}) 