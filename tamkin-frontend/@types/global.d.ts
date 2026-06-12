interface Window {
  google?: {
    accounts: {
      id: {
        initialize: (config: {
          client_id: string;
          callback: (response: { credential: string }) => void;
        }) => void;
        renderButton: (
          element: HTMLElement,
          options: { theme?: string; size?: string; width?: number },
        ) => void;
      };
    };
  };
}
