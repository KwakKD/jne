function AppFooter() {
    return (
        <footer className="w-full border-t bg-gray-50 py-2">
            <div className="mx-auto flex w-full flex-col items-center justify-between gap-2 px-6 md:flex-row text-[11px] text-gray-500">
                <p>© 전라남도교육청. All rights reserved.</p>
                <div className="flex gap-4">
                    {/* <button className="hover:underline">개인정보처리방침</button>
                    <button className="hover:underline">이용약관</button> */}
                    <span>전라남도 무안군 삼향읍 어진누리길 10</span>
                </div>
            </div>
        </footer>
    )
}

export { AppFooter }