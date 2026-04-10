import {
    BookOutlined,
    CalendarOutlined,
    CheckSquareOutlined,
    FileTextOutlined,
    HomeOutlined,
    LeftOutlined,
    MenuOutlined,
    MessageOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Head } from '@inertiajs/react';
import type { MenuProps } from 'antd';
import { Avatar, Button, Carousel, ConfigProvider, Drawer, Grid, Layout, Menu, Space, Typography, notification } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';

const COLOR_BG = 'linear-gradient(135deg,#6253e1, #04befe)';

const headerCarouselSlides = [
    { src: '/images/logo.png', alt: 'School logo' },
    { src: '/images/svsi.png', alt: 'STVSI banner' },
];

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

type MenuItem = Required<MenuProps>['items'][number];

const navigationItems: MenuItem[] = [
    { key: 'overview', icon: <HomeOutlined />, label: 'Overview' },
    { key: 'classes', icon: <BookOutlined />, label: 'My Classes' },
    { key: 'assignments', icon: <CheckSquareOutlined />, label: 'Assignments' },
    { key: 'calendar', icon: <CalendarOutlined />, label: 'Calendar' },
    { key: 'messages', icon: <MessageOutlined />, label: 'Messages' },
    { key: 'resources', icon: <FileTextOutlined />, label: 'Learning Resources' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
];

export default function StudentDashboard() {
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const [collapsed, setCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [headerView, setHeaderView] = useState<'welcome' | 'news'>('welcome');
    const [activeSlide, setActiveSlide] = useState(0);
    const hasShownWelcomeNotification = useRef(false);
    const [notificationApi, notificationContextHolder] = notification.useNotification();
    const carouselAutoplaySpeed = 7000;

    const selectedKeys = useMemo(() => ['overview'], []);

    const headerContent =
        headerView === 'welcome'
            ? {
                  label: 'WELCOME',
                  title: 'Welcome to STVSI Student Portal',
                  description:
                      'Welcome to STVSI Student Portal. Access your classes, assignments, and resources all in one place. Let’s make this semester great!',
              }
            : {
                  label: 'NEWS',
                  title: 'Campus News & Updates',
                  description: 'See the latest announcements, reminders, and important school updates in one place.',
              };

    useEffect(() => {
        if (hasShownWelcomeNotification.current) return;

        hasShownWelcomeNotification.current = true;

        notificationApi.open({
            title: <span style={{ color: '#fff' }}>Welcome back, Diego Burgos</span>,
            description: <span style={{ color: '#fff' }}>Your Student Learning Portal is ready.</span>,
            showProgress: true,
            duration: 20,
            placement: 'bottomRight',
            style: {
                background: '#000',
                color: '#fff',
                width: isMobile ? 280 : 320,
            },
        });
    }, [isMobile, notificationApi]);

    const sidebarContent = (
        <div className="flex h-full flex-col bg-[#0f172a] text-white">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                <Avatar size={42} src="/images/logo.png" className="bg-white p-1" />
                {!collapsed && (
                    <div className="min-w-0">
                        <Typography.Text className="block !text-xs tracking-[0.24em] !text-cyan-200 uppercase">stvsi portal</Typography.Text>
                        <Typography.Title level={5} className="!m-0 !text-white">
                            Student Dashboard
                        </Typography.Title>
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-auto px-3 py-4">
                <Menu mode="inline" theme="dark" selectedKeys={selectedKeys} items={navigationItems} className="border-0 !bg-transparent" />
            </div>
        </div>
    );

    return (
        <>
            <Head title="Student Dashboard" />

            <style>{`
                @keyframes carouselProgress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
            `}</style>

            <ConfigProvider
                theme={{
                    components: {
                        Notification: {
                            progressBg: COLOR_BG,
                        },
                    },
                }}
            >
                {notificationContextHolder}

                <Layout className="min-h-screen bg-slate-100">
                    {!isMobile && (
                        <Sider
                            collapsible
                            collapsed={collapsed}
                            trigger={null}
                            width={280}
                            collapsedWidth={84}
                            className="!fixed !top-0 !bottom-0 !left-0 !z-30 !overflow-hidden shadow-[10px_0_40px_rgba(15,23,42,0.12)]"
                        >
                            {sidebarContent}
                        </Sider>
                    )}

                    <Layout className={isMobile ? 'min-h-screen' : collapsed ? 'ml-[84px] min-h-screen' : 'ml-[280px] min-h-screen'}>
                        <Header
                            className="sticky top-0 z-20 border-b border-white/10 bg-[#0b1220] backdrop-blur-xl"
                            style={{ padding: '12px 12px 18px 10px' }}
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        {isMobile ? (
                                            <Button
                                                type="text"
                                                size="large"
                                                icon={<MenuOutlined />}
                                                onClick={() => setMobileSidebarOpen(true)}
                                                className="!inline-flex !h-11 !w-11 !items-center !justify-center !rounded-xl !border-0 !bg-transparent !text-slate-700 !shadow-none hover:!bg-transparent"
                                            />
                                        ) : (
                                            <Button
                                                type="text"
                                                size="large"
                                                icon={
                                                    <span className="relative flex h-5 w-5 items-center justify-center">
                                                        <MenuOutlined
                                                            className={`absolute transition-all duration-200 ease-out ${collapsed ? 'scale-100 rotate-0 opacity-100' : 'scale-75 -rotate-90 opacity-0'}`}
                                                        />
                                                        <LeftOutlined
                                                            className={`absolute transition-all duration-200 ease-out ${collapsed ? 'scale-75 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}
                                                        />
                                                    </span>
                                                }
                                                onClick={() => setCollapsed((value) => !value)}
                                                className="!inline-flex !h-11 !w-11 !items-center !justify-center !rounded-xl !border-0 !bg-transparent !text-slate-700 !shadow-none hover:!bg-transparent"
                                            />
                                        )}

                                        <div className="leading-tight">
                                            <Typography.Title level={4} className="!m-0 !leading-tight !text-white">
                                                Student Learning Portal
                                            </Typography.Title>
                                            <Typography.Text className="block !text-slate-400">
                                                Access classes, tasks, and resources from one place.
                                            </Typography.Text>
                                        </div>
                                    </div>

                                    {!isMobile && (
                                        <div className="ml-4 flex items-center gap-3">
                                            <div className="min-w-0">
                                                <Typography.Text className="block text-xl font-bold !text-white">Diego Burgos</Typography.Text>
                                            </div>
                                            <Avatar size={40} className="bg-cyan-500 text-slate-950" icon={<UserOutlined />} />
                                        </div>
                                    )}
                                </div>

                                <div className="rounded-[28px] border border-white/6 bg-[#0b1220] px-4 py-4 text-white shadow-[0_20px_60px_rgba(2,6,23,0.35)] sm:px-5 sm:py-5">
                                    <div className="flex flex-col gap-4">
                                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-[#111827]/95 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                                            {(['welcome', 'news'] as const).map((item) => (
                                                <Button
                                                    key={item}
                                                    type="text"
                                                    onClick={() => setHeaderView(item)}
                                                    className={`!h-10 !rounded-full !border-0 !px-4 !font-semibold !shadow-none ${headerView === item ? '!bg-[#a855f7] !text-white' : '!bg-transparent !text-slate-300 hover:!bg-white/10 hover:!text-white'}`}
                                                >
                                                    {item === 'welcome' ? 'Welcome' : 'News'}
                                                </Button>
                                            ))}
                                        </div>

                                        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-5">
                                            <div className="min-w-0 flex-1 rounded-[24px] bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.28),transparent_36%),linear-gradient(135deg,#111827_0%,#0b1220_100%)] p-5 sm:p-6">
                                                <Typography.Text
                                                    className="block text-xs font-semibold tracking-[0.28em] uppercase"
                                                    style={{ color: '#67e8f9' }}
                                                >
                                                    {headerContent.label}
                                                </Typography.Text>
                                                <Typography.Title level={2} className="!mt-2 !mb-3 !text-white">
                                                    {headerContent.title}
                                                </Typography.Title>
                                                <Typography.Paragraph className="!mb-5 !max-w-2xl !text-base !text-slate-300">
                                                    {headerContent.description}
                                                </Typography.Paragraph>
                                            </div>

                                            <div className="w-full lg:w-[720px] lg:shrink-0">
                                                <div className="overflow-hidden rounded-[24px] border border-white/8 bg-[#060b14] p-3 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
                                                    <Carousel
                                                        autoplay
                                                        infinite
                                                        autoplaySpeed={carouselAutoplaySpeed}
                                                        effect="fade"
                                                        dots={false}
                                                        pauseOnHover={false}
                                                        pauseOnDotsHover={false}
                                                        pauseOnFocus={false}
                                                        waitForAnimate={false}
                                                        adaptiveHeight
                                                        afterChange={(current) => setActiveSlide(current)}
                                                    >
                                                        {headerCarouselSlides.map((slide) => (
                                                            <div key={slide.src}>
                                                                <div className="relative h-[180px] overflow-hidden rounded-[18px] sm:h-[200px] lg:h-[210px]">
                                                                    <img src={slide.src} alt={slide.alt} className="h-full w-full object-cover" />
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                                                                    <div className="absolute right-0 bottom-0 left-0 h-[3px] bg-white/8">
                                                                        <div
                                                                            key={activeSlide}
                                                                            className="h-full rounded-full bg-[#a855f7]/80"
                                                                            style={{
                                                                                animation: `carouselProgress ${carouselAutoplaySpeed}ms linear forwards`,
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </Carousel>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Header>
                    </Layout>

                    <Drawer
                        title={null}
                        placement="left"
                        closable={false}
                        onClose={() => setMobileSidebarOpen(false)}
                        open={mobileSidebarOpen}
                        width={290}
                        zIndex={3000}
                        className="student-sidebar-drawer"
                        styles={{ body: { padding: 0, background: '#0f172a' } }}
                    >
                        <div className="flex h-full flex-col bg-[#0f172a] text-white">
                            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                                <Space size={12}>
                                    <Avatar size={42} src="/images/logo.png" className="bg-white p-1" />
                                    <div>
                                        <Typography.Text className="block text-xs tracking-[0.24em] !text-cyan-200 uppercase">
                                            Stvsi Portal
                                        </Typography.Text>
                                        <Typography.Title level={5} className="!m-0 !text-white">
                                            Student Dashboard
                                        </Typography.Title>
                                    </div>
                                </Space>

                                <Button type="text" icon={<LeftOutlined />} onClick={() => setMobileSidebarOpen(false)} className="!text-slate-200" />
                            </div>

                            <div className="flex-1 overflow-auto px-3 py-4">
                                <Menu
                                    mode="inline"
                                    theme="dark"
                                    selectedKeys={selectedKeys}
                                    items={navigationItems}
                                    className="border-0 !bg-transparent"
                                    onClick={() => setMobileSidebarOpen(false)}
                                />
                            </div>

                            <div className="border-t border-white/10 p-4">
                                <div className="flex items-center gap-3">
                                    <Avatar size={40} className="bg-cyan-500 text-slate-950" icon={<UserOutlined />} />
                                    <div className="min-w-0">
                                        <Typography.Text className="block text-lg font-bold !text-white">Diego Burgos</Typography.Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Drawer>
                </Layout>
            </ConfigProvider>
        </>
    );
}
