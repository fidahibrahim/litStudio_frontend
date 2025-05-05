import { BrowserRouter } from "react-router-dom"
import UserRouter from "./routes/UserRouter"
import { Toaster } from "sonner"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserRouter />
        <Toaster
            position='top-right'
            expand={false}
            richColors
            theme='light'
            closeButton={true}
          />
      </BrowserRouter>
    </>
  )
}

export default App
