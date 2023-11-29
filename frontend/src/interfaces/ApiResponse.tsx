interface Token {
  type: string;
  value: string;
  time: number;
  program: number;
  desc: string;
}

interface ApiResponse {
  success: boolean;
  data: NestedList<Token>;
  error: string;
}

type NestedList<T> = Array<T | NestedList<T>>;

export type { Token, ApiResponse, NestedList };
