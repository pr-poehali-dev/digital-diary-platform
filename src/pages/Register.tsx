import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'student' | 'teacher';

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [role, setRole] = useState<UserRole>('student');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    teacherCode: '',
    className: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const TEACHER_SECRET_CODE = '060320';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Введите имя';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Введите фамилию';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    if (!formData.password) {
      newErrors.password = 'Введите пароль';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (role === 'teacher') {
      if (!formData.teacherCode) {
        newErrors.teacherCode = 'Введите код доступа для учителя';
      } else if (formData.teacherCode !== TEACHER_SECRET_CODE) {
        newErrors.teacherCode = 'Неверный код доступа. Регистрация учителей доступна только по специальному коду.';
      }
    }

    if (role === 'student' && !formData.className.trim()) {
      newErrors.className = 'Укажите класс';
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
    localStorage.setItem('userType', role);
    localStorage.setItem('userPhone', formData.phone);

    toast({
      title: 'Регистрация успешна!',
      description: `Добро пожаловать, ${formData.firstName}!`,
    });

    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      <Card className="w-full max-w-2xl shadow-2xl animate-scale-in">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
              Д
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Регистрация в Дневник.ру
          </CardTitle>
          <CardDescription className="text-base">
            Создайте аккаунт для доступа к платформе
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-6">
            <Label className="text-base mb-3 block">Выберите тип аккаунта</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={role === 'student' ? 'default' : 'outline'}
                className="h-20 flex-col gap-2"
                onClick={() => setRole('student')}
              >
                <Icon name="GraduationCap" size={28} />
                <span className="font-semibold">Ученик</span>
              </Button>
              <Button
                type="button"
                variant={role === 'teacher' ? 'default' : 'outline'}
                className="h-20 flex-col gap-2"
                onClick={() => setRole('teacher')}
              >
                <Icon name="BookOpen" size={28} />
                <span className="font-semibold">Учитель</span>
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Имя *</Label>
                <Input
                  id="firstName"
                  placeholder="Иван"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Фамилия *</Label>
                <Input
                  id="lastName"
                  placeholder="Петров"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@school.ru"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {role === 'student' && (
              <div className="space-y-2">
                <Label htmlFor="className">Класс *</Label>
                <Input
                  id="className"
                  placeholder="9-А"
                  value={formData.className}
                  onChange={(e) => handleInputChange('className', e.target.value)}
                  className={errors.className ? 'border-red-500' : ''}
                />
                {errors.className && (
                  <p className="text-sm text-red-500">{errors.className}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>

            {role === 'teacher' && (
              <div className="space-y-2">
                <Label htmlFor="teacherCode" className="flex items-center gap-2">
                  Код доступа для учителя *
                  <Badge variant="secondary" className="text-xs">
                    <Icon name="Lock" size={12} className="mr-1" />
                    Требуется
                  </Badge>
                </Label>
                <Input
                  id="teacherCode"
                  type="password"
                  placeholder="Введите специальный код"
                  value={formData.teacherCode}
                  onChange={(e) => handleInputChange('teacherCode', e.target.value)}
                  className={errors.teacherCode ? 'border-red-500' : ''}
                />
                {errors.teacherCode && (
                  <p className="text-sm text-red-500 flex items-start gap-2">
                    <Icon name="AlertCircle" size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{errors.teacherCode}</span>
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Регистрация учителей возможна только с кодом доступа от администрации
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Пароль *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Минимум 6 символов"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Повторите пароль *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Повторите пароль"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button type="submit" className="w-full h-12 text-base gap-2">
                <Icon name="UserPlus" size={20} />
                Зарегистрироваться
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => navigate('/')}
              >
                Уже есть аккаунт? Войти
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}