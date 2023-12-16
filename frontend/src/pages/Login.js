import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex-row-center bg-gray-50">
      <AuthForm title="Login" type="login" />
    </div>
  );
};

export default LoginPage;
