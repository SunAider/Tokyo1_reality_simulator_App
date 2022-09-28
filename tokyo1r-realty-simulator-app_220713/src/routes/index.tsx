import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
import AuthGuard from '../guards/AuthGuard';
import { PATH_AFTER_LOGIN } from '../config';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },
    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        // Dashboard
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        // {
        //   path: '/dashboard',
        //   element: <Navigate to={'/dashboard/property'} replace />,
        //   index: true,
        // },
        {
          path: '/dashboard',
          children: [
            { element: <Navigate to="/dashboard/properties" replace />, index: true },
            { path: 'properties', element: <PropertyPosts /> }, // property list
            { path: 'properties/:id', element: <PropertyPost /> }, // property detail
            { path: 'my-properties', element: <MyPropertyPosts /> }, // my property list
            { path: 'my-properties/:id', element: <MyPropertyPost /> }, // my property detail
            { path: 'my-properties/new', element: <MyPropertyNewPost /> }, // add property
          ],
        },
        { path: '/dashboard/settings', element: <GeneralSettings /> },
        { path: '/dashboard/analytics', element: <GeneralBanking /> },
        {
          path: '/dashboard/user',
          children: [
            { element: <Navigate to="/dashboard/user/four" replace />, index: true },
            { path: '/dashboard/user/four', element: <PageFour /> },
            { path: '/dashboard/user/five', element: <PageFive /> },
            { path: '/dashboard/user/six', element: <PageSix /> },
          ],
        },
        // Blog
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new-post', element: <BlogNewPost /> },
          ],
        },
        // Property
        // {
        //   path: 'property',
        //   children: [
        //     { element: <Navigate to="/dashboard/property/posts" replace />, index: true },
        //     { path: 'posts', element: <PropertyPosts /> },
        //     { path: 'post/:title', element: <PropertyPost /> },
        //     { path: 'new-post', element: <PropertyNewPost /> },
        //   ],
        // },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <About /> },
        // { path: 'contact-us', element: <Contact /> },
        // { path: 'faqs', element: <Faqs /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
// IMPORT COMPONENTS
// Main
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const About = Loadable(lazy(() => import('../pages/About')));
// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
// Dashboard
const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
const PageSix = Loadable(lazy(() => import('../pages/PageSix')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const GeneralSettings = Loadable(lazy(() => import('../pages/dashboard/GeneralSettings')));
const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/MyPropertyNewPost')));
const PropertyPosts = Loadable(lazy(() => import('../pages/dashboard/PropertyPosts')));
const PropertyPost = Loadable(lazy(() => import('../pages/dashboard/PropertyPost')));
const MyPropertyPosts = Loadable(lazy(() => import('../pages/dashboard/MyPropertyPosts')));
const MyPropertyPost = Loadable(lazy(() => import('../pages/dashboard/MyPropertyPost')));
const MyPropertyNewPost = Loadable(lazy(() => import('../pages/dashboard/MyPropertyNewPost')));
