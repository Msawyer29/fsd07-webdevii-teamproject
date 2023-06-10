import '@styles/globals.css';

export const metadata = {
    title: "The Hive",
    description: 'Crowdfunding Platform for Creative Projects'
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
            <div className="main">
                <div className="gradient" />
            </div>

            <main className="app">
                {children}
            </main>
        </body>

    </html>
  )
}

export default RootLayout;