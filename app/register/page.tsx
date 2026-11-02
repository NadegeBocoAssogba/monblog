
import RegisterForm from "@/components/ui/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="mb-4 text-xl font-semibold">
        Créer un compte
      </h1>

      <RegisterForm />
    </main>
  );
}
