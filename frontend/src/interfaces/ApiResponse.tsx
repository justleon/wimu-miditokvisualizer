interface Token {
  type: string;
  value: string;
  time: number;
  program: number;
  desc: string;
}

interface DataStructure {
  tokens: NestedList<Token>;
  metrics: any
}

interface ApiResponse {
  success: boolean;
  data: DataStructure
  error: string;
}

type NestedList<T> = Array<T | NestedList<T>>;

export type { Token, ApiResponse, NestedList };
