import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
  return (
    <div className="w-screen h-screen flex-row-center bg-gray-50">
      <AuthForm title="Register" type="register" />
    </div>
  );
};

export default RegisterPage;
