import { AuthForm } from "@/components/AuthForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="max-w-md w-full space-y-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold">
            Create a new account
          </h2>
          <p className="mt-2 text-sm">
            Or{" "}
            <a
              href="/login"
              className="font-medium text-green-600 hover:text-green-500">
              sign in to existing account
            </a>
          </p>
        </div>
        <AuthForm action="signup" />
      </div>
    </div>
  );
}
