import { BookOutlined, EnvironmentOutlined, FacebookFilled, PhoneOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import { Head, useForm } from '@inertiajs/react';
import { Avatar, Button, Checkbox, Input, Modal, Select, Typography } from 'antd';
import { FormEvent, useState } from 'react';

const features = [
    {
        title: 'Easy access to learning modules',
        description: 'Students can study ahead, review past lessons, and watch instructional videos with a click or a tap on any gadget.',
        image: '/images/svg/bench-svgrepo-com.svg',
    },
    {
        title: 'Interactive activities and assessments',
        description: 'Students can test their knowledge and skills through interactive polls, quizzes, and discussions.',
        image: '/images/svg/lighthouse-svgrepo-com.svg',
    },
    {
        title: 'Student attendance tracking',
        description:
            'Marking student attendance for an online class is more convenient whether the student logs in early, on time, late, or is offline.',
        image: '/images/svg/indicator-svgrepo-com.svg',
    },
    {
        title: 'Collaborate with classmates',
        description:
            'The LMS allows students to chat with classmates, join forum discussions, write a blog, and facilitate group work activities all within the site.',
        image: '/images/svg/villa-svgrepo-com.svg',
    },
];

const emailDomains = ['stvsi.com'];

type LoginRole = 'student' | 'admin';
type LoginStep = 'role' | 'credentials';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

export default function Welcome() {
    const [loginOpen, setLoginOpen] = useState(false);
    const [loginStep, setLoginStep] = useState<LoginStep>('role');
    const [loginRole, setLoginRole] = useState<LoginRole | null>(null);
    const [emailOptions, setEmailOptions] = useState<Array<{ value: string }>>([]);

    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const openLogin = () => {
        setLoginStep('role');
        setLoginRole(null);
        setEmailOptions([]);
        reset();
        setLoginOpen(true);
    };

    const closeLogin = () => {
        setLoginOpen(false);
        setLoginStep('role');
        setLoginRole(null);
        setEmailOptions([]);
        reset();
    };

    const chooseLoginRole = (role: LoginRole) => {
        setLoginRole(role);
        setLoginStep('credentials');
        setEmailOptions([]);
        setData('email', '');
        setData('password', '');
        setData('remember', false);
    };

    const backToRole = () => {
        setLoginStep('role');
        setLoginRole(null);
        setEmailOptions([]);
        setData('email', '');
        setData('password', '');
        setData('remember', false);
    };

    const handleEmailSearch = (value: string) => {
        const prefix = value.includes('@') ? value.split('@')[0] : value;

        if (!prefix.trim()) {
            setEmailOptions([]);
            return;
        }

        setEmailOptions(emailDomains.map((domain) => ({ value: `${prefix}@${domain}` })));
    };

    const submit: FormEvent<HTMLFormElement> = (event) => {
        event.preventDefault();

        post(route('login'), {
            preserveScroll: true,
            onSuccess: () => {
                closeLogin();
                reset('password');
            },
        });
    };

    return (
        <>
            <Head title="Sta.Cruz Technical and Vocational School Inc.">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
            </Head>

            <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-10 -left-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
                    <div className="absolute top-28 right-[-4rem] h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
                    <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.7))]" />
                </div>

                <header className="relative z-10 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3">
                            <img src="/images/logo.png" alt="STVSI logo" className="h-11 w-11 shrink-0 object-contain" />
                            <div className="hidden sm:block">
                                <Typography.Title level={5} className="!m-0 !text-slate-900">
                                    Sta.Cruz Technical and Vocational School Inc.
                                </Typography.Title>
                                <Typography.Text className="!text-slate-500">Student learning portal</Typography.Text>
                            </div>
                        </div>

                        <button type="button" onClick={openLogin} className="flex items-center gap-3 text-right">
                            <div className="hidden sm:block">
                                <Typography.Title level={5} className="!m-0 !text-slate-900">
                                    STVSI Learners
                                </Typography.Title>
                                <Typography.Text className="!text-slate-500">Student learning portal</Typography.Text>
                            </div>
                            <Avatar size={42} icon={<UserOutlined />} className="border border-sky-200 bg-white" />
                        </button>
                    </div>
                </header>

                <section className="relative z-10 w-full pt-0 pb-10">
                    <div className="relative h-[clamp(320px,48vw,620px)] w-full overflow-hidden bg-slate-100">
                        <img
                            src="/images/svsi.png"
                            alt="Campus scene"
                            className="block h-full w-full object-cover"
                            style={{ objectPosition: 'center 35%' }}
                        />
                    </div>
                </section>

                <section className="relative z-10 px-3 pt-12 pb-20 sm:px-6 sm:pt-14 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-2 gap-x-7 gap-y-14 md:gap-x-12 md:gap-y-16 xl:grid-cols-4 xl:gap-x-10 xl:gap-y-12">
                            {features.map((feature) => (
                                <article key={feature.title} className="flex min-w-0 flex-col items-center text-center">
                                    <div className="flex h-[128px] w-full max-w-[180px] items-center justify-center rounded-2xl bg-white px-4 py-4 shadow-[0_14px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 sm:h-[165px] sm:max-w-[235px] sm:px-6 sm:py-5">
                                        <img src={feature.image} alt={feature.title} className="h-full w-full object-contain" />
                                    </div>
                                    <Typography.Title
                                        level={4}
                                        className="!mt-6 !mb-4 !text-[0.95rem] !leading-6 !font-bold !text-slate-950 sm:!mt-7 sm:!text-[1.05rem]"
                                    >
                                        {feature.title}
                                    </Typography.Title>
                                    <Typography.Paragraph className="!mb-0 max-w-[290px] !text-[0.85rem] !leading-6 !text-slate-700 sm:!text-[0.98rem] sm:!leading-7">
                                        {feature.description}
                                    </Typography.Paragraph>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <footer className="relative z-10 border-t border-slate-200/70 bg-slate-100/55 px-3 pt-10 pb-0 backdrop-blur-xl sm:px-6 lg:px-8">
                    <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-center">
                        <div>
                            <Typography.Title level={3} className="!mb-3 !text-slate-950">
                                Sta.Cruz Technical and Vocational School Inc.
                            </Typography.Title>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                            <a
                                href="https://www.facebook.com/search/top?q=Sta.Cruz%20Technical%20and%20Vocational%20School%20Inc."
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 rounded-2xl bg-white/40 px-4 py-4 text-slate-700 transition hover:-translate-y-0.5 hover:bg-white/60 hover:text-sky-800"
                            >
                                <FacebookFilled className="text-xl text-[#1877F2]" />
                                <div>
                                    <Typography.Text className="block text-xs tracking-[0.24em] text-slate-500 uppercase">Facebook</Typography.Text>
                                    <Typography.Text className="block font-semibold text-slate-900">Visit page</Typography.Text>
                                </div>
                            </a>

                            <a
                                href="tel:+639638256308"
                                className="flex items-center gap-3 rounded-2xl bg-white/40 px-4 py-4 text-slate-700 transition hover:-translate-y-0.5 hover:bg-white/60 hover:text-sky-800"
                            >
                                <PhoneOutlined className="text-xl text-sky-700" />
                                <div>
                                    <Typography.Text className="block text-xs tracking-[0.24em] text-slate-500 uppercase">Call</Typography.Text>
                                    <Typography.Text className="block font-semibold text-slate-900">09638256308</Typography.Text>
                                </div>
                            </a>

                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Sta.Cruz+Technical+and+Vocational+School+Inc."
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 rounded-2xl bg-white/40 px-4 py-4 text-slate-700 transition hover:-translate-y-0.5 hover:bg-white/60 hover:text-sky-800"
                            >
                                <EnvironmentOutlined className="h-5 w-5 shrink-0 text-emerald-600" />
                                <div>
                                    <Typography.Text className="block text-xs tracking-[0.24em] text-slate-500 uppercase">Location</Typography.Text>
                                    <Typography.Text className="block font-semibold text-slate-900">Open maps</Typography.Text>
                                </div>
                            </a>
                        </div>
                    </div>
                </footer>

                <section className="relative z-10 m-0 w-full overflow-hidden pt-45 pb-0 leading-none">
                    <div className="m-0 w-full p-0 text-center">
                        <Typography.Title
                            level={1}
                            className="!m-0 !p-0 !text-[clamp(6rem,22vw,18rem)] !leading-none !font-black !tracking-[0.9rem] !text-slate-500"
                            style={{ color: '#9ca3af', WebkitTextFillColor: '#1ead42', WebkitTextStroke: '3px #000000' }}
                        >
                            STVSI
                        </Typography.Title>
                    </div>
                </section>
            </div>

            <Modal
                title={loginStep === 'role' ? 'Choose login type' : loginRole === 'admin' ? 'Admin Login' : 'Student Login'}
                open={loginOpen}
                onCancel={closeLogin}
                footer={null}
                centered
                destroyOnHidden
                width="clamp(320px, 92vw, 480px)"
            >
                <div className="relative min-h-[320px] overflow-hidden pt-2">
                    <div
                        className={`grid gap-4 transition-all duration-300 ease-out ${
                            loginStep === 'role' ? 'translate-x-0 opacity-100' : 'pointer-events-none absolute inset-0 -translate-x-6 opacity-0'
                        }`}
                    >
                        <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
                            Pick the account type you want to use before entering your credentials.
                        </div>

                        <button
                            type="button"
                            onClick={() => chooseLoginRole('student')}
                            className="flex items-center gap-4 rounded-2xl border border-sky-200 bg-white px-4 py-4 text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-2xl text-sky-700">
                                <BookOutlined />
                            </div>
                            <div className="min-w-0 flex-1">
                                <Typography.Title level={5} className="!mb-1 !text-slate-950">
                                    Student Login
                                </Typography.Title>
                                <Typography.Text className="block text-sm text-slate-500">
                                    For learner accounts and school email access
                                </Typography.Text>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => chooseLoginRole('admin')}
                            className="flex items-center gap-4 rounded-2xl border border-amber-200 bg-white px-4 py-4 text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-2xl text-amber-700">
                                <SafetyOutlined />
                            </div>
                            <div className="min-w-0 flex-1">
                                <Typography.Title level={5} className="!mb-1 !text-slate-950">
                                    Admin Login
                                </Typography.Title>
                                <Typography.Text className="block text-sm text-slate-500">
                                    For administrative accounts and site management
                                </Typography.Text>
                            </div>
                        </button>
                    </div>

                    <form
                        className={`grid gap-4 transition-all duration-300 ease-out ${
                            loginStep === 'credentials' ? 'translate-x-0 opacity-100' : 'pointer-events-none absolute inset-0 translate-x-6 opacity-0'
                        }`}
                        onSubmit={submit}
                    >
                        <button
                            type="button"
                            onClick={backToRole}
                            className="w-fit text-sm font-medium text-slate-500 transition hover:text-slate-900"
                        >
                            Back to account type
                        </button>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            {loginRole === 'admin'
                                ? 'Admin login uses the same password form, but keeps the workflow separate for clarity.'
                                : 'Student login uses your school email address and password.'}
                        </div>

                        <div className="grid gap-2">
                            <Typography.Text className="text-sm font-medium text-slate-700">
                                {loginRole === 'admin' ? 'Admin Email' : 'Student Gmail'}
                            </Typography.Text>

                            {loginRole === 'student' ? (
                                <Select
                                    value={data.email || undefined}
                                    options={emailOptions}
                                    onSearch={handleEmailSearch}
                                    onSelect={(value) => setData('email', value)}
                                    onChange={(value) => setData('email', value)}
                                    className="w-full"
                                    showSearch
                                    placeholder="00000.name@stvsi.com"
                                    status={errors.email ? 'error' : undefined}
                                    filterOption={false}
                                />
                            ) : (
                                <Input
                                    size="large"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="00000.name@stvadmin.com"
                                    value={data.email}
                                    onChange={(event) => setData('email', event.target.value)}
                                    status={errors.email ? 'error' : undefined}
                                />
                            )}

                            {errors.email && <Typography.Text className="text-sm text-red-500">{errors.email}</Typography.Text>}
                        </div>

                        <div className="grid gap-2">
                            <Typography.Text className="text-sm font-medium text-slate-700">Password</Typography.Text>
                            <Input.Password
                                size="large"
                                autoComplete="current-password"
                                placeholder="Password"
                                value={data.password}
                                onChange={(event) => setData('password', event.target.value)}
                                status={errors.password ? 'error' : undefined}
                            />
                            {errors.password && <Typography.Text className="text-sm text-red-500">{errors.password}</Typography.Text>}
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <Checkbox checked={data.remember} onChange={(event) => setData('remember', event.target.checked)}>
                                Remember me
                            </Checkbox>

                            <Typography.Link href={route('password.request')} className="text-xs text-slate-500">
                                Forgot Password
                            </Typography.Link>
                        </div>

                        <Button type="primary" htmlType="submit" size="large" loading={processing} className="w-full bg-sky-700">
                            Login
                        </Button>
                    </form>
                </div>
            </Modal>
        </>
    );
}
