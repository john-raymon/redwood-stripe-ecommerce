import Logo from './../../assets/svgs/logo.svg'
import { Button } from 'lite-react-ui'

const DefaultLayout = ({ children }) => {
  return (
    <>
      <header className="top-0 fixed w-full py-[3.125rem] px-3 md:px-20 flex items-center justify-end z-20">
        <div className="absolute top-0 w-full left-0 right-0 h-full flex items-center">
          <Logo className="mx-auto w-[20%] md:w-[10rem]" />
        </div>
        <Button className="float-right !border-[transparent] !bg-[#FDD524] !text-[#2D4CEC] !uppercase !rounded-[1rem] !text-[1.1rem] !leading-[1.25rem] !py-[1.125rem]">
          cart (0)
        </Button>
      </header>
      <main className="mt-[10rem]">{children}</main>
    </>
  )
}

export default DefaultLayout
