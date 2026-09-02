import { Route, Routes } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { Home } from './pages/Home'
import {
  AdminLoginPage, ChangePasswordPage, Credit,
  CurriHome, LoginPage, NavHome, NaviCurri, NaviGroup, NaviGuide, NaviQnA,
  NaviUnion, NaviUniver, StaSchool, StaSubject, StaUnion,
  //  SubjectNavHome,
  TeacherCount, UnionCurriculum
} from './pages'
import { Toaster } from './components/ui'
import { SubjectNavLayout } from './components/layout/SubjectNavLayout'
import { CurriLayout } from './components/layout/CuuriLayout'
import { Curriculum } from './pages/Curri/CurriCulum/CurriCulum'
import { AdminRoute } from './components/layout/AdminRouter'
import { AdminLayout } from './components/layout/AdminLayout'
import { AdminHome, AdminNotice, AdminPage } from './pages/Admin'
import { supabase } from './lib/supabase'


function App() {

  try {
    const session = supabase.auth.getSession();
    console.log(session)
    // 세션 관련 로직
  } catch (error) {
    console.error("Session parse error:", error);
    // localStorage.clear();
    // window.location.reload();
  }

  return (
    <>
      <Routes>
        {/* 0. 헤더만 있는 공통 레이아웃 (홈, 로그인) */}
        <Route element={<RootLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/change-password' element={<ChangePasswordPage />} />
          <Route path='/admin-login' element={<AdminLoginPage />} />
        </Route>

        {/* 1. 과목선택 내비게이션 라인 (메인헤더 + 과목 서브헤더) */}
        <Route path='/subject-navigation' element={<SubjectNavLayout />}>
          {/* <Route index element={<SubjectNavHome />} /> */}
          <Route index element={<NavHome />} />
          <Route path='curri' element={<NaviCurri />} />
          <Route path='guide' element={<NaviGuide />} />
          <Route path='uni' element={<NaviUniver />} />
          <Route path='uniGroup' element={<NaviGroup />} />
          <Route path='offline' element={<NaviUnion />} />
          <Route path='help' element={<NaviQnA />} />
        </Route>

        {/* 2. 고등학교 교육과정 라인 (메인헤더 + 교육과정 서브헤더) */}
        <Route path='/high-school' element={<CurriLayout />}>
          <Route index element={<CurriHome />} />
          <Route path='teacher-count' element={<TeacherCount />} />
          <Route path='curriculum' element={<Curriculum />} />
          <Route path='union-curriculum' element={<UnionCurriculum />} />
          <Route path='credit' element={<Credit />} />

        </Route>
        <Route path='/stats' element={<CurriLayout />}>
          <Route path='union' element={<StaUnion />} />
          <Route path='subject' element={<StaSubject />} />
          <Route path='schools' element={<StaSchool />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path='auth' element={<AdminPage />} />
            <Route path='notice' element={<AdminNotice />} />
            <Route path='union' element={<StaUnion />} />
            <Route path='subject' element={<StaSubject />} />
            <Route path='schools' element={<StaSchool />} />
          </Route>
        </Route>
      </Routes >
      <Toaster position='top-center' richColors closeButton />
    </>
  )
}

export default App
