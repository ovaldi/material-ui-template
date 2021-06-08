interface AuthReducer {
  token: string;
}

interface UIReducer {
  loading: number;
  sidebar: 'school' | 'class' | 'dict' | 'user';
}

interface StoreReducer {
  ui: UIReducer;
  auth: AuthReducer;
}
