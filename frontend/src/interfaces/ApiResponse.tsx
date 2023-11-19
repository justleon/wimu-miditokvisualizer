interface Token {
  type: string;
  value: string;
  time: number;
  program: number;
  desc: string;
}

interface Sequence {
  tokens: Token[];
}

interface ApiResponse {
  sequences: Sequence[];
}

export type { Token, Sequence, ApiResponse };
