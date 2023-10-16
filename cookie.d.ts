declare module "cookie" {
  export function parse(str: string): Record<string, string>;
  export function serialize(
    name: string,
    val: string | number | boolean,
    options?: {
      domain?: string;
      encode?: (value: string) => string;
      expires?: Date;
      httpOnly?: boolean;
      maxAge?: number;
      path?: string;
      sameSite?: boolean | "lax" | "strict" | "none";
      secure?: boolean;
      signed?: boolean;
    }
  ): string;
}
