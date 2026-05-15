import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

const schema = z.object({ email: z.string().email("Enter a valid email") });
type FormValues = z.infer<typeof schema>;

function ForgotPasswordPage() {
  const [sent, setSent] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    setSent(values.email);
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm space-y-8">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>

        {sent ? (
          <div className="space-y-4 rounded-lg border border-border bg-card p-6 text-center">
            <div className="mx-auto grid size-10 place-items-center rounded-full bg-status-ok/10 text-status-ok">
              <MailCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Check your inbox</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We sent password reset instructions to{" "}
                <span className="font-medium text-foreground">{sent}</span>.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Reset password
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">Forgot your password?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter the email tied to your account and we'll send a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" autoComplete="email" {...register("email")} />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Sending…" : "Send reset link"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
