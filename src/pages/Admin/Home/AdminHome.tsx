function AdminHome() {
    return (
        <div className="w-full min-h-screen bg-[#f8fafc] pt-0 ">
            <div
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />
        </div>
    )
}

export { AdminHome }