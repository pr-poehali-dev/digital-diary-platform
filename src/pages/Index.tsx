import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

type Section = 'home' | 'diary' | 'schedule' | 'messages' | 'profile';

interface Grade {
  subject: string;
  grade: number;
  date: string;
  teacher: string;
  comment?: string;
}

interface Homework {
  subject: string;
  task: string;
  deadline: string;
  status: 'pending' | 'completed';
}

interface Notification {
  id: number;
  type: 'grade' | 'homework' | 'event';
  title: string;
  description: string;
  time: string;
  isNew: boolean;
}

interface Schedule {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  isRead: boolean;
}

export default function Index() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const notifications: Notification[] = [
    { id: 1, type: 'grade', title: 'Новая оценка', description: 'Математика: 5', time: '10 мин назад', isNew: true },
    { id: 2, type: 'homework', title: 'Домашнее задание', description: 'Литература: прочитать главы 5-7', time: '1 час назад', isNew: true },
    { id: 3, type: 'event', title: 'Родительское собрание', description: 'Завтра в 18:00', time: '2 часа назад', isNew: false },
  ];

  const recentGrades: Grade[] = [
    { subject: 'Математика', grade: 5, date: '01.12.2025', teacher: 'Иванова М.П.', comment: 'Отличная работа!' },
    { subject: 'Русский язык', grade: 4, date: '01.12.2025', teacher: 'Петров И.С.' },
    { subject: 'Физика', grade: 5, date: '30.11.2025', teacher: 'Сидорова А.В.' },
    { subject: 'История', grade: 4, date: '29.11.2025', teacher: 'Козлов П.Р.' },
  ];

  const homework: Homework[] = [
    { subject: 'Литература', task: 'Прочитать главы 5-7, написать краткий пересказ', deadline: '03.12.2025', status: 'pending' },
    { subject: 'Алгебра', task: 'Решить задачи №45-52 на стр. 89', deadline: '02.12.2025', status: 'pending' },
    { subject: 'Английский', task: 'Выучить слова из Unit 8', deadline: '02.12.2025', status: 'completed' },
  ];

  const todaySchedule: Schedule[] = [
    { time: '08:30 - 09:15', subject: 'Математика', teacher: 'Иванова М.П.', room: '215' },
    { time: '09:25 - 10:10', subject: 'Русский язык', teacher: 'Петров И.С.', room: '312' },
    { time: '10:25 - 11:10', subject: 'Физика', teacher: 'Сидорова А.В.', room: '108' },
    { time: '11:25 - 12:10', subject: 'История', teacher: 'Козлов П.Р.', room: '204' },
    { time: '12:20 - 13:05', subject: 'Английский', teacher: 'Смирнова О.И.', room: '315' },
  ];

  const messages: Message[] = [
    { id: 1, sender: 'Иванова М.П.', subject: 'Контрольная работа', preview: 'Уважаемые родители! Напоминаю, что в среду...', time: '14:30', isRead: false },
    { id: 2, sender: 'Петров И.С.', subject: 'Олимпиада по русскому языку', preview: 'Приглашаю вашего ребенка принять участие...', time: 'Вчера', isRead: false },
    { id: 3, sender: 'Администрация', subject: 'Изменения в расписании', preview: 'Доводим до вашего сведения...', time: '29.11', isRead: true },
  ];

  const getGradeColor = (grade: number) => {
    if (grade === 5) return 'bg-green-500';
    if (grade === 4) return 'bg-blue-500';
    if (grade === 3) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderHome = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Добро пожаловать, Иван!
          </h1>
          <p className="text-muted-foreground mt-2">Сегодня {new Date().toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Icon name="TrendingUp" size={20} className="text-primary" />
              Средний балл
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">4.75</div>
            <p className="text-sm text-muted-foreground mt-1">+0.25 за неделю</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-accent">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Icon name="BookOpen" size={20} className="text-accent" />
              Домашних заданий
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-accent">{homework.filter(h => h.status === 'pending').length}</div>
            <p className="text-sm text-muted-foreground mt-1">Не выполнено</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Icon name="Mail" size={20} className="text-secondary" />
              Новых сообщений
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-secondary">{messages.filter(m => !m.isRead).length}</div>
            <p className="text-sm text-muted-foreground mt-1">Требуют внимания</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Star" size={20} className="text-yellow-500" />
              Последние оценки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentGrades.map((grade, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${getGradeColor(grade.grade)} flex items-center justify-center text-white font-bold`}>
                      {grade.grade}
                    </div>
                    <div>
                      <p className="font-semibold">{grade.subject}</p>
                      <p className="text-sm text-muted-foreground">{grade.teacher}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{grade.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Calendar" size={20} className="text-primary" />
              Расписание на сегодня
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-3">
                {todaySchedule.map((lesson, idx) => (
                  <div key={idx} className="flex gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-colors">
                    <div className="text-sm font-medium text-muted-foreground min-w-[100px]">{lesson.time}</div>
                    <div className="flex-1">
                      <p className="font-semibold">{lesson.subject}</p>
                      <p className="text-sm text-muted-foreground">{lesson.teacher} • Каб. {lesson.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="ClipboardList" size={20} className="text-accent" />
            Домашние задания
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {homework.map((hw, idx) => (
              <div key={idx} className={`p-4 rounded-lg border-2 ${hw.status === 'completed' ? 'border-green-200 bg-green-50' : 'border-border bg-background'} transition-all hover:shadow-md`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={hw.status === 'completed' ? 'default' : 'secondary'} className={hw.status === 'completed' ? 'bg-green-500' : ''}>
                        {hw.subject}
                      </Badge>
                      {hw.status === 'completed' && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Icon name="Check" size={12} className="mr-1" />
                          Выполнено
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm">{hw.task}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm text-muted-foreground">до {hw.deadline}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDiary = () => (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-4xl font-bold">Дневник</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Статистика</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">4.75</div>
              <p className="text-sm text-muted-foreground mt-2">Средний балл</p>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Пятерки</span>
                <Badge className="bg-green-500">42</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Четверки</span>
                <Badge className="bg-blue-500">28</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Тройки</span>
                <Badge className="bg-yellow-500">5</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Все оценки</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {recentGrades.concat(recentGrades).map((grade, idx) => (
                  <Card key={idx} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-14 h-14 rounded-xl ${getGradeColor(grade.grade)} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                            {grade.grade}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{grade.subject}</h3>
                            <p className="text-sm text-muted-foreground">{grade.teacher}</p>
                            {grade.comment && (
                              <p className="text-sm mt-2 p-2 bg-muted rounded-md italic">&ldquo;{grade.comment}&rdquo;</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{grade.date}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-4xl font-bold">Расписание</h1>
      
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'].map((day, idx) => (
          <Button key={idx} variant={idx === 0 ? 'default' : 'outline'} className="flex-shrink-0">
            {day}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {todaySchedule.map((lesson, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-all hover:scale-[1.02] duration-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2">{lesson.time}</Badge>
                  <h3 className="font-bold text-xl mb-1">{lesson.subject}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="User" size={14} />
                    <span>{lesson.teacher}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Icon name="MapPin" size={14} />
                    <span>Кабинет {lesson.room}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Сообщения</h1>
        <Button className="gap-2">
          <Icon name="Plus" size={18} />
          Написать
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {messages.map((message) => (
          <Card key={message.id} className={`hover:shadow-lg transition-all cursor-pointer ${!message.isRead ? 'border-l-4 border-l-primary bg-primary/5' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                    {message.sender.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">{message.sender}</h3>
                    <span className="text-sm text-muted-foreground">{message.time}</span>
                  </div>
                  <p className="font-semibold text-sm mb-1">{message.subject}</p>
                  <p className="text-sm text-muted-foreground">{message.preview}</p>
                </div>
                {!message.isRead && (
                  <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-4xl font-bold">Профиль</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <Avatar className="w-32 h-32 mx-auto mb-4">
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-4xl">
                ИП
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold mb-1">Иван Петров</h2>
            <p className="text-muted-foreground mb-4">Ученик 9-А класса</p>
            <div className="space-y-2">
              <Button className="w-full gap-2">
                <Icon name="Settings" size={18} />
                Настройки
              </Button>
              <Button 
                variant="destructive" 
                className="w-full gap-2"
                onClick={() => setIsLoggedIn(false)}
              >
                <Icon name="LogOut" size={18} />
                Выйти из аккаунта
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Личная информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Дата рождения</p>
                <p className="font-semibold">15.05.2008</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="font-semibold">ivan.petrov@school.ru</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Телефон</p>
                <p className="font-semibold">+7 (999) 123-45-67</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Класс</p>
                <p className="font-semibold">9-А</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Родители</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Avatar>
                    <AvatarFallback className="bg-secondary text-white">МП</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Петрова Мария</p>
                    <p className="text-sm text-muted-foreground">+7 (999) 111-22-33</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Avatar>
                    <AvatarFallback className="bg-accent text-white">АП</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Петров Алексей</p>
                    <p className="text-sm text-muted-foreground">+7 (999) 444-55-66</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return renderHome();
      case 'diary':
        return renderDiary();
      case 'schedule':
        return renderSchedule();
      case 'messages':
        return renderMessages();
      case 'profile':
        return renderProfile();
      default:
        return renderHome();
    }
  };

  if (!isLoggedIn) {
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
              Дневник.ру
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                Цифровой школьный дневник для учеников, родителей и учителей
              </p>
            </div>
            
            <div className="space-y-3">
              <Button 
                className="w-full h-12 text-base gap-2" 
                onClick={() => navigate('/login')}
              >
                <Icon name="GraduationCap" size={20} />
                Войти как ученик
              </Button>
              
              <Button 
                variant="secondary" 
                className="w-full h-12 text-base gap-2"
                onClick={() => navigate('/login')}
              >
                <Icon name="BookOpen" size={20} />
                Войти как учитель
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full h-12 text-base gap-2"
                onClick={() => navigate('/register')}
              >
                <Icon name="UserPlus" size={20} />
                Регистрация
              </Button>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-center text-muted-foreground">
                Для регистрации учителя требуется специальный код доступа
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                Д
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Дневник.ру
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-2">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'diary', label: 'Дневник', icon: 'BookOpen' },
                { id: 'schedule', label: 'Расписание', icon: 'Calendar' },
                { id: 'messages', label: 'Сообщения', icon: 'Mail' },
                { id: 'profile', label: 'Профиль', icon: 'User' },
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={currentSection === item.id ? 'default' : 'ghost'}
                  className="gap-2"
                  onClick={() => setCurrentSection(item.id as Section)}
                >
                  <Icon name={item.icon as any} size={18} />
                  {item.label}
                </Button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Icon name="Bell" size={20} />
                {notifications.filter(n => n.isNew).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
                )}
              </Button>
              <Avatar className="cursor-pointer">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                  ИП
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {notificationsOpen && (
        <div className="fixed top-20 right-4 w-96 max-w-[calc(100vw-2rem)] z-50 animate-slide-in-right">
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Bell" size={20} />
                Уведомления
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-lg border ${notif.isNew ? 'bg-primary/5 border-primary' : 'bg-muted border-border'} hover:shadow-md transition-all cursor-pointer`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          notif.type === 'grade' ? 'bg-green-100' :
                          notif.type === 'homework' ? 'bg-yellow-100' :
                          'bg-blue-100'
                        }`}>
                          <Icon 
                            name={notif.type === 'grade' ? 'Star' : notif.type === 'homework' ? 'BookOpen' : 'Calendar'} 
                            size={18}
                            className={
                              notif.type === 'grade' ? 'text-green-600' :
                              notif.type === 'homework' ? 'text-yellow-600' :
                              'text-blue-600'
                            }
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm">{notif.title}</p>
                          <p className="text-sm text-muted-foreground">{notif.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                        </div>
                        {notif.isNew && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-50">
        <div className="flex items-center justify-around p-2">
          {[
            { id: 'home', icon: 'Home' },
            { id: 'diary', icon: 'BookOpen' },
            { id: 'schedule', icon: 'Calendar' },
            { id: 'messages', icon: 'Mail' },
            { id: 'profile', icon: 'User' },
          ].map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="icon"
              className={currentSection === item.id ? 'text-primary' : ''}
              onClick={() => setCurrentSection(item.id as Section)}
            >
              <Icon name={item.icon as any} size={24} />
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
}