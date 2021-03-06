import Link from "next/link";
import { useCallback, useState } from "react";
import { useAuthSignInMutation } from "~/hooks/Auth";
import { pagesPath } from "~/libraries";

type InputValue = {
  email: string;
  password: string;
};

export type Props = {};

export const Signin: React.VFC<Props> = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<InputValue>({ email: "", password: "" });
  const { mutateAsync: signIn } = useAuthSignInMutation();

  const handleChangeEmail = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue((prev: InputValue): InputValue => {
      return {
        ...prev,
        email: value,
      };
    });
  }, []);

  const handleChangePassword = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue((prev: InputValue): InputValue => {
      return {
        ...prev,
        password: value,
      };
    });
  }, []);

  const handleClickSigninButton = useCallback(async (): Promise<void> => {
    await signIn({ ...inputValue });
  }, [inputValue, signIn]);

  return (
    <div>
      <h1>Sign In</h1>
      <div>
        <form>
          <div>
            <input type="email" required value={inputValue.email} onChange={handleChangeEmail} />
          </div>
          <div>
            <input type="password" required value={inputValue.password} onChange={handleChangePassword} />
          </div>
        </form>
      </div>
      <div>
        <div>
          <button onClick={handleClickSigninButton}>Sign In</button>
        </div>
        <div>
          <Link href={pagesPath.signup.$url()}>to SignUp</Link>
        </div>
        <div>
          <Link href={pagesPath.password_reset.$url()}>to Password Recovery</Link>
        </div>
      </div>
    </div>
  );
};
