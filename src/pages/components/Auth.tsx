const Auth = ({ signIn }: { signIn: () => void }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-6xl font-extrabold">Кто ты, воин?</h1>
        <button
          className="btn btn-primary w-1/2 text-slate-100"
          onClick={() => signIn()}
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default Auth;
