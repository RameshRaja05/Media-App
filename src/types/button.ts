type ExcludeFromTuple<T extends any[], U> = {
    [K in keyof T]: T[K] extends U ? never : T[K];
  }[number];
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Exclusive<T extends PropertyKey[], U = any> = T[number] extends infer E
    ? E extends string
    ? Record<E, U> & { [k in ExcludeFromTuple<T, E>]?: never }
    : never
    : never & object;
  
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    Partial<{
      children?: React.ReactNode;
      outline?: boolean;
      rounded?: boolean;
      onclick?: () => void;
      loading:boolean
    }> &
    Exclusive<
      ['primary', 'secondary', 'success', 'warning', 'danger'],
      boolean
    >;
