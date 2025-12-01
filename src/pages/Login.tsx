import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type LoginType = 'student' | 'teacher';

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loginType, setLoginType] = useState<LoginType>('student');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (!/^[\d\s\+\-\(\)]+$/.test(phone)) {
      newErrors.phone = 'Неверный формат номера телефона';
    }

    if (!password) {
      newErrors.password = 'Введите пароль';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', loginType);
    localStorage.setItem('userPhone', phone);

    toast({
      title: 'Вход выполнен!',
      description: `Добро пожаловать${loginType === 'teacher' ? ', уважаемый учитель' : ''}!`,
    });

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'phone') {
      setPhone(value);
    } else {
      setPassword(value);
    }
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl animate-scale-in">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
              Д
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Вход в Дневник.ру
          </CardTitle>
          <CardDescription className="text-base">
            Войдите в свой аккаунт для продолжения
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-6">
            <Label className="text-base mb-3 block">Тип входа</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={loginType === 'student' ? 'default' : 'outline'}
                className="h-20 flex-col gap-2"
                onClick={() => setLoginType('student')}
              >
                <Icon name="GraduationCap" size={28} />
                <span className="font-semibold">Ученик</span>
              </Button>
              <Button
                type="button"
                variant={loginType === 'teacher' ? 'default' : 'outline'}
                className="h-20 flex-col gap-2"
                onClick={() => setLoginType('teacher')}
              >
                <Icon name="BookOpen" size={28} />
                <span className="font-semibold">Учитель</span>
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Icon name="Phone" size={16} />
                Номер телефона
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <Icon name="AlertCircle" size={14} />
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Icon name="Lock" size={16} />
                Пароль
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <Icon name="AlertCircle" size={14} />
                  {errors.password}
                </p>
              )}
            </div>

            {loginType === 'teacher' && (
              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Icon name="Info" size={18} className="text-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Вход в аккаунт учителя доступен только зарегистрированным педагогам
                  </p>
                </div>
              </div>
            )}

            <div className="pt-4 space-y-3">
              <Button type="submit" className="w-full h-12 text-base gap-2">
                <Icon name="LogIn" size={20} />
                Войти
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => navigate('/register')}
              >
                Нет аккаунта? Зарегистрироваться
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => navigate('/')}
              >
                ← Назад
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}