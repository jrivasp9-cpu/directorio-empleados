import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/hooks/useLogin';
import { useAuthStore } from '@/store/authStore';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { loginSchema, type LoginValores } from '@/utils/schemas';

function mensajeDeLogin(error: unknown): string {
  if (isAxiosError(error) && error.response?.status === 400) {
    return 'Usuario o contraseña incorrectos.';
  }
  return getErrorMessage(error);
}

export default function LoginPage() {
  const autenticado = useAuthStore((estado) => Boolean(estado.accessToken));
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValores>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  if (autenticado) {
    return <Navigate to="/empleados" replace />;
  }

  const enviar = handleSubmit((valores) => login.mutate(valores));

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <form
        onSubmit={enviar}
        noValidate
        className="w-full max-w-sm space-y-4 rounded-lg border bg-background p-6 shadow-sm"
      >
        <h1 className="text-2xl font-semibold">Iniciar sesión</h1>

        {login.error && (
          <Alert variant="destructive">
            <AlertDescription>{mensajeDeLogin(login.error)}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="username">Usuario</Label>
          <Input
            id="username"
            autoComplete="username"
            aria-invalid={Boolean(errors.username)}
            {...register('username')}
          />
          {errors.username && (
            <p className="text-sm text-destructive">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={login.isPending}>
          Ingresar
        </Button>
      </form>
    </main>
  );
}