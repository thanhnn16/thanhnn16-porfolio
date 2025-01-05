export interface UIConfig {
  primary: string;
  gray: string;
  strategy: 'merge';
  button: {
    default: {
      color: string;
      variant: string;
      size: string;
      loadingIcon: string;
    };
  };
  input: {
    default: {
      color: string;
      size: string;
      loadingIcon: string;
    };
  };
  select: {
    default: {
      color: string;
      size: string;
      loadingIcon: string;
      trailingIcon: string;
    };
  };
  selectMenu: {
    default: {
      selectedIcon: string;
    };
  };
  notification: {
    default: {
      color: string;
      closeButton: {
        icon: string;
      };
    };
  };
  commandPalette: {
    default: {
      icon: string;
      loadingIcon: string;
      selectedIcon: string;
      emptyState: {
        icon: string;
      };
    };
  };
  table: {
    default: {
      sortAscIcon: string;
      sortDescIcon: string;
      sortButton: {
        icon: string;
      };
      loadingState: {
        icon: string;
      };
      emptyState: {
        icon: string;
      };
    };
  };
}

export interface ThemeConfig {
  isDark: boolean;
}

export interface LangConfig {
  currentLang: 'vi' | 'en';
}

export interface AppConfig {
  ui: UIConfig;
  theme: ThemeConfig;
  lang: LangConfig;
} 