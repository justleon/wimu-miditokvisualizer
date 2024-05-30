interface Token {
  type: string;
  value: string;
  time: number;
  program: number;
  desc: string;
}

interface MusicInfoData {
  title: string;
  resolution: number;
  tempos: Array<[number, number]>;
  key_signatures: Array<[number, number, string]>;
  time_signatures: Array<[number, number, number]>;
  
  pitch_range: number;
  n_pitches_used: number;
  polyphony: number;

  empty_beat_rate: number;
  drum_pattern_consistency: number;
}

interface DataStructure {
  tokens: NestedList<Token>;
  metrics: MusicInfoData;
  notes: any[];
}

interface ApiResponse {
  success: boolean;
  data: DataStructure;
  error: string;
}

type NestedList<T> = Array<T | NestedList<T>>;

export type { Token, ApiResponse, NestedList, MusicInfoData };
