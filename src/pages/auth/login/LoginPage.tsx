import { PasswordInput } from '@/components';
import { ROUTES, STORAGE } from '@/constants';
import { useAuthContext } from '@/context';
import { LoginFormSchema, loginFormSchema } from '@/lib/form-schema';
import { useLoginMutation } from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const loginMutation = useLoginMutation();

  const isLoading = false;

  const handleClickLogin = (data: LoginFormSchema) => {
    loginMutation.mutate(data, {
      onSuccess: data => {
        navigate(ROUTES.DASHBOARD);
        localStorage.setItem(STORAGE.ACCESS_TOKEN, data.data.access_token);
        localStorage.setItem(STORAGE.REFRESH_TOKEN, data.data.refresh_token);
        location.href = ROUTES.DASHBOARD;
      },
      onError: (err: any) => {
        console.error(err);
        const response = err.response?.data;
        toast.error(response?.message || err.message);
      },
    });
  };

  return (
    <div className="flex max-h-screen min-h-screen w-full items-center justify-center overflow-hidden dark:bg-gray-950">
      <form
        onSubmit={handleSubmit(handleClickLogin)}
        className="max-w-96 space-y-8 rounded-lg border border-foreground-200 bg-background px-8 py-6 shadow-lg dark:bg-gray-900">
        <div className="space-y-4">
          <h1 className="text-center text-2xl font-bold dark:text-gray-200">
            Welcome Back!
          </h1>
          <p className="max-w-80 text-center">
            Login to your account to access all the features of the app.
          </p>
        </div>
        <div className="space-y-4">
          <Input
            {...register('email')}
            label="Email/Phone number"
            type="text"
            placeholder="example@host.com"
            variant="bordered"
            autoFocus
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
          />
          <PasswordInput
            {...register('password')}
            label="Password"
            placeholder="Enter your secret password"
            variant="bordered"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="solid"
            color="primary"
            size="lg"
            isDisabled={isLoading}
            isLoading={isLoading}>
            {isLoading ? 'Logging in' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
