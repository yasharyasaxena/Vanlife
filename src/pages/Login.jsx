import { useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
  return new URL(request.url).searchParams;
}

export default function Login() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const message = useLoaderData().get("message");
  const pathname = useLoaderData().get("redirectTo") || "/host";
  const navigate = useNavigate();

  async function action(formdata) {
    const email = formdata.get("email");
    const password = formdata.get("password");
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("loggedin", true);
      return navigate(pathname, { replace: true });
    } catch (error) {
      setError(error);
    } finally {
      setStatus("idle");
    }
  }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {error && <h3 className="red">{error.message}</h3>}
      <form
        action={action}
        onSubmit={() => {
          setStatus("submitting");
        }}
        className="login-form"
      >
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in" : "Log in"}
        </button>
      </form>
    </div>
  );
}
