import React from "react";
import { AuthForm } from "@/components/AuthForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center p-1 sm:p-28 justify-items-center w-full">
      <div className="max-w-md w-full space-y-8 p-2 rounded-lg shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold">Create a new account</h2>
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
