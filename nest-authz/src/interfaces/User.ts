export class User {
  readonly created_at: string;
  readonly email: string;
  readonly email_verified: boolean;
  readonly family_name: string;
  readonly given_name: string;
  readonly name: string;
  readonly nickname: string;
  readonly password?: string;
  readonly id?: number;
  readonly last_password_reset: string;
  readonly user_id: string;
  readonly updated_at: string;
  readonly identities: [];
}