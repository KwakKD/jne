import { Route, Routes } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { Home } from './pages/Home'
import { LoginPage, NaviGroup, NaviGuide, NaviQnA, NaviUnion, NaviUniver, SubjectNavHome } from './pages'
import { Toaster } from './components/ui'
import { SubjectNavLayout } from './components/layout/SubjectNavLayout'


function App() {

  return (
    <>
      <Routes>
        {/* 0. 헤더만 있는 공통 레이아웃 (홈, 로그인) */}
        <Route element={<RootLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
        </Route>

        {/* 1. 과목선택 네비게이션 라인 (메인헤더 + 과목 서브헤더) */}
        <Route path='/subject-navigation' element={<SubjectNavLayout />}>
          <Route index element={<SubjectNavHome />} />
          <Route path='guide' element={<NaviGuide />} />
          <Route path='uni' element={<NaviUniver />} />
          <Route path='uniGroup' element={<NaviGroup />} />
          <Route path='offline' element={<NaviUnion />} />
          <Route path='help' element={<NaviQnA />} />
        </Route>

        {/* 2. 고등학교 교육과정 라인 (메인헤더 + 교육과정 서브헤더) */}
        {/* <Route path='/high-school' element={<SchoolCurriculumLayout />}>
          <Route index element={<HighSchoolHome />} />
          <Route path='setup' element={<div>교육과정 편성 설정</div>} />
        </Route> */}
      </Routes>
      <Toaster position='top-center' richColors closeButton />
    </>
  )
}

export default App
