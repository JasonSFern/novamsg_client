import { Post } from './post.interface';

export type ContentType = 'post' | 'comment';

export type ReCaptchaToken = string | null | undefined;

export interface ContentPayload {
  user_id: number;
  content: string;
  token: ReCaptchaToken;
}

export interface ContentInput {
  id?: number;
  type: ContentType;
  payload: ContentPayload;
}

export type ContentOutput = Post | Comment;

export interface DeleteContentOutput {
  success: boolean;
}
