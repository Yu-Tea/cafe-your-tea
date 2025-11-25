export type EyeType = 'normal' | 'smile' | 'itome';
export type MouthType = 'normal' | 'open' | 'munya';
export type BodyType = 'normal' | 'up' | 'down' | 'hai' | 'touch';

export interface KerochaExpression {
  eye: EyeType;
  mouth: MouthType;
  body: BodyType;
}

export interface TalkData {
  id: string;
  text: string;
  expression: KerochaExpression;
  timeRange?: 'morning' | 'afternoon' | 'evening' | 'night' | 'all';
  duration?: number; // 表示時間（ミリ秒）
}